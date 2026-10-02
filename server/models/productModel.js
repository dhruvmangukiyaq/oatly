// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// Products data-access layer (pure functions over local data, no HTTP here).
// Mirrors the frontend contract so the API stays in sync with the UI.
//
// SINGLE SOURCE OF TRUTH: category items (productCategories) j badhu chhe.
// Listing (63 items) ane detail/search/cart badha ej list parthi ave chhe,
// etle card click → detail page hammesha malse (be alag list no mismatch nai).

import { productCategories, BRANDS } from './data/siteData.js';

function allItems() {
  return productCategories.flatMap((cat) => cat.items || []).map((p) => ({
    brand: 'Oatara',
    ...p,
  }));
}

export function getAllProducts() {
  return allItems();
}

export function getProductById(id) {
  const key = String(id);
  return allItems().find((p) => String(p.id) === key || String(p.slug) === key) || null;
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
  return category.items || [];
}

export function filterProducts({ category = 'All', query = '', brand = 'All' } = {}) {
  const q = String(query || '').trim().toLowerCase();
  const b = String(brand || 'All').trim().toLowerCase();
  return allItems().filter((p) => {
    const matchesCategory =
      category === 'All' ||
      p.category === category ||
      p.subCategory === category;
    const matchesBrand =
      b === 'all' ||
      (p.brand || 'Oatara').toLowerCase() === b;
    const matchesQuery =
      q === '' ||
      (p.name || '').toLowerCase().includes(q) ||
      (p.brand || '').toLowerCase().includes(q) ||
      (p.tagline || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q);
    return matchesCategory && matchesBrand && matchesQuery;
  });
}

export function getProductCategoryNames() {
  const fromData = productCategories.map((c) => c.name);
  return ['All', ...Array.from(new Set(fromData))];
}

export function getBrands() {
  if (Array.isArray(BRANDS) && BRANDS.length > 0) return BRANDS;
  const fromItems = Array.from(
    new Set(allItems().map((p) => p.brand || 'Oatara').filter(Boolean)),
  );
  return fromItems.map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name }));
}

export function getProductsByBrand(brandName) {
  const b = String(brandName || '').trim().toLowerCase();
  if (!b || b === 'all') return allItems();
  return allItems().filter((p) => (p.brand || 'Oatara').toLowerCase() === b);
}
