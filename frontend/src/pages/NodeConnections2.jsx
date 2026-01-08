import React, { useRef, useEffect } from 'react';

const NodeConnections2 = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const points = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });

  const BASE_PARTICLE_DENSITY = 0.00012;
  const HOVER_RADIUS = 90;
  const NEIGHBOR_COUNT = 4;
  const BASE_OPACITY = 0.06;
  const HOVER_OPACITY = 0.55;
  const OPACITY_LERP_SPEED = 0.12;

  const seededRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const seed = width * height;
      const PARTICLE_COUNT = Math.floor(width * height * BASE_PARTICLE_DENSITY);

      const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (width / height)));
      const rows = Math.ceil(PARTICLE_COUNT / cols);
      const gridSpacingX = width / cols;
      const gridSpacingY = height / rows;

      let idx = 0;
      points.current = Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          if (idx++ >= PARTICLE_COUNT) return null;
          const x = col * gridSpacingX + seededRandom(seed + idx * 13) * gridSpacingX;
          const y = row * gridSpacingY + seededRandom(seed + idx * 73) * gridSpacingY;
          return {
            x,
            y,
            originalX: x,
            originalY: y,
            offsetX: 0,
            offsetY: 0,
            angle: seededRandom(seed + idx * 59) * Math.PI * 2,
            speed: 0.15 + seededRandom(seed + idx * 97) * 0.3,
            amplitude: 8 + seededRandom(seed + idx * 31) * 12.0,
          };
        })
      )
        .flat()
        .filter(Boolean);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getDistance = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getDistanceToSegment = (px, py, x1, y1, x2, y2) => {
      const A = px - x1;
      const B = py - y1;
      const C = x2 - x1;
      const D = y2 - y1;
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = lenSq !== 0 ? dot / lenSq : -1;
      param = Math.max(0, Math.min(1, param));
      const xx = x1 + param * C;
      const yy = y1 + param * D;
      const dx = px - xx;
      const dy = py - yy;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const opacityMap = new Map();
    let lastTime = performance.now();

    const draw = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pointer = mousePos.current;

      points.current.forEach((point) => {
        point.angle += point.speed * delta * 1.2;
        point.offsetX = Math.cos(point.angle) * point.amplitude;
        point.offsetY = Math.sin(point.angle) * point.amplitude;

        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.exp(-dist / 100) * 2;

        const targetX = point.originalX + point.offsetX;
        const targetY = point.originalY + point.offsetY;

        point.x += (targetX - point.x) * 0.15 + dx * 0.0008 * force;
        point.y += (targetY - point.y) * 0.15 + dy * 0.0008 * force;
      });

      points.current.forEach((point, idx) => {
        const neighbors = points.current
          .map((p, i) => ({ index: i, distance: getDistance(point, p) }))
          .filter((n) => n.index !== idx)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, NEIGHBOR_COUNT);

        neighbors.forEach(({ index }) => {
          const neighbor = points.current[index];
          const key = `${Math.min(idx, index)}-${Math.max(idx, index)}`;
          let targetOpacity = BASE_OPACITY;

          const dist = getDistanceToSegment(
            pointer.x,
            pointer.y,
            point.x,
            point.y,
            neighbor.x,
            neighbor.y
          );

          // if (dist < HOVER_RADIUS) targetOpacity = HOVER_OPACITY;
          const MAX_HOVER_DIST = 140;  // bigger responsive radius
const HOVER_MULTIPLIER = 2.2; // amplifies highlight
          if (dist < MAX_HOVER_DIST) {
  // proximity ratio (1.0 = very close, 0 = outside)
  const proximity = 1 - dist / MAX_HOVER_DIST;

  // Immediate stronger target opacity near mouse
  targetOpacity = BASE_OPACITY + proximity * HOVER_OPACITY * HOVER_MULTIPLIER;

  // Hard cap so it never goes over full visibility
  targetOpacity = Math.min(targetOpacity, 0.88);
}

          const prev = opacityMap.get(key) ?? BASE_OPACITY;
          const next = prev + (targetOpacity - prev) * OPACITY_LERP_SPEED;
          opacityMap.set(key, next);

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.strokeStyle = `rgba(162,166,171,${next.toFixed(5)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default NodeConnections2;
