// ─── API CLIENT ─────────────────────────────────────────────────────────────
// Single fetch wrapper for the Express backend. In dev, Vite proxies
// `/api/*` → http://localhost:8901 (see vite.config.js). In production the
// same Express server serves both the API and the built frontend.

const BASE = '/api';

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

export function query(params = {}) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') sp.set(k, v);
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
}
