// ─── CONTROLLER (MVC) ───────────────────────────────────────────────────────
// News / Recipe detail lookups driven by route params, via the Express API.
// No JSX.

import NewsModel from '../models/newsModel.js';
import RecipeModel from '../models/recipeModel.js';
import { useApiData } from '../hooks/useApiData.js';

export function useNewsController() {
  const data = useApiData(() => NewsModel.getAllNews(), []);
  return { stories: data || null };
}

export function useStoryDetailController(slug) {
  const story = useApiData(() => NewsModel.getStoryBySlug(slug), [slug]);
  return { slug, story };
}

export function useRecipeDetailController(slug) {
  const recipe = useApiData(() => RecipeModel.getRecipeBySlug(slug), [slug]);
  return { slug, recipe };
}

export default useNewsController;
