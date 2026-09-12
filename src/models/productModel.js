// ─── MODEL (MVC) ────────────────────────────────────────────────────────────
// Pure JavaScript data-access layer for Products.
// No JSX, no React. Views never import raw data files directly —
// they go through this Model via a Controller.

import { PRODUCTS_DATA } from '../data/oatlyData.js';
import { productCategories } from '../data/siteData.js';

export function getAllProducts() {
  return PRODUCTS_DATA;
}

export function getProductById(id) {
  return PRODUCTS_DATA.find((p) => p.id === id) || null;
}

export function getProductCategories() {
  return productCategories;
}

export function getCategoryBySlug(slug) {
  return productCategories.find((c) => c.slug === slug) || null;
}

export function getProductsByCategorySlug(categorySlug) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  // Match both flat PRODUCTS_DATA and nested siteData items
  const flat = PRODUCTS_DATA.filter(
    (p) =>
      p.category === category.name ||
      p.subCategory === category.name ||
      p.category.toLowerCase() === category.name.toLowerCase()
  );
  const nested = category.items || [];
  // Merge, de-duplicated by id/slug
  const seen = new Set(flat.map((p) => p.id));
  const merged = [...flat];
  for (const item of nested) {
    if (!seen.has(item.id)) merged.push(item);
  }
  return merged;
}

export function filterProducts({ category = 'All', query = '' } = {}) {
  const q = query.trim().toLowerCase();
  return PRODUCTS_DATA.filter((p) => {
    const matchesCategory =
      category === 'All' ||
      p.category === category ||
      p.subCategory === category;
    const matchesQuery =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      (p.tagline || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

export function getProductCategoryNames() {
  const fromData = PRODUCTS_DATA.map((p) => p.category);
  return ['All', ...Array.from(new Set(fromData))];
}

const ProductModel = {
  getAllProducts,
  getProductById,
  getProductCategories,
  getCategoryBySlug,
  getProductsByCategorySlug,
  filterProducts,
  getProductCategoryNames,
};

export default ProductModel;
