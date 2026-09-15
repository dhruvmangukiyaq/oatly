// ─── MODEL (MVC) ────────────────────────────────────────────────────────────
// Pure JavaScript data-access layer for Recipes / Tastebuds.
// No JSX, no React.

import { RECIPES_DATA } from '../data/oatlyData.js';
import {
  LOOK_BOOK_VOL_3_RECIPES,
  LOOK_BOOK_VOL_3_HERO,
  EDITORIAL_SECTION,
  NEXT_COLLECTION_TEASER,
} from '../data/lookBookVol3Data.js';
import { AW25_COLLECTION, SS25_COLLECTION } from '../data/lookBookCollections.js';

export function getAllRecipes() {
  return [...RECIPES_DATA, ...LOOK_BOOK_VOL_3_RECIPES];
}

export function getFeaturedRecipes() {
  return RECIPES_DATA;
}

export function getLookBookVol3Recipes() {
  return LOOK_BOOK_VOL_3_RECIPES;
}

export function getLookBookVol3Hero() {
  return LOOK_BOOK_VOL_3_HERO;
}

export function getEditorialSection() {
  return EDITORIAL_SECTION;
}

export function getNextCollectionTeaser() {
  return NEXT_COLLECTION_TEASER;
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

const RecipeModel = {
  getAllRecipes,
  getFeaturedRecipes,
  getLookBookVol3Recipes,
  getLookBookVol3Hero,
  getEditorialSection,
  getNextCollectionTeaser,
  getRecipeBySlug,
  searchRecipes,
};

export default RecipeModel;
