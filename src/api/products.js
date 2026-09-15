// ─── API: products ──────────────────────────────────────────────────────────
import { apiGet, query } from './client.js';

export function fetchCategories() {
  return apiGet('/products/categories');
}

export function fetchCategory(slug) {
  return apiGet(`/products/category/${slug}`);
}

export function fetchFilteredProducts({ category = 'All', q = '' } = {}) {
  return apiGet(`/products${query({ category, q })}`);
}

export function fetchCategoryNames() {
  return apiGet('/products/category-names');
}
