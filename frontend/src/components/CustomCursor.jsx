import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label[for], [data-cursor="hover"]';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isCoarse) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    document.documentElement.classList.add('mscur-active');

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let rafId;

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
      const hovering = e.target.closest?.(INTERACTIVE);
      dot.classList.toggle('is-hover', !!hovering);
      ring.classList.toggle('is-hover', !!hovering);
    };
    const onDown = () => { dot.classList.add('is-pressed'); ring.classList.add('is-pressed'); };
    const onUp = () => { dot.classList.remove('is-pressed'); ring.classList.remove('is-pressed'); };
    const onLeave = () => { dot.classList.add('is-hidden'); ring.classList.add('is-hidden'); };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('mscur-active');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="mscur-ring is-hidden" aria-hidden="true" data-testid="cursor-ring" />
      <div ref={dotRef} className="mscur-dot is-hidden" aria-hidden="true" data-testid="cursor-dot" />
    </>
  );
};

export default CustomCursor;
