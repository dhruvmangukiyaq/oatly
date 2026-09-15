// ─── BACKEND CONTROLLER ─────────────────────────────────────────────────────
// Recipes / collections: HTTP layer over recipeModel.

import * as Recipes from '../models/recipeModel.js';

export function getVol3(req, res) {
  res.json({ recipes: Recipes.getLookBookVol3Recipes(), page: Recipes.getLookBookVol3Page() });
}

export function getAw25(req, res) {
  res.json(Recipes.getAw25Collection());
}

export function getSs25(req, res) {
  res.json(Recipes.getSs25Collection());
}

export function getFeatured(req, res) {
  res.json(Recipes.getFeaturedRecipes());
}

export function getBySlug(req, res) {
  const recipe = Recipes.getRecipeBySlug(req.params.slug);
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
}
