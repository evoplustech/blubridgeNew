import React, { useEffect, useRef, useMemo } from 'react';

/**
 * BluBridge Neural Background
 * 
 * Requirements:
 * - 100 nodes total
 * - Each node connects to maximum 3-4 other nodes only
 * - All nodes must be connected (no isolated nodes)
 * - On hover: a node follows the cursor and connects to nearest 3 nodes
 */
const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const smoothMouseRef = useRef({ x: -1000, y: -1000 });
  const cursorNodeRef = useRef(null); // Virtual node that follows cursor
  const highlightStateRef = useRef({
    nodes: new Map(),
    connections: new Map(),
  });

  const config = useMemo(() => ({
    // Exactly 100 nodes
    nodeCount: 100,
    // Connection limits - each node max 3-4 connections
    maxConnectionsPerNode: 4,
    minConnectionsPerNode: 1,
    connectionDistance: 200,
    
    // Hover - connect to nearest 3 nodes
    hoverRadius: 150,
    hoverConnectCount: 3,
    
    // Colors
    nodeColor: { r: 175, g: 195, b: 220 },
    lineColor: { r: 140, g: 165, b: 195 },
    highlightNodeColor: { r: 225, g: 240, b: 255 },
    highlightLineColor: { r: 200, g: 225, b: 255 },
    cursorNodeColor: { r: 255, g: 255, b: 255 },
    
    // Appearance
    nodeBaseOpacity: 0.55,
    lineBaseOpacity: 0.18,
    nodeBaseRadius: 2.2,
    highlightNodeOpacity: 0.95,
    highlightLineOpacity: 0.6,
    cursorNodeOpacity: 1.0,
    cursorNodeGlow: 8,
    
    // Motion
    driftSpeed: 0.012,
    driftAmplitudeX: 25,
    driftAmplitudeY: 20,
    
    // Cursor node follow speed
    cursorFollowSpeed: 0.3,
    
    // Highlight timing
    highlightFadeInSpeed: 0.08,
    highlightFadeOutSpeed: 0.05,
    
    // Grid
    gridOpacity: 0.02,
    gridSize: 60,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initializeNetwork();
    };

    const initializeNetwork = () => {
      nodesRef.current = [];
      connectionsRef.current = [];
      highlightStateRef.current = { nodes: new Map(), connections: new Map() };
      
      // Initialize cursor node
      cursorNodeRef.current = {
        x: -1000,
        y: -1000,
        currentX: -1000,
        currentY: -1000,
        radius: 3,
        active: false,
      };
      
      const padding = 50;
      const usableWidth = width - padding * 2;
      const usableHeight = height - padding * 2;
      
      // Create grid for even distribution of 100 nodes
      const aspectRatio = usableWidth / usableHeight;
      const rows = Math.round(Math.sqrt(config.nodeCount / aspectRatio));
      const cols = Math.round(config.nodeCount / rows);
      
      const cellWidth = usableWidth / cols;
      const cellHeight = usableHeight / rows;
      
      let nodeIndex = 0;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (nodeIndex >= config.nodeCount) break;
          
          const centerX = padding + (col + 0.5) * cellWidth;
          const centerY = padding + (row + 0.5) * cellHeight;
          
          // Random offset within cell
          const offsetX = (Math.random() - 0.5) * cellWidth * 0.5;
          const offsetY = (Math.random() - 0.5) * cellHeight * 0.5;
          
          const x = centerX + offsetX;
          const y = centerY + offsetY;
          
          const radius = config.nodeBaseRadius + (Math.random() - 0.5) * 0.5;
          
          // Motion parameters
          const motionTypes = ['circular', 'horizontal', 'vertical', 'diagonal', 'wave'];
          const motionType = motionTypes[nodeIndex % motionTypes.length];
          const directionAngle = Math.random() * Math.PI * 2;
          
          nodesRef.current.push({
            x, y,
            baseX: x,
            baseY: y,
            currentX: x,
            currentY: y,
            radius,
            motionType,
            directionAngle,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            phaseSpeed: config.driftSpeed * (0.7 + Math.random() * 0.6),
            amplitudeX: config.driftAmplitudeX * (0.6 + Math.random() * 0.8),
            amplitudeY: config.driftAmplitudeY * (0.6 + Math.random() * 0.8),
            connectionCount: 0,
          });
          
          highlightStateRef.current.nodes.set(nodeIndex, { current: 0, target: 0 });
          nodeIndex++;
        }
      }
      
      buildConnections();
    };

    // Build connections with MAX 3-4 per node
    const buildConnections = () => {
      connectionsRef.current = [];
      const nodes = nodesRef.current;
      
      // Reset connection counts
      nodes.forEach(node => node.connectionCount = 0);
      
      // Create list of potential connections sorted by distance
      const potentialConnections = [];
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].baseX - nodes[j].baseX;
          const dy = nodes[i].baseY - nodes[j].baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < config.connectionDistance) {
            potentialConnections.push({ i, j, dist });
          }
        }
      }
      
      // Sort by distance (shortest first)
      potentialConnections.sort((a, b) => a.dist - b.dist);
      
      // Add connections while respecting max limit per node
      potentialConnections.forEach(({ i, j, dist }) => {
        const nodeI = nodes[i];
        const nodeJ = nodes[j];
        
        // Only add if both nodes have room for more connections
        if (nodeI.connectionCount < config.maxConnectionsPerNode && 
            nodeJ.connectionCount < config.maxConnectionsPerNode) {
          
          const connIdx = connectionsRef.current.length;
          const distFactor = 1 - (dist / config.connectionDistance);
          const baseOpacity = config.lineBaseOpacity * (0.6 + distFactor * 0.4);
          
          connectionsRef.current.push({
            i, j, dist,
            baseOpacity: Math.max(0.1, baseOpacity),
          });
          
          highlightStateRef.current.connections.set(connIdx, { current: 0, target: 0 });
          nodeI.connectionCount++;
          nodeJ.connectionCount++;
        }
      });
      
      // Ensure all nodes have at least 1 connection
      nodes.forEach((node, idx) => {
        if (node.connectionCount < config.minConnectionsPerNode) {
          // Find nearest unconnected node with room
          let nearestIdx = -1;
          let nearestDist = Infinity;
          
          for (let j = 0; j < nodes.length; j++) {
            if (idx === j) continue;
            if (nodes[j].connectionCount >= config.maxConnectionsPerNode) continue;
            
            // Check if already connected
            const alreadyConnected = connectionsRef.current.some(
              c => (c.i === idx && c.j === j) || (c.i === j && c.j === idx)
            );
            if (alreadyConnected) continue;
            
            const dx = node.baseX - nodes[j].baseX;
            const dy = node.baseY - nodes[j].baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestIdx = j;
            }
          }
          
          if (nearestIdx !== -1) {
            const minI = Math.min(idx, nearestIdx);
            const maxI = Math.max(idx, nearestIdx);
            const connIdx = connectionsRef.current.length;
            
            connectionsRef.current.push({
              i: minI, j: maxI, dist: nearestDist,
              baseOpacity: config.lineBaseOpacity * 0.6,
            });
            
            highlightStateRef.current.connections.set(connIdx, { current: 0, target: 0 });
            node.connectionCount++;
            nodes[nearestIdx].connectionCount++;
          }
        }
      });
    };

    // Find nearest 3 nodes to cursor for connection
    const findNearestNodesToPoint = (px, py, count) => {
      const nodes = nodesRef.current;
      
      const distances = nodes.map((node, idx) => ({
        idx,
        dist: Math.sqrt(
          Math.pow(node.currentX - px, 2) + 
          Math.pow(node.currentY - py, 2)
        )
      }));
      
      distances.sort((a, b) => a.dist - b.dist);
      
      return distances.slice(0, count).map(d => d.idx);
    };

    const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const drawGrid = () => {
      ctx.strokeStyle = `rgba(100, 130, 170, ${config.gridOpacity})`;
      ctx.lineWidth = 0.4;
      
      for (let x = 0; x < width; x += config.gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += config.gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      // Premium light gradient background using specified colors
      const gradient = ctx.createLinearGradient(0, 0, width * 0.5, height);
      gradient.addColorStop(0, '#f3f1e9');     // Lightest cream
      gradient.addColorStop(0.4, '#e6e2d4');   // Mid cream
      gradient.addColorStop(0.7, '#dbd6c4');   // Warm beige
      gradient.addColorStop(1, '#e6e2d4');     // Back to mid
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Soft radial lighting effect - top left
      const radialLight1 = ctx.createRadialGradient(
        width * 0.2, height * 0.15, 0,
        width * 0.2, height * 0.15, width * 0.6
      );
      radialLight1.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      radialLight1.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      radialLight1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialLight1;
      ctx.fillRect(0, 0, width, height);
      
      // Soft radial lighting effect - center right
      const radialLight2 = ctx.createRadialGradient(
        width * 0.8, height * 0.5, 0,
        width * 0.8, height * 0.5, width * 0.5
      );
      radialLight2.addColorStop(0, 'rgba(243, 241, 233, 0.4)');
      radialLight2.addColorStop(0.5, 'rgba(230, 226, 212, 0.15)');
      radialLight2.addColorStop(1, 'rgba(219, 214, 196, 0)');
      ctx.fillStyle = radialLight2;
      ctx.fillRect(0, 0, width, height);
      
      // Gentle depth shading at bottom
      const depthShade = ctx.createLinearGradient(0, height * 0.6, 0, height);
      depthShade.addColorStop(0, 'rgba(0, 0, 0, 0)');
      depthShade.addColorStop(1, 'rgba(11, 31, 59, 0.06)');
      ctx.fillStyle = depthShade;
      ctx.fillRect(0, 0, width, height);
      
      // Very light noise texture simulation
      ctx.fillStyle = 'rgba(0, 0, 0, 0.008)';
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillRect(x, y, 1, 1);
      }
      
      drawGrid();
      
      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const mouse = mouseRef.current;
      const smoothMouse = smoothMouseRef.current;
      const cursorNode = cursorNodeRef.current;
      const highlightState = highlightStateRef.current;
      
      // Smooth mouse tracking
      if (mouse.active) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.15;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.15;
        cursorNode.active = true;
      } else {
        cursorNode.active = false;
      }
      
      // Update cursor node position (follows mouse)
      if (cursorNode.active) {
        cursorNode.currentX += (smoothMouse.x - cursorNode.currentX) * config.cursorFollowSpeed;
        cursorNode.currentY += (smoothMouse.y - cursorNode.currentY) * config.cursorFollowSpeed;
      }
      
      // Update all nodes motion
      nodes.forEach((node) => {
        node.phaseX += node.phaseSpeed;
        node.phaseY += node.phaseSpeed * 1.2;
        
        let driftX = 0, driftY = 0;
        
        switch (node.motionType) {
          case 'circular':
            driftX = Math.sin(node.phaseX) * node.amplitudeX;
            driftY = Math.cos(node.phaseY) * node.amplitudeY;
            break;
          case 'horizontal':
            driftX = Math.sin(node.phaseX) * node.amplitudeX * 1.3;
            driftY = Math.sin(node.phaseY * 0.4) * node.amplitudeY * 0.4;
            break;
          case 'vertical':
            driftX = Math.sin(node.phaseX * 0.4) * node.amplitudeX * 0.4;
            driftY = Math.sin(node.phaseY) * node.amplitudeY * 1.3;
            break;
          case 'diagonal':
            driftX = Math.sin(node.phaseX + node.directionAngle) * node.amplitudeX;
            driftY = Math.sin(node.phaseX + node.directionAngle + 0.5) * node.amplitudeY;
            break;
          case 'wave':
            driftX = Math.sin(node.phaseX) * node.amplitudeX;
            driftY = Math.sin(node.phaseX * 2) * node.amplitudeY * 0.5;
            break;
          default:
            driftX = Math.sin(node.phaseX) * node.amplitudeX;
            driftY = Math.cos(node.phaseY) * node.amplitudeY;
        }
        
        node.currentX = node.baseX + driftX;
        node.currentY = node.baseY + driftY;
      });
      
      // Find nearest 3 nodes to cursor for highlighting
      let cursorConnectedNodes = [];
      if (cursorNode.active && smoothMouse.x > 0) {
        cursorConnectedNodes = findNearestNodesToPoint(
          cursorNode.currentX, 
          cursorNode.currentY, 
          config.hoverConnectCount
        );
      }
      
      // Update highlight states
      highlightState.nodes.forEach((state, idx) => {
        state.target = cursorConnectedNodes.includes(idx) ? 1 : 0;
      });
      
      highlightState.nodes.forEach((state) => {
        const speed = state.target > state.current ? config.highlightFadeInSpeed : config.highlightFadeOutSpeed;
        state.current += (state.target - state.current) * speed * 60;
        state.current = Math.max(0, Math.min(1, state.current));
      });
      
      // Draw static connections (3-4 per node max)
      ctx.lineCap = 'round';
      
      connections.forEach((conn) => {
        const n1 = nodes[conn.i];
        const n2 = nodes[conn.j];
        
        ctx.strokeStyle = `rgba(${config.lineColor.r}, ${config.lineColor.g}, ${config.lineColor.b}, ${conn.baseOpacity})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(n1.currentX, n1.currentY);
        ctx.lineTo(n2.currentX, n2.currentY);
        ctx.stroke();
      });
      
      // Draw cursor node connections to nearest 3 nodes
      if (cursorNode.active && cursorConnectedNodes.length > 0) {
        cursorConnectedNodes.forEach(nodeIdx => {
          const targetNode = nodes[nodeIdx];
          const highlight = highlightState.nodes.get(nodeIdx)?.current || 0;
          
          const r = config.highlightLineColor.r;
          const g = config.highlightLineColor.g;
          const b = config.highlightLineColor.b;
          const opacity = config.highlightLineOpacity * easeInOut(highlight);
          
          // Gradient line from cursor node to target
          const lineGradient = ctx.createLinearGradient(
            cursorNode.currentX, cursorNode.currentY,
            targetNode.currentX, targetNode.currentY
          );
          lineGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
          lineGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity * 0.7})`);
          lineGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`);
          
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = 1.5 + highlight * 0.5;
          ctx.beginPath();
          ctx.moveTo(cursorNode.currentX, cursorNode.currentY);
          ctx.lineTo(targetNode.currentX, targetNode.currentY);
          ctx.stroke();
        });
      }
      
      // Draw all nodes
      nodes.forEach((node, idx) => {
        const nodeState = highlightState.nodes.get(idx);
        const highlight = nodeState ? nodeState.current : 0;
        
        const r = Math.round(config.nodeColor.r + (config.highlightNodeColor.r - config.nodeColor.r) * highlight);
        const g = Math.round(config.nodeColor.g + (config.highlightNodeColor.g - config.nodeColor.g) * highlight);
        const b = Math.round(config.nodeColor.b + (config.highlightNodeColor.b - config.nodeColor.b) * highlight);
        
        const opacity = config.nodeBaseOpacity + (config.highlightNodeOpacity - config.nodeBaseOpacity) * easeInOut(highlight);
        
        // Glow for highlighted nodes
        if (highlight > 0.1) {
          const glowRadius = 5 * highlight;
          const glowGradient = ctx.createRadialGradient(
            node.currentX, node.currentY, 0,
            node.currentX, node.currentY, node.radius + glowRadius
          );
          glowGradient.addColorStop(0, `rgba(${config.highlightNodeColor.r}, ${config.highlightNodeColor.g}, ${config.highlightNodeColor.b}, ${opacity * 0.6})`);
          glowGradient.addColorStop(0.4, `rgba(${config.highlightNodeColor.r}, ${config.highlightNodeColor.g}, ${config.highlightNodeColor.b}, ${opacity * 0.25})`);
          glowGradient.addColorStop(1, `rgba(${config.highlightNodeColor.r}, ${config.highlightNodeColor.g}, ${config.highlightNodeColor.b}, 0)`);
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(node.currentX, node.currentY, node.radius + glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Node circle
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw cursor node (the node that follows mouse)
      if (cursorNode.active) {
        const { currentX, currentY, radius } = cursorNode;
        
        // Glow
        const glowGradient = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, radius + config.cursorNodeGlow
        );
        glowGradient.addColorStop(0, `rgba(${config.cursorNodeColor.r}, ${config.cursorNodeColor.g}, ${config.cursorNodeColor.b}, ${config.cursorNodeOpacity * 0.7})`);
        glowGradient.addColorStop(0.4, `rgba(${config.cursorNodeColor.r}, ${config.cursorNodeColor.g}, ${config.cursorNodeColor.b}, ${config.cursorNodeOpacity * 0.3})`);
        glowGradient.addColorStop(1, `rgba(${config.cursorNodeColor.r}, ${config.cursorNodeColor.g}, ${config.cursorNodeColor.b}, 0)`);
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, radius + config.cursorNodeGlow, 0, Math.PI * 2);
        ctx.fill();
        
        // Cursor node circle
        ctx.fillStyle = `rgba(${config.cursorNodeColor.r}, ${config.cursorNodeColor.g}, ${config.cursorNodeColor.b}, ${config.cursorNodeOpacity})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: 'default' }}
      data-testid="neural-background-canvas"
    />
  );
};

export default NeuralBackground;
