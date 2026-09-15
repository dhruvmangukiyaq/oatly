// ─── CONTROLLER (MVC) ───────────────────────────────────────────────────────
// Products page logic: filtering by category + search query + URL sync.
// Data comes from the Model (async Express API). No JSX.

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';

export function useProductsController() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedCategory(categoryParam || 'All');
  }, [categoryParam]);

  // MODEL (async API)
  const categories = useApiData(() => ProductModel.getProductCategoryNames(), []);
  const filteredProducts = useApiData(
    () => ProductModel.filterProducts({ category: selectedCategory, query: searchQuery }),
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
  // MODEL (async API)
  const data = useApiData(() => ProductModel.getCategoryBySlug(categorySlug).then(async (category) => {
    if (!category) return { category: null, products: [] };
    const products = await ProductModel.getProductsByCategorySlug(categorySlug);
    return { category, products };
  }), [categorySlug]);
  return data || { category: null, products: null };
}

export default useProductsController;
