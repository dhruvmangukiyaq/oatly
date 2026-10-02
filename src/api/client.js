// ─── API CLIENT ─────────────────────────────────────────────────────────────
// Single fetch wrapper for the Express backend. In dev, Vite proxies
// `/api/*` → http://localhost:8901 (see vite.config.js). In production the
// same Express server serves both the API and the built frontend.
//
// STATIC HOSTING (Vercel): there is no Express backend — `/api/*` answers
// with an HTML page. In that case (network error or non-JSON response) we
// answer from the bundled static fallback (same backend models, same shapes)
// so pages render instead of staying blank. The fallback chunk loads lazily,
// only when the backend is unreachable.
//
// PERFORMANCE: responses are cached twice —
//   1. In-memory dedupe: concurrent/duplicate calls to the same path share
//      one fetch promise (no repeated network round-trips while navigating).
//   2. localStorage with TTL: resolved JSON is persisted so a revisit paints
//      instantly, but entries older than CACHE_TTL_MS refetch — stale data
//      (e.g. an older catalog) can never stick around forever.

// Cache version — bump to force a clean slate after backend shape changes.
// v15: TTL-based cache (see below); v13/v14 leftovers are cleaned on load.
const STORAGE_KEY = 'oatara.api.cache.v15';
const OLD_KEYS = ['oatara.api.cache.v13', 'oatara.api.cache.v14'];
const CACHE_TTL_MS = 15 * 60 * 1000;

// Resolved values (URL → { data, fetchedAt }), hydrated synchronously from
// localStorage. Expired or malformed entries are dropped on the floor.
function readCache() {
  const empty = () => ({ data: new Map(), time: new Map() });
  if (typeof localStorage === 'undefined') return empty();
  try {
    OLD_KEYS.forEach((k) => localStorage.removeItem(k));
    const raw = localStorage.getItem(STORAGE_KEY);
    const obj = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    const data = new Map();
    const time = new Map();
    for (const [k, v] of Object.entries(obj)) {
      const t = v && typeof v === 'object' ? Number(v.t) : NaN;
      if (v && typeof v === 'object' && 'd' in v && Number.isFinite(t) && now - t < CACHE_TTL_MS) {
        data.set(k, v.d);
        time.set(k, t);
      }
    }
    return { data, time };
  } catch {
    return empty();
  }
}

const cache = readCache();
const stored = cache.data;
const fetchedAt = cache.time;

function isFresh(url) {
  return stored.has(url) && Date.now() - (fetchedAt.get(url) || 0) < CACHE_TTL_MS;
}

function remember(url, value) {
  stored.set(url, value);
  fetchedAt.set(url, Date.now());
  persist();
}

const BASE = '/api';

// In-flight fetch promises (URL → Promise) — dedupes simultaneous calls.
const pending = new Map();

function persist() {
  if (typeof localStorage === 'undefined') return;
  try {
    const snapshot = {};
    for (const [k, v] of stored) {
      if (v === null || typeof v === 'object') snapshot[k] = { d: v, t: fetchedAt.get(k) || Date.now() };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* storage full / unavailable — cache simply stays in memory */
  }
}

export async function apiGet(path) {
  const url = `${BASE}${path}`;
  if (pending.has(url)) return pending.get(url);
  // Fresh cache → instant paint. Stale/missing → refetch (never stuck).
  if (isFresh(url)) return Promise.resolve(stored.get(url));
  stored.delete(url);

  const p = (async () => {
    // 1. Try the live backend first (dev proxy / production Express server).
    try {
      const res = await fetch(url);
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('json')) {
        // Genuine backend answer (including 404 = really missing).
        if (res.status === 404) return null;
        if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
        const json = await res.json();
        remember(url, json);
        return json;
      }
      // Non-JSON (static host serving index.html / 404 page) → no backend.
    } catch {
      // Network error / backend down → fall through to static data.
    }

    // 2. Bundled static fallback — same backend models, same JSON shapes.
    // Lazy chunk: only downloaded when the backend is unreachable.
    try {
      const { getStaticResponse } = await import('./staticFallback.js');
      const fb = getStaticResponse(path);
      if (fb.found) {
        remember(url, fb.data);
        return fb.data;
      }
    } catch {
      /* bundling edge — behave as before */
    }
    return null;
  })();

  pending.set(url, p);
  p.finally(() => pending.delete(url)).catch(() => {});
  return p;
}

export function query(params = {}) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') sp.set(k, v);
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
}
