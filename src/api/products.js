// ─── API: products ──────────────────────────────────────────────────────────
import { apiGet, query } from './client.js';

export function fetchCategories() {
  return apiGet('/products/categories');
}

export function fetchCategory(slug) {
  return apiGet(`/products/category/${slug}`);
}

export function fetchFilteredProducts({ category = 'All', q = '', brand = 'All' } = {}) {
  return apiGet(`/products${query({ category, q, brand })}`);
}

export function fetchCategoryNames() {
  return apiGet('/products/category-names');
}

export function fetchBrands() {
  return apiGet('/products/brands');
}

export function fetchBrand(brand) {
  return apiGet(`/products/brand/${encodeURIComponent(brand)}`);
}
