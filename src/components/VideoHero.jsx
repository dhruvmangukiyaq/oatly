import { useEffect, useRef, useState } from 'react';

// ─── VIDEO HERO — scroll-scrubbed cinematic intro ───────────────────────────
// The Home Page opens with the real Pixabay film 216035 (an astronaut
// relaxing on the Moon as the camera slowly pulls back). The video never
// plays on its own: scroll progress across the long sticky journey maps
// linearly to video.currentTime, so scrolling down advances the film and
// scrolling up rewinds it — fully reversible, no autoplay, no loop.
//
// Sources: both renditions are re-encoded from the original 1080p file with
// a keyframe every 0.2s (the stock files had ONE keyframe per 8s clip, so
// every seek re-decoded from frame 0 — that was the choppy scrubbing).
// Desktop gets 1920×1080, phones the 1280×720 tier via <source media>.
//
// HomePage reserves .hp-video (450vh, dark) in the main bundle → zero
// layout shift while this component lazy-loads. Sticky height is written to
// --video-vh from the real scroller height, because the app scrolls inside
// [data-app-scroll], not the window.
//
// One rAF loop does everything:
//   scroll → target progress → time-constant smoothing (70ms, frame-rate
//   independent) → desired time → chained currentTime seeks (sub-frame
//   epsilon, immediate re-issue on 'seeked', 55ms stall grace) → frame.
// Zero React state on the scroll path; the hint is styled directly;
// the loop parks itself while the journey is off-screen (IO gate).

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const SMOOTH_TAU = 0.07; // seconds — 95% of the way in ~210ms: smooth, not laggy
const SEEK_EPS = 0.008; // seconds (~1/5 frame) — skip only identical targets
const SEEK_GRACE = 55; // ms — replace an in-flight seek only if it stalls this long

export default function VideoHero() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const hintRef = useRef(null);
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
    const t = setTimeout(() => setReady(true), 12000);
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
    let lastNow = 0;
    let seeking = false;
    let seekIssuedAt = 0;
    let lastIssued = -1;
    let pending = -1; // freshest desired time while a seek is in flight
    let lastHint = -1; // last written hint opacity (skip no-op DOM writes)

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

    const issue = (t) => {
      lastIssued = t;
      seekIssuedAt = performance.now();
      seeking = true;
      try {
        video.currentTime = t;
      } catch {
        seeking = false;
      }
    };

    const want = (t) => {
      pending = t;
      if (seeking) return;
      if (Math.abs(t - video.currentTime) < SEEK_EPS) return;
      issue(t);
    };

    const onSeeked = () => {
      seeking = false;
      // chain straight to the freshest target — this is what keeps the
      // displayed frame advancing continuously while the user scrolls
      if (pending >= 0 && Math.abs(pending - video.currentTime) >= SEEK_EPS) {
        issue(pending);
      }
    };

    const tick = (now) => {
      if (!alive) return;
      if (dirty) measure();

      // time-constant smoothing — frame-rate independent (a per-frame factor
      // would crawl at low fps and snap at high fps)
      const dt = lastNow ? Math.min(0.1, Math.max(0.001, (now - lastNow) / 1000)) : 0.016;
      lastNow = now;
      value += (target - value) * (1 - Math.exp(-dt / SMOOTH_TAU));
      if (Math.abs(target - value) < 0.0004) value = target;

      const dur = video.duration;
      if (Number.isFinite(dur) && dur > 0) {
        // land on the final frame, never exactly at duration (avoids "ended")
        const maxT = dur - 1 / 25;
        const t = Math.min(maxT, Math.max(0, value * dur));
        if (seeking) {
          pending = t;
          if (
            performance.now() - seekIssuedAt > SEEK_GRACE &&
            Math.abs(t - lastIssued) >= SEEK_EPS
          ) {
            issue(t); // stalled seek — replace it rather than freeze the frame
          }
        } else {
          want(t);
        }
      }

      if (value !== lastHint && hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - value * 16));
        lastHint = value;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!alive || near || raf) return;
      near = true;
      dirty = true;
      lastNow = 0;
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
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          >
            {/* Desktop/tablet: full 1920×1080 source; phones: 720p tier.
                Both are the same film, re-encoded with dense keyframes. */}
            <source media="(min-width: 701px)" src="/video/216035-hero-1080.mp4" type="video/mp4" />
            <source src="/video/216035-hero-720.mp4" type="video/mp4" />
          </video>
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
