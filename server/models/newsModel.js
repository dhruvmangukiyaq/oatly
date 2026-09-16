// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// News / Stories data-access layer (pure functions, no HTTP here).

import { NEWS_DATA } from './data/oatlyData.js';
import { newsItems, initiativesData, brainwashingData } from './data/siteData.js';

export function getAllNews() {
  return initiativesData;
}

export function getAllStories() {
  return [...newsItems, ...brainwashingData];
}

export function getStoryBySlug(slug) {
  return (
    newsItems.find((n) => n.slug === slug) ||
    initiativesData.find((n) => n.slug === slug) ||
    brainwashingData.find((n) => n.slug === slug) ||
    NEWS_DATA.find((n) => n.id === slug) ||
    null
  );
}

export function searchNews(query = '') {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const pool = [...NEWS_DATA, ...newsItems, ...initiativesData, ...brainwashingData];
  return pool.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      (n.type || '').toLowerCase().includes(q) ||
      (n.excerpt || '').toLowerCase().includes(q)
  );
}
