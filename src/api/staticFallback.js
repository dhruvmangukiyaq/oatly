// ─── STATIC API FALLBACK ────────────────────────────────────────────────────
// Vercel (and any other static host) serves only the Vite build — there is no
// Express backend, so `/api/*` returns an HTML 404 page and every page that
// waits for API data renders blank (Navbar returns null, pages return null).
//
// This module answers every `/api/*` path from the SAME backend model files
// the Express server uses (server/models/* — pure functions, no Node APIs),
// with the SAME JSON shape the controllers send. Single source of truth, no
// duplicated data.
//
// It is loaded LAZILY (dynamic import from client.js) and only when the
// network backend is unreachable or answers non-JSON — so local dev with
// `npm run server` keeps using the live backend at zero cost.

import * as Navigation from '../../server/models/navigationModel.js';
import * as Products from '../../server/models/productModel.js';
import * as Recipes from '../../server/models/recipeModel.js';
import * as News from '../../server/models/newsModel.js';
import * as Content from '../../server/models/contentModel.js';
import * as Search from '../../server/models/searchModel.js';

// Mirrors server/controllers/* — same response shapes.
function answer(pathname, params) {
  // ── Navigation ──
  if (pathname === '/navigation') return Navigation.getNavItems();

  // ── Products (static paths first, like server/routes/products.js) ──
  if (pathname === '/products/categories') return Products.getProductCategories();
  if (pathname === '/products/category-names') return Products.getProductCategoryNames();
  if (pathname.startsWith('/products/category/')) {
    const slug = decodeURIComponent(pathname.replace('/products/category/', ''));
    const category = Products.getCategoryBySlug(slug);
    if (!category) return null;
    return { category, products: Products.getProductsByCategorySlug(slug) };
  }
  if (pathname.startsWith('/products/item/')) {
    return Products.getProductById(pathname.replace('/products/item/', ''));
  }
  if (pathname === '/products') {
    return Products.filterProducts({
      category: params.get('category') || 'All',
      query: params.get('q') || '',
    });
  }

  // ── Recipes ──
  if (pathname === '/recipes/vol3') {
    return { recipes: Recipes.getLookBookVol3Recipes(), page: Recipes.getLookBookVol3Page() };
  }
  if (pathname === '/recipes/aw25') return Recipes.getAw25Collection();
  if (pathname === '/recipes/ss25') return Recipes.getSs25Collection();
  if (pathname === '/recipes/featured') return Recipes.getFeaturedRecipes();
  if (pathname.startsWith('/recipes/slug/')) {
    return Recipes.getRecipeBySlug(decodeURIComponent(pathname.replace('/recipes/slug/', '')));
  }

  // ── News ──
  if (pathname === '/news') {
    return { news: News.getAllNews(), stories: News.getAllStories() };
  }
  if (pathname.startsWith('/news/')) {
    return News.getStoryBySlug(decodeURIComponent(pathname.replace('/news/', '')));
  }

  // ── Content ──
  if (pathname === '/content/home') {
    return { images: Content.getHomepageImages(), cards: Content.getHomepageCards() };
  }
  if (pathname === '/content/sustainability') return Content.getSustainabilityData();
  if (pathname.startsWith('/content/sustainability/section/')) {
    return Content.getSustainabilitySection(pathname.replace('/content/sustainability/section/', ''));
  }
  if (pathname === '/content/plan') return Content.getSustainabilityPlan();
  if (pathname === '/content/nutrition') return Content.getNutritionFacts();
  if (pathname === '/content/future-of-taste') return Content.getFutureOfTaste();
  if (pathname === '/content/meta') return Content.getSiteMeta();

  // ── Search ──
  if (pathname === '/search') {
    const q = params.get('q') || '';
    return { ...Search.searchAll(q), popular: Search.POPULAR_SEARCHES };
  }

  return undefined; // unknown path — no static answer
}

export function getStaticResponse(path) {
  try {
    const url = new URL(path, 'http://static');
    const data = answer(url.pathname, url.searchParams);
    if (data === undefined) return { found: false };
    return { found: true, data: data ?? null };
  } catch {
    return { found: false };
  }
}
