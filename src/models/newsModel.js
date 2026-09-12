// ─── MODEL (MVC) ────────────────────────────────────────────────────────────
// Pure JavaScript data-access layer for News / Stories / Initiatives.

import { NEWS_DATA } from '../data/oatlyData.js';
import { newsItems } from '../data/siteData.js';

export function getAllNews() {
  return NEWS_DATA;
}

export function getAllStories() {
  return newsItems;
}

export function getStoryBySlug(slug) {
  return (
    newsItems.find((n) => n.slug === slug) ||
    NEWS_DATA.find((n) => n.id === slug) ||
    null
  );
}

export function searchNews(query = '') {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return NEWS_DATA.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      (n.type || '').toLowerCase().includes(q) ||
      (n.excerpt || '').toLowerCase().includes(q)
  );
}

const NewsModel = {
  getAllNews,
  getAllStories,
  getStoryBySlug,
  searchNews,
};

export default NewsModel;
