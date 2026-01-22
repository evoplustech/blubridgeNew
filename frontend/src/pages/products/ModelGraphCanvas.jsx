import { useEffect, useRef } from "react";

export default function ModelGraphCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let dpr = window.devicePixelRatio || 1;
    let width, height;
    let t = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // === MODEL NODES (MATCH SCREENSHOT) ===
    const nodes = [
      { label: "LLaMA", x: 0.22, y: 0.18, c: "#3b82f6" },
      { label: "GPT", x: 0.55, y: 0.14, c: "#8b5cf6" },
      { label: "Claude", x: 0.82, y: 0.26, c: "#ec4899" },
      { label: "Mistral", x: 0.18, y: 0.48, c: "#06b6d4" },
      { label: "Flux", x: 0.45, y: 0.45, c: "#f97316" },
      { label: "SDXL", x: 0.68, y: 0.40, c: "#22c55e" },
      { label: "Whisper", x: 0.86, y: 0.56, c: "#eab308" },
      { label: "CLIP", x: 0.26, y: 0.75, c: "#ef4444" },
      { label: "Qwen", x: 0.55, y: 0.72, c: "#a855f7" },
      { label: "Gemma", x: 0.75, y: 0.82, c: "#14b8a6" }
    ];

    // === FIXED CONNECTIONS (NO RANDOM FLICKER) ===
    const links = [
      [0,1],[1,2],[0,4],[4,5],[5,6],
      [4,8],[8,9],[3,4],[3,7]
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.006;

      // ---- connections
      ctx.strokeStyle = "rgba(100,140,255,0.18)";
      ctx.lineWidth = 1;

      links.forEach(([a,b]) => {
        const na = nodes[a];
        const nb = nodes[b];

        const ax = na.x * width + Math.sin(t + a) * 6;
        const ay = na.y * height + Math.cos(t + a) * 6;
        const bx = nb.x * width + Math.sin(t + b) * 6;
        const by = nb.y * height + Math.cos(t + b) * 6;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      });

      // ---- nodes
      nodes.forEach((n, i) => {
        const x = n.x * width + Math.sin(t + i) * 8;
        const y = n.y * height + Math.cos(t + i) * 8;

        // glow
        const g = ctx.createRadialGradient(x,y,0,x,y,50);
        g.addColorStop(0, n.c + "55");
        g.addColorStop(1, n.c + "00");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x,y,50,0,Math.PI*2);
        ctx.fill();

        // core
        ctx.fillStyle = n.c;
        ctx.beginPath();
        ctx.arc(x,y,8,0,Math.PI*2);
        ctx.fill();

        // label
        ctx.fillStyle = "rgba(20,20,20,0.85)";
        ctx.font = "11px DM Sans, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(n.label, x, y + 22);
      });

      // ---- ambient particles
      for (let i = 0; i < 24; i++) {
        const px = (Math.sin(t * 0.6 + i) + 1) * width * 0.5;
        const py = (Math.cos(t * 0.4 + i) + 1) * height * 0.5;
        ctx.fillStyle = "rgba(120,160,255,0.15)";
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
