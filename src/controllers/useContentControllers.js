// ─── CONTROLLER (MVC) ───────────────────────────────────────────────────────
// News / Recipe detail lookups driven by route params. No JSX.

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import NewsModel from '../models/newsModel.js';
import RecipeModel from '../models/recipeModel.js';

export function useNewsController() {
  const stories = useMemo(() => NewsModel.getAllNews(), []);
  return { stories };
}

export function useStoryDetailController() {
  const { slug } = useParams();
  const story = useMemo(() => NewsModel.getStoryBySlug(slug), [slug]);
  return { slug, story };
}

export function useRecipeDetailController() {
  const { slug } = useParams();
  const recipe = useMemo(() => RecipeModel.getRecipeBySlug(slug), [slug]);
  return { slug, recipe };
}

export function useLookBookVol3Controller() {
  return useMemo(
    () => ({
      hero: RecipeModel.getLookBookVol3Hero(),
      recipes: RecipeModel.getLookBookVol3Recipes(),
      editorial: RecipeModel.getEditorialSection(),
      nextTeaser: RecipeModel.getNextCollectionTeaser(),
    }),
    []
  );
}

export default useNewsController;
