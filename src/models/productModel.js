// ─── MODEL (MVC, async over API) ────────────────────────────────────────────
// Same function names as before — now backed by the Express backend.
// No JSX, no React. Views never call fetch() directly.

import {
  fetchCategories,
  fetchCategory,
  fetchFilteredProducts,
  fetchCategoryNames,
} from '../api/products.js';

export async function getAllProducts() {
  return fetchFilteredProducts({ category: 'All', q: '' });
}

export async function getProductCategories() {
  return fetchCategories();
}

export async function getCategoryBySlug(slug) {
  const data = await fetchCategory(slug);
  return data ? data.category : null;
}

export async function getProductsByCategorySlug(categorySlug) {
  const data = await fetchCategory(categorySlug);
  return data ? data.products : [];
}

export async function filterProducts({ category = 'All', query = '' } = {}) {
  return fetchFilteredProducts({ category, q: query });
}

export async function getProductCategoryNames() {
  return fetchCategoryNames();
}

const ProductModel = {
  getAllProducts,
  getProductCategories,
  getCategoryBySlug,
  getProductsByCategorySlug,
  filterProducts,
  getProductCategoryNames,
};

export default ProductModel;
