// ─── CONTROLLER (MVC) ───────────────────────────────────────────────────────
// Search logic: query state + Model lookup over the Express API. No JSX.

import { useState } from 'react';
import SearchModel from '../models/searchModel.js';
import { useApiData } from '../hooks/useApiData.js';

export function useSearchController() {
  const [query, setQuery] = useState('');

  // MODEL (async API) — refetches on every keystroke (local API, instant)
  const payload = useApiData(() => SearchModel.searchAll(query), [query]);
  const popular = useApiData(() => SearchModel.getPopularSearches(), []);

  const results = payload || { products: [], recipes: [], news: [] };

  return { query, setQuery, results, popularSearches: popular || [] };
}

export default useSearchController;
