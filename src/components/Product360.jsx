import React, { useEffect, useRef } from 'react';

/**
 * Product360
 * Dead simple 360: the exact official packshot rotates around its own
 * vertical center axis. One product, same artwork, colors and size —
 * nothing else. Hover starts the slow spin, leaving stops it, dragging
 * takes manual control. Motion is time-based, damped and speed-clamped,
 * so the spin stays slow and butter-smooth on any refresh rate.
 */

// Max turn speed: degrees per second (a full turn takes ~2s or more).
const MAX_SPEED_DPS = 180;
// Turntable auto-spin while hovered (degrees per second ≈ 12s/turn).
const AUTO_SPIN_DPS = 30;
// Mouse-drag sensitivity: degrees per dragged pixel.
const DRAG_FACTOR = 0.25;

function shortestAngle(diff) {
  return ((diff + 540) % 360) - 180;
}

export default function Product360({
  src,
  alt = 'Oatly product',
  className = '',
  onClick,
  onError,
}) {
  const containerRef = useRef(null);
  const rotorRef = useRef(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const hoveredRef = useRef(false);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startRotation: 0,
    moved: false,
    startTime: 0,
  });

  // Damped, speed-clamped rotation loop with a slow turntable auto-spin.
  // Time-based so motion is identical on 60Hz, 120Hz or slower displays.
  // Spin runs while hovered; dragging takes manual control; leaving stops it.
  useEffect(() => {
    let frameId;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      if (hoveredRef.current && !dragRef.current.active) {
        targetRef.current += AUTO_SPIN_DPS * dt;
      }
      const diff = shortestAngle(targetRef.current - currentRef.current);
      const ease = 1 - Math.pow(1 - 0.12, dt * 60);
      const maxStep = MAX_SPEED_DPS * dt;
      const step = Math.max(-maxStep, Math.min(maxStep, diff * ease));
      if (Math.abs(step) > 0.005) {
        currentRef.current += step;
        if (rotorRef.current) {
          rotorRef.current.style.transform = `rotateY(${currentRef.current}deg)`;
        }
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleMouseEnter = () => {
    hoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    dragRef.current.active = false;
    hoveredRef.current = false;
    // Ease back to the nearest front-facing position.
    targetRef.current = Math.round(currentRef.current / 360) * 360;
  };

  const handlePointerDown = (e) => {
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    dragRef.current = {
      active: true,
      startX: clientX,
      startRotation: targetRef.current,
      moved: false,
      startTime: Date.now(),
    };
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const deltaX = clientX - dragRef.current.startX;

    if (Math.abs(deltaX) > 4) {
      dragRef.current.moved = true;
    }

    targetRef.current = dragRef.current.startRotation + deltaX * DRAG_FACTOR;
  };

  const handlePointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;

    // If tapped without dragging, trigger card click
    const elapsed = Date.now() - dragRef.current.startTime;
    if (!dragRef.current.moved && elapsed < 250) {
      onClick?.();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-full select-none cursor-pointer flex items-center justify-center bg-transparent group overflow-visible ${className}`}
      style={{ perspective: '900px' }}
    >
      {/* Single product, spinning around its own center axis. */}
      <div
        ref={rotorRef}
        className="relative w-full h-full"
        style={{ transform: 'rotateY(0deg)', transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Ground shadow lives inside the rotor, so it turns with the product.
            Soft ellipse only — never a box. */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            bottom: '1%',
            width: '56%',
            height: '8%',
            transform: 'translateX(-50%) translateZ(26px)',
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 70%)',
          }}
        />
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ backfaceVisibility: 'hidden' }}
          loading="eager"
          decoding="async"
          onError={onError}
        />
        <img
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          loading="eager"
          decoding="async"
        />
      </div>

    </div>
  );
}
