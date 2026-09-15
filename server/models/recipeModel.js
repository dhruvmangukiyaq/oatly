// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// Recipes / Tastebuds data-access layer (pure functions, no HTTP here).

import { RECIPES_DATA } from './data/oatlyData.js';
import { LOOK_BOOK_VOL_3_RECIPES, LOOKBOOK_PAGE } from './data/lookBookVol3Data.js';
import { AW25_COLLECTION, SS25_COLLECTION } from './data/lookBookCollections.js';

export function getAllRecipes() {
  return [...RECIPES_DATA, ...LOOK_BOOK_VOL_3_RECIPES];
}

export function getFeaturedRecipes() {
  return RECIPES_DATA;
}

export function getLookBookVol3Recipes() {
  return LOOK_BOOK_VOL_3_RECIPES;
}

export function getLookBookVol3Page() {
  return LOOKBOOK_PAGE;
}

export function getAw25Collection() {
  return AW25_COLLECTION;
}

export function getSs25Collection() {
  return SS25_COLLECTION;
}

export function getRecipeBySlug(slug) {
  return (
    LOOK_BOOK_VOL_3_RECIPES.find((r) => r.slug === slug) ||
    AW25_COLLECTION.recipes.find((r) => r.slug === slug) ||
    SS25_COLLECTION.recipes.find((r) => r.slug === slug) ||
    RECIPES_DATA.find((r) => r.id === slug) ||
    null
  );
}

export function searchRecipes(query = '') {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllRecipes().filter((r) => {
    const title = (r.title || r.name || '').toLowerCase();
    const category = (r.category || r.lookbook || r.collection || '').toLowerCase();
    return title.includes(q) || category.includes(q);
  });
}
