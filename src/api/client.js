// ─── API CLIENT ─────────────────────────────────────────────────────────────
// Single fetch wrapper for the Express backend. In dev, Vite proxies
// `/api/*` → http://localhost:8901 (see vite.config.js). In production the
// same Express server serves both the API and the built frontend.
//
// PERFORMANCE: responses are cached twice —
//   1. In-memory dedupe: concurrent/duplicate calls to the same path share
//      one fetch promise (no repeated network round-trips while navigating).
//   2. localStorage: resolved JSON is persisted so a revisit (or a full
//      reload) paints instantly; there is no refetch at all for a cached path.

const BASE = '/api';

// Cache version — bump to force a clean slate after backend shape changes.
const STORAGE_KEY = 'oatly.api.cache.v5';

// Resolved values (URL → JSON), hydrated synchronously from localStorage.
const stored = (() => {
  if (typeof localStorage === 'undefined') return new Map();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Map(Object.entries(raw ? JSON.parse(raw) : {}));
  } catch {
    return new Map();
  }
})();

// In-flight fetch promises (URL → Promise) — dedupes simultaneous calls.
const pending = new Map();

function persist() {
  if (typeof localStorage === 'undefined') return;
  try {
    const snapshot = {};
    for (const [k, v] of stored) {
      if (v === null || typeof v === 'object') snapshot[k] = v;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* storage full / unavailable — cache simply stays in memory */
  }
}

export async function apiGet(path) {
  const url = `${BASE}${path}`;
  if (pending.has(url)) return pending.get(url);
  if (stored.has(url)) return Promise.resolve(stored.get(url));

  const p = (async () => {
    const res = await fetch(url);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
    const json = await res.json();
    stored.set(url, json);
    persist();
    return json;
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
