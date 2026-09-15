// ─── MODEL (MVC, async over API) ────────────────────────────────────────────
// Same function names as before — now backed by the Express backend.

import { fetchNews, fetchStoryBySlug } from '../api/news.js';
import { fetchSearch } from '../api/search.js';

export async function getAllNews() {
  const data = await fetchNews();
  return data?.news || [];
}

export async function getAllStories() {
  const data = await fetchNews();
  return data?.stories || [];
}

export async function getStoryBySlug(slug) {
  return fetchStoryBySlug(slug);
}

export async function searchNews(query = '') {
  const data = await fetchSearch(query);
  return data?.news || [];
}

const NewsModel = {
  getAllNews,
  getAllStories,
  getStoryBySlug,
  searchNews,
};

export default NewsModel;
