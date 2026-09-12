// ─── CONTROLLER (MVC) ───────────────────────────────────────────────────────
// Search logic: query state + Model lookup. No JSX.

import { useState, useMemo } from 'react';
import SearchModel from '../models/searchModel.js';

export function useSearchController() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => SearchModel.searchAll(query), [query]);
  const popularSearches = SearchModel.POPULAR_SEARCHES;

  return { query, setQuery, results, popularSearches };
}

export default useSearchController;
