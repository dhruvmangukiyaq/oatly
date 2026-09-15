// ─── API: search ────────────────────────────────────────────────────────────
import { apiGet, query } from './client.js';

export function fetchSearch(q = '') {
  return apiGet(`/search${query({ q })}`);
}
