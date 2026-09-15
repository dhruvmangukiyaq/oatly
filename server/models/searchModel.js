// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// Unified search across Products / Recipes / News (pure function).

import { filterProducts } from './productModel.js';
import { searchRecipes } from './recipeModel.js';
import { searchNews } from './newsModel.js';

export const POPULAR_SEARCHES = [
  'Barista Edition',
  'Cold Foam',
  'Oatgurt',
  'Ice Cream',
  'Carbon Footprint',
  'LOOK BOOK VOL 3',
];

export function searchAll(query = '') {
  const q = query.trim();
  if (!q) return { products: [], recipes: [], news: [] };
  return {
    products: filterProducts({ category: 'All', query: q }),
    recipes: searchRecipes(q),
    news: searchNews(q),
  };
}
