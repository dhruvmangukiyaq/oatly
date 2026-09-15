// ─── API: news ──────────────────────────────────────────────────────────────
import { apiGet } from './client.js';

export function fetchNews() {
  return apiGet('/news');
}

export function fetchStoryBySlug(slug) {
  return apiGet(`/news/${slug}`);
}
