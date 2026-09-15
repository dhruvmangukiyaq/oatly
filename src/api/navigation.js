// ─── API: navigation ────────────────────────────────────────────────────────
import { apiGet } from './client.js';

export function fetchNavItems() {
  return apiGet('/navigation');
}
