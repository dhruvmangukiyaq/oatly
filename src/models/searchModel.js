// ─── MODEL (MVC, async over API) ────────────────────────────────────────────
// Unified search across Products / Recipes / News via the backend.

import { fetchSearch } from '../api/search.js';

export async function getPopularSearches() {
  const data = await fetchSearch('');
  return data?.popular || [];
}

export async function searchAll(query = '') {
  const q = query.trim();
  if (!q) return { products: [], recipes: [], news: [] };
  const data = await fetchSearch(q);
  return {
    products: data?.products || [],
    recipes: data?.recipes || [],
    news: data?.news || [],
  };
}

const SearchModel = { searchAll, getPopularSearches };

export default SearchModel;
