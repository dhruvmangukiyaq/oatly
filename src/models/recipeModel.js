// ─── MODEL (MVC, async over API) ────────────────────────────────────────────
// Same function names as before — now backed by the Express backend.

import {
  fetchVol3,
  fetchAw25,
  fetchSs25,
  fetchRecipeBySlug,
} from '../api/recipes.js';

export async function getAllRecipes() {
  const [vol3, aw25, ss25] = await Promise.all([fetchVol3(), fetchAw25(), fetchSs25()]);
  return [...(vol3?.recipes || []), ...(aw25?.recipes || []), ...(ss25?.recipes || [])];
}

export async function getFeaturedRecipes() {
  const vol3 = await fetchVol3();
  return vol3?.recipes || [];
}

export async function getLookBookVol3Recipes() {
  const vol3 = await fetchVol3();
  return vol3?.recipes || [];
}

export async function getLookBookVol3Page() {
  const vol3 = await fetchVol3();
  return vol3?.page || null;
}

export async function getAw25Collection() {
  return fetchAw25();
}

export async function getSs25Collection() {
  return fetchSs25();
}

export async function getRecipeBySlug(slug) {
  return fetchRecipeBySlug(slug);
}

const RecipeModel = {
  getAllRecipes,
  getFeaturedRecipes,
  getLookBookVol3Recipes,
  getLookBookVol3Page,
  getAw25Collection,
  getSs25Collection,
  getRecipeBySlug,
};

export default RecipeModel;
