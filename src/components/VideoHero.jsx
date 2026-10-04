import { useEffect, useRef, useState } from 'react';

// ─── VIDEO HERO — scroll-scrubbed cinematic intro ───────────────────────────
// The Home Page opens with the real MP4 (216035_medium.mp4 — an astronaut
// relaxing on the Moon as the camera slowly pulls back). The video never
// plays on its own: scroll progress across the long sticky journey maps
// linearly to video.currentTime, so scrolling down advances the film and
// scrolling up rewinds it — fully reversible, no autoplay, no controls.
//
// HomePage reserves .hp-video (400vh, dark) in the main bundle → zero layout
// shift while this component lazy-loads. Sticky height is written to
// --video-vh from the real scroller height, because the app scrolls inside
// [data-app-scroll], not the window.
//
// One rAF loop does everything: it reads the damped scroll value, seeks the
// video only when the target time moved far enough (no seek storms), and
// writes the hint/hairline styles directly — zero React state on the scroll
// path. The loop parks itself while the journey is off-screen (IO gate).

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const DAMP = 0.25; // per-frame blend → ~0.35s settle at 60fps, no visible lag
const SEEK_EPS = 0.03; // seconds — don't re-seek for sub-frame differences

export default function VideoHero() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const hintRef = useRef(null);
  const lineRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced] = useState(
    () =>
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // sticky height = the real scroller height (px, measured)
  useEffect(() => {
    const scroller = document.querySelector('[data-app-scroll]');
    const setVh = () => {
      const h = scroller ? scroller.clientHeight : window.innerHeight;
      document.documentElement.style.setProperty('--video-vh', `${h}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      document.documentElement.style.removeProperty('--video-vh');
    };
  }, []);

  // loading state — dark veil until the first frame is decodable
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const onReady = () => setReady(true);
    const onError = () => {
      setFailed(true);
      setReady(true);
    };
    if (v.readyState >= 2) setReady(true);
    v.addEventListener('loadeddata', onReady);
    v.addEventListener('error', onError);
    // safety: never trap the visitor behind the veil (slow network, etc.)
    const t = setTimeout(() => setReady(true), 9000);
    return () => {
      v.removeEventListener('loadeddata', onReady);
      v.removeEventListener('error', onError);
      clearTimeout(t);
    };
  }, []);

  // the scrub loop (skipped under reduced motion — static first frame)
  useEffect(() => {
    if (reduced) return undefined;
    const root = rootRef.current;
    const video = videoRef.current;
    const scroller = document.querySelector('[data-app-scroll]');
    if (!root || !video || !scroller) return undefined;

    let raf = 0;
    let alive = true;
    let near = false;
    let dirty = true; // scroll happened → re-measure inside the loop
    let target = 0;
    let value = 0;
    let seeking = false;
    let lastIssued = -1;

    const measure = () => {
      dirty = false;
      const s = root.getBoundingClientRect();
      const c = scroller.getBoundingClientRect();
      const travel = s.height - c.height;
      target = travel > 0 ? clamp01((c.top - s.top) / travel) : 0;
    };

    const onScroll = () => {
      dirty = true;
    };

    const onSeeked = () => {
      seeking = false;
    };

    const seekTo = (t) => {
      if (seeking) {
        // a seek is in flight — only override it for a meaningfully new time
        if (Math.abs(t - lastIssued) < SEEK_EPS) return;
      } else if (Math.abs(t - video.currentTime) < SEEK_EPS) {
        return;
      }
      lastIssued = t;
      seeking = true;
      try {
        video.currentTime = t;
      } catch {
        seeking = false;
      }
    };

    const tick = () => {
      if (!alive) return;
      if (dirty) measure();
      value += (target - value) * DAMP;
      if (Math.abs(target - value) < 0.0004) value = target;

      const dur = video.duration;
      if (Number.isFinite(dur) && dur > 0) {
        // land on the final frame, never exactly at duration (avoids "ended")
        const maxT = dur - 1 / 25;
        seekTo(Math.min(maxT, Math.max(0, value * dur)));
      }
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleY(${value.toFixed(4)})`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - value * 16));
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!alive || near || raf) return;
      near = true;
      dirty = true;
      measure();
      value = target;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      near = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([e]) => (e.isIntersecting ? start() : stop()),
        { rootMargin: '80% 0px' }
      );
      io.observe(root);
    } else {
      start();
    }

    // the video must never start "playing" — scrubbing only
    const guardPlay = () => {
      if (!video.paused) video.pause();
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('play', guardPlay);

    return () => {
      alive = false;
      stop();
      if (io) io.disconnect();
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('play', guardPlay);
    };
  }, [reduced]);

  return (
    <section className="hp-video__journey" ref={rootRef} aria-label="Lunar film">
      <div
        className="hp-video__sticky"
        role="img"
        aria-label="An astronaut relaxes on a chair on the Moon, watching Earth"
      >
        {!failed && (
          <video
            ref={videoRef}
            className="hp-video__film"
            src="/video/216035_medium.mp4"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        {failed && (
          <div className="hp-video__fallback">Video unavailable — scroll on</div>
        )}

        <div
          className={`hp-video__veil${ready ? ' is-ready' : ''}`}
          aria-hidden={ready}
        >
          <div className="hp-video__orbit" />
        </div>

        <div className="hp-video__line" aria-hidden="true">
          <i ref={lineRef} />
        </div>
        <div className="hp-video__hint" ref={hintRef} aria-hidden="true">
          <span>Scroll to explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
