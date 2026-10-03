// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// Products data-access layer (pure functions over local data, no HTTP here).
// Mirrors the frontend contract so the API stays in sync with the UI.
//
// SINGLE SOURCE OF TRUTH: the category items (productCategories) are everything.
// The listing (63 items) plus detail/search/cart all come from that same list,
// so a card click always lands on the detail page (never a mismatch between lists).

import { productCategories, BRANDS } from './data/siteData.js';
// Shared matcher (also used by the listing box in src/utils/productSearch.js)
// so /api/search and the products page agree — incl. synonyms like
// perfume → parfum/cologne/fragrance.
import { matchesText, BRAND_HOUSE } from './textSearch.js';

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

// Search haystack for one item: the item's own copy PLUS the shelf it sits
// on. Many catalog items carry no `category`/`tagline` of their own, so the
// category's name/tagline/description/badge is what describes them ("Bleu de
// Chanel" items say "fragrance" only at category level in some lines).
function searchFields(p, cat) {
  return [
    p.name,
    p.brand,
    BRAND_HOUSE[p.brand],
    p.category,
    p.subCategory,
    p.tagline,
    p.description,
    p.volume,
    p.flavor,
    p.format,
    p.packSize,
    cat && cat.name,
    cat && cat.tagline,
    cat && cat.description,
    cat && cat.badge,
  ];
}

export function filterProducts({ category = 'All', query = '', brand = 'All' } = {}) {
  const q = String(query || '').trim();
  const b = String(brand || 'All').trim().toLowerCase();
  return productCategories
    .flatMap((cat) => (cat.items || []).map((p) => ({ p, cat })))
    .filter(({ p, cat }) => {
      const matchesCategory =
        category === 'All' ||
        p.category === category ||
        p.subCategory === category;
      const matchesBrand =
        b === 'all' ||
        (p.brand || 'Oatara').toLowerCase() === b;
      const matchesQuery = q === '' || matchesText(searchFields(p, cat), q);
      return matchesCategory && matchesBrand && matchesQuery;
    })
    .map(({ p }) => ({ brand: 'Oatara', ...p }));
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
