import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreStage from '../three/StoreStage.jsx';
import { PROG, CAPTIONS, STORE_IDS } from '../three/storeConfig.js';

// ─── STORE HERO — scroll-built premium boutique ─────────────────────────────
// The Home Page opens on a bare, empty floor lit by one construction lamp.
// The video never plays on its own: scroll progress across the long sticky
// journey maps to a master timeline — the room assembles, racks drop, clothes
// land rail by rail, mannequins dress, and the camera pulls back the whole
// way to a wide storefront composition. Scroll up → the store un-builds.
// Every scene value is a pure function of PROG.p, so the whole thing is
// exactly reversible with zero autoplay.
//
// HomePage reserves .hp-video (450vh, dark) in the main bundle → zero
// layout shift while this component lazy-loads. Sticky height is written to
// --video-vh from the real scroller height, because the app scrolls inside
// [data-app-scroll], not the window.
//
// One rAF loop does everything: scroll → target progress → time-constant
// smoothing (70ms, frame-rate independent) → PROG.p + render invalidation.
// Zero React state on the scroll path; the hint is styled directly; the loop
// parks itself while the journey is off-screen (IO gate).
//
// Catalogue: garments/products on display are real store products — cutout
// WebPs of the existing catalogue images (public/images/store/<id>.webp),
// staged via STORE_IDS; hotspots deep-link to the existing product pages.

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const SMOOTH_TAU = 0.07; // seconds — 95% of the way in ~210ms: smooth, not laggy

// Caption envelope: rise + fade in, hold, drift up + fade out. Two smoothsteps
// on the same window so the copy breathes instead of blinking at the edges.
// The fade is deliberately short (~3% of the journey ≈ 95px of scroll) so a
// beat reads as fully present rather than half-dimmed for half the stage.
const smooth = (t) => t * t * (3 - 2 * t);
function capState(p, w) {
  const [a, b] = w;
  const fade = Math.min(0.03, (b - a) * 0.22);
  const eIn = smooth(clamp01((p - a) / fade));
  const eOut = smooth(clamp01((b - p) / fade));
  return { alpha: Math.min(eIn, eOut), y: 18 * (1 - eIn) - 14 * (1 - eOut) };
}

// Build the staged display list once from the enriched catalogue.
function buildStaged(items) {
  const byId = new Map();
  (items || []).forEach((p) => byId.set(String(p.id ?? p.slug ?? p.name), p));
  const pick = (ids, longRe) =>
    ids
      .map((id) => {
        const p = byId.get(id);
        if (!p) return null;
        return {
          id,
          name: p.name,
          price: Number(p.price) || 0,
          tex: `/images/store/${id}.webp`,
          long: longRe ? longRe.test(id) : false,
        };
      })
      .filter(Boolean);
  return {
    left: pick(STORE_IDS.men, /trouser|jean/),
    right: pick(STORE_IDS.women, /trouser|jean|dress|skirt/),
    shelf: pick(STORE_IDS.shelf),
  };
}

export default function StoreHero({ items, currency = '$' }) {
  const rootRef = useRef(null);
  const hintRef = useRef(null);
  const capRefs = useRef([]); // one node per caption, driven straight from rAF
  const readyRef = useRef(false);
  const navigate = useNavigate();
  const [webgl] = useState(() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      return false;
    }
  });
  const [ready, setReady] = useState(!webgl);
  const [reduced] = useState(() => {
    const r =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (r) {
      // reduced motion: one screen, the finished store, no scroll travel
      PROG.p = 1;
      window.__storeP = 1;
    }
    return r;
  });
  const [isMobile] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(max-width: 700px)').matches,
  );
  // built once — the display set doesn't change during the visit
  const [staged] = useState(() => buildStaged(items));

  const handleReady = () => {
    if (readyRef.current) return;
    readyRef.current = true;
    window.__storeReady = true;
    setReady(true);
  };

  const onOpen = (id) => navigate(`/products/item/${id}`);

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

  // safety: never trap the visitor behind the veil (slow GPU, failed context)
  useEffect(() => {
    if (!webgl) return undefined;
    const t = setTimeout(() => {
      if (readyRef.current) return;
      readyRef.current = true;
      window.__storeReady = true;
      setReady(true);
    }, 12000);
    return () => clearTimeout(t);
  }, [webgl]);

  // the scrub loop (skipped under reduced motion — static finished store)
  useEffect(() => {
    if (reduced) return undefined;
    const root = rootRef.current;
    const scroller = document.querySelector('[data-app-scroll]');
    if (!root || !scroller) return undefined;

    let raf = 0;
    let alive = true;
    let near = false;
    let dirty = true; // scroll happened → re-measure inside the loop
    let target = 0;
    let value = 0;
    let lastNow = 0;
    let lastP = -1; // last progress written to PROG
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

    const tick = (now) => {
      if (!alive) return;
      if (dirty) measure();

      // time-constant smoothing — frame-rate independent (a per-frame factor
      // would crawl at low fps and snap at high fps)
      const dt = lastNow
        ? Math.min(0.1, Math.max(0.001, (now - lastNow) / 1000))
        : 0.016;
      lastNow = now;
      value += (target - value) * (1 - Math.exp(-dt / SMOOTH_TAU));
      if (Math.abs(target - value) < 0.0004) value = target;

      if (value !== lastP) {
        lastP = value;
        PROG.p = value;
        window.__storeP = Math.round(value * 1e4) / 1e4;
        PROG.invalidate?.();
        // editorial captions — same progress value, written straight to the
        // DOM (no React state on the scroll path, no re-render per frame)
        const caps = capRefs.current;
        for (let i = 0; i < caps.length; i += 1) {
          const el = caps[i];
          if (!el) continue;
          const st = capState(value, CAPTIONS[i].w);
          el.style.opacity = st.alpha.toFixed(3);
          el.style.transform = `translate3d(0,${st.y.toFixed(2)}px,0)`;
        }
      } else if (!readyRef.current) {
        // keep frames coming while the veil is still up (textures loading)
        PROG.invalidate?.();
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
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
        rootMargin: '80% 0px',
      });
      io.observe(root);
    } else {
      start();
    }

    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      alive = false;
      stop();
      if (io) io.disconnect();
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  return (
    <section
      className="hp-video__journey"
      ref={rootRef}
      aria-label="Fashion store, built by scrolling"
    >
      <div className="hp-video__sticky">
        {webgl ? (
          <div className="hp-video__canvas">
            <StoreStage
              staged={staged}
              currency={currency}
              onOpen={onOpen}
              onReady={handleReady}
              isMobile={isMobile}
            />
          </div>
        ) : (
          <div className="hp-video__fallback">3D unavailable — scroll on</div>
        )}

        <div className={`hp-video__veil${ready ? ' is-ready' : ''}`} aria-hidden={ready}>
          <div className="hp-video__orbit" />
        </div>

        {/* editorial captions — the storytelling beats, swapped by the very
            same progress value that drives the 3D build (shared CAPTIONS
            config, so copy and choreography can never drift apart) */}
        <div className={`hp-video__caps${reduced ? ' is-static' : ''}`}>
          {CAPTIONS.map((c, i) => (
            <div
              key={c.title}
              className={`hp-video__cap hp-video__cap--${c.align}`}
              ref={(el) => {
                capRefs.current[i] = el;
              }}
            >
              <p className="hp-video__cap-title">{c.title}</p>
              <p className="hp-video__cap-sub">{c.sub}</p>
            </div>
          ))}
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
