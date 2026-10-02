// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// Products data-access layer (pure functions over local data, no HTTP here).
// Mirrors the frontend contract so the API stays in sync with the UI.
//
// SINGLE SOURCE OF TRUTH: category items (productCategories) j badhu chhe.
// Listing (63 items) ane detail/search/cart badha ej list parthi ave chhe,
// etle card click → detail page hammesha malse (be alag list no mismatch nai).

import { productCategories } from './data/siteData.js';

function allItems() {
  return productCategories.flatMap((cat) => cat.items || []);
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

export function filterProducts({ category = 'All', query = '' } = {}) {
  const q = query.trim().toLowerCase();
  return allItems().filter((p) => {
    const matchesCategory =
      category === 'All' ||
      p.category === category ||
      p.subCategory === category;
    const matchesQuery =
      q === '' ||
      (p.name || '').toLowerCase().includes(q) ||
      (p.tagline || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

export function getProductCategoryNames() {
  const fromData = productCategories.map((c) => c.name);
  return ['All', ...Array.from(new Set(fromData))];
}
