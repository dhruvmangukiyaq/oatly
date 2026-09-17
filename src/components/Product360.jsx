import React, { useEffect, useRef, useState } from 'react';

/**
 * Product360
 * Dead simple 360: the exact official packshot rotates around its own
 * vertical center axis. One product, same artwork, colors and size —
 * nothing else. Motion is time-based, damped and speed-clamped, so the
 * spin stays slow and butter-smooth on any refresh rate.
 */

// Max turn speed: degrees per second (a full turn takes ~2.8s or more).
const MAX_SPEED_DPS = 130;
// Slow turntable auto-spin while hovered (degrees per second ≈ 17s/turn).
const AUTO_SPIN_DPS = 21;
// Mouse-drag sensitivity: degrees per dragged pixel.
const DRAG_FACTOR = 0.25;
// Idle delay before auto-spin resumes after manual control.
const IDLE_RESUME_MS = 2500;

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
  const [isHovered, setIsHovered] = useState(false);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const hoveredRef = useRef(false);
  const lastInteractRef = useRef(0);
  const rectRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startRotation: 0,
    moved: false,
    startTime: 0,
  });

  const refreshRect = () => {
    const el = containerRef.current;
    if (el) rectRef.current = el.getBoundingClientRect();
  };

  // Damped, speed-clamped rotation loop with a slow turntable auto-spin.
  // Time-based so motion is identical on 60Hz, 120Hz or slower displays.
  useEffect(() => {
    let frameId;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      if (hoveredRef.current && !dragRef.current.active) {
        if (Date.now() - lastInteractRef.current > IDLE_RESUME_MS) {
          targetRef.current += AUTO_SPIN_DPS * dt;
        }
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
    // Page scroll moves the card under a stationary cursor: refresh geometry.
    window.addEventListener('scroll', refreshRect, true);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', refreshRect, true);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoveredRef.current = true;
    lastInteractRef.current = Date.now();
    refreshRect();
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || dragRef.current.active) return;
    const rect = rectRef.current || containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    // Full left-to-right cursor travel maps to one full 360° turn.
    targetRef.current = (progress - 0.5) * 360;
    lastInteractRef.current = Date.now();
  };

  const handleMouseLeave = () => {
    dragRef.current.active = false;
    setIsHovered(false);
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
    lastInteractRef.current = Date.now();
    refreshRect();
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const deltaX = clientX - dragRef.current.startX;

    if (Math.abs(deltaX) > 4) {
      dragRef.current.moved = true;
    }

    targetRef.current = dragRef.current.startRotation + deltaX * DRAG_FACTOR;
    lastInteractRef.current = Date.now();
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
      onMouseMove={handleMouseMove}
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

      {/* Subtle Drag/Move Hint on hover */}
      <div
        className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
          MOVE MOUSE TO ROTATE 360°
        </span>
      </div>
    </div>
  );
}
