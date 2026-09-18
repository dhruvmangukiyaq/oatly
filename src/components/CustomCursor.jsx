import React, { useEffect, useRef, useState } from 'react';

// ─── CUSTOM CURSOR (View) ───────────────────────────────────────────────────
// The classic arrow pointer, rendered in 3D: it leans into the direction of
// movement (rotateX/rotateY by velocity) and carries a soft depth shadow.
// Over links and buttons it grows slightly. No animation loop bugs: one
// rAF loop, transform-only updates.
// - Renders only on fine-pointer (mouse) devices; touch stays native.
// - Respects prefers-reduced-motion (static arrow, no tilt).
export default function CustomCursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches,
  );
  const rootRef = useRef(null);
  const markRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const mark = markRef.current;
    if (!root || !mark) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let x = -100;
    let y = -100;
    let px = -100;
    let py = -100;
    let rx = 0;
    let ry = 0;
    let visible = false;
    let raf = 0;
    let last = performance.now();

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        root.style.opacity = '1';
        px = x;
        py = y;
      }
      const interactive = e.target?.closest?.(
        'a, button, [role="button"], input, textarea, select, label',
      );
      root.classList.toggle('oatly-cursor--active', !!interactive);
    };

    const onLeave = () => {
      visible = false;
      root.style.opacity = '0';
    };

    const tick = (now) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      if (!reducedMotion) {
        // Lean into the movement direction; ease back to flat when still.
        const vx = (x - px) / dt;
        const vy = (y - py) / dt;
        px = x;
        py = y;
        const clamp = (v, m) => Math.max(-m, Math.min(m, v));
        const tRy = clamp(vx * 0.012, 28);
        const tRx = clamp(-vy * 0.012, 28);
        const k = 1 - Math.pow(1 - 0.18, dt * 60);
        rx += (tRx - rx) * k;
        ry += (tRy - ry) * k;
        mark.style.transform = `translate(${x}px, ${y}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      } else {
        mark.style.transform = `translate(${x}px, ${y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="oatly-cursor" aria-hidden="true">
      <div ref={markRef} className="oatly-cursor__arrow">
        <svg viewBox="0 0 32 32" className="oatly-cursor__arrow-svg">
          <path d="M7 3.5 L7 25.6 L12.3 20.6 L15.4 27.6 L18.6 26.1 L15.5 19.2 L22.5 19.2 Z" />
        </svg>
      </div>
    </div>
  );
}
