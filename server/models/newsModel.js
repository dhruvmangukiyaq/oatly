// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// News / Stories data-access layer (pure functions, no HTTP here).

import { NEWS_DATA } from './data/oatlyData.js';
import { newsItems, initiativesData, brainwashingData } from './data/siteData.js';
import { matchesText } from './textSearch.js';

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
  const q = String(query || '').trim();
  if (!q) return [];
  const pool = [...NEWS_DATA, ...newsItems, ...initiativesData, ...brainwashingData];
  return pool.filter((n) => matchesText([n.title, n.type, n.excerpt, n.category, n.tags], q));
}
