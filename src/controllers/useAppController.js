// ─── CONTROLLER (MVC) ───────────────────────────────────────────────────────
// Global app state: which modals are open and what is selected.
// Pure JavaScript (React hooks only, no JSX).
// The View (App.jsx) calls this and passes data down via props.

import { useState, useCallback } from 'react';

export function useAppController() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const selectProduct = useCallback((p) => setSelectedProduct(p), []);
  const clearProduct = useCallback(() => setSelectedProduct(null), []);

  const selectRecipe = useCallback((r) => setSelectedRecipe(r), []);
  const clearRecipe = useCallback(() => setSelectedRecipe(null), []);

  const selectArticle = useCallback((a) => setSelectedArticle(a), []);
  const clearArticle = useCallback(() => setSelectedArticle(null), []);

  return {
    searchOpen,
    openSearch,
    closeSearch,
    selectedProduct,
    selectProduct,
    clearProduct,
    selectedRecipe,
    selectRecipe,
    clearRecipe,
    selectedArticle,
    selectArticle,
    clearArticle,
  };
}

export default useAppController;
