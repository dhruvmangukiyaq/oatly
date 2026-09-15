// ─── API: recipes ───────────────────────────────────────────────────────────
import { apiGet } from './client.js';

export function fetchVol3() {
  return apiGet('/recipes/vol3');
}

export function fetchAw25() {
  return apiGet('/recipes/aw25');
}

export function fetchSs25() {
  return apiGet('/recipes/ss25');
}

export function fetchRecipeBySlug(slug) {
  return apiGet(`/recipes/slug/${slug}`);
}
