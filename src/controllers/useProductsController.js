// ─── CONTROLLER (MVC) ───────────────────────────────────────────────────────
// Products page logic: filtering by category + search query + URL sync.
// Pure JavaScript (React hooks + Model, no JSX).

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductModel from '../models/productModel.js';

export function useProductsController() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedCategory(categoryParam || 'All');
  }, [categoryParam]);

  const categories = useMemo(() => ProductModel.getProductCategoryNames(), []);

  const filteredProducts = useMemo(
    () =>
      ProductModel.filterProducts({
        category: selectedCategory,
        query: searchQuery,
      }),
    [selectedCategory, searchQuery]
  );

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSearchParams({});
  };

  return {
    categories,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    handleCategoryClick,
    resetFilters,
  };
}

export function useCategoryProductsController(categorySlug) {
  const category = ProductModel.getCategoryBySlug(categorySlug);
  const products = useMemo(
    () => ProductModel.getProductsByCategorySlug(categorySlug),
    [categorySlug]
  );
  return { category, products };
}

export default useProductsController;
