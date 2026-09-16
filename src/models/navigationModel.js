// ─── MODEL (MVC, async over API) ────────────────────────────────────────────
// Same contract as before — Views/Controllers keep calling getNavItems().
// Data now comes from the Express backend (src/api), not local files.

import { fetchNavItems } from '../api/navigation.js';
import ProductModel from './productModel.js';
import RecipeModel from './recipeModel.js';
import NewsModel from './newsModel.js';
import ContentModel from './contentModel.js';

export async function getNavItems() {
  return fetchNavItems();
}

const THINGS_WE_DO = { label: 'Things We Do', to: '/things-we-do' };
const THINGS_SECTIONS = {
  stories: { label: 'Stories', to: '/things-we-do/stories' },
  initiatives: { label: 'Initiatives', to: '/things-we-do/initiatives' },
  brainwashing: { label: 'Brainwashing', to: '/things-we-do/brainwashing' },
};
const RECIPE_COLLECTIONS = {
  'look-book-vol-3': {
    label: 'LOOK BOOK VOL. 3 | OATLY',
    to: '/recipes/look-book-vol-3',
  },
  'look-book-autumn-winter-2025': {
    label: 'LOOK BOOK A/W 25 | OATLY',
    to: '/recipes/look-book-autumn-winter-2025',
  },
  'look-book-spring-summer-2025': {
    label: 'LOOK BOOK S/S 25 | OATLY',
    to: '/recipes/look-book-spring-summer-2025',
  },
};

function normalizePathname(pathname = '/') {
  const pathOnly = String(pathname).split(/[?#]/)[0] || '/';
  if (pathOnly.length > 1) return pathOnly.replace(/\/+$/, '');
  return pathOnly;
}

function storySectionFromType(type = '') {
  const value = type.trim().toLowerCase();
  if (value.startsWith('stor')) return THINGS_SECTIONS.stories;
  if (value.startsWith('initiat')) return THINGS_SECTIONS.initiatives;
  if (value.startsWith('brainwash')) return THINGS_SECTIONS.brainwashing;
  return null;
}

function sustainabilitySectionKey(path) {
  if (path.includes('sustainability-plan/climate-footprint')) return 'footprint';
  if (path.includes('sustainability-plan')) return 'plan';
  if (path.includes('climate-solutions')) return 'solutions';
  return 'who';
}

async function productBreadcrumbs(path) {
  if (path === '/products') return [{ label: 'Products' }];
  const categorySlug = decodeURIComponent(path.replace('/products/', ''));
  const category = await ProductModel.getCategoryBySlug(categorySlug);
  if (!category) return [{ label: 'Products' }];
  return [
    { label: 'Products', to: '/products' },
    { label: category.name || categorySlug },
  ];
}

async function recipeDetailBreadcrumbs(collectionSlug, recipeSlug) {
  const collection = RECIPE_COLLECTIONS[collectionSlug];
  if (!collection) return [];
  const recipe = await RecipeModel.getRecipeBySlug(recipeSlug);
  if (!recipe) {
    return [
      { label: 'Tastebuds', to: '/recipes/look-book-vol-3' },
      { label: 'Recipe not found' },
    ];
  }
  return [
    { label: 'Tastebuds', to: '/recipes/look-book-vol-3' },
    { label: collection.label, to: collection.to },
    { label: recipe.name || recipeSlug },
  ];
}

async function thingsDetailBreadcrumbs(section, slug) {
  const story = await NewsModel.getStoryBySlug(slug);
  const sectionCrumb = section || storySectionFromType(story?.type);
  const trail = [{ ...THINGS_WE_DO }];
  if (sectionCrumb) trail.push({ ...sectionCrumb });
  trail.push({ label: story?.title || 'Story not found' });
  return trail;
}

async function sustainabilitySubBreadcrumbs(path) {
  const section = await ContentModel.getSustainabilitySection(
    sustainabilitySectionKey(path),
  );
  return [
    { label: 'Sustainability', to: '/sustainability' },
    { label: section?.title || 'Sustainability' },
  ];
}

export async function getHeaderBreadcrumbs(pathname = '/') {
  const path = normalizePathname(pathname);
  if (path === '/') return [];

  switch (path) {
    case '/products':
      return [{ label: 'Products' }];
    case '/recipes':
    case '/recipes/look-book-vol-3':
      return [{ label: 'Tastebuds', to: '/recipes/look-book-vol-3' }, { label: 'LOOK BOOK VOL. 3 | OATLY' }];
    case '/recipes/look-book-autumn-winter-2025':
      return [{ label: 'Tastebuds', to: '/recipes/look-book-vol-3' }, { label: 'LOOK BOOK A/W 25 | OATLY' }];
    case '/recipes/look-book-spring-summer-2025':
      return [{ label: 'Tastebuds', to: '/recipes/look-book-vol-3' }, { label: 'LOOK BOOK S/S 25 | OATLY' }];
    case '/things-we-do':
    case '/news':
      return [{ ...THINGS_WE_DO }];
    case '/things-we-do/stories':
      return [{ ...THINGS_WE_DO }, { ...THINGS_SECTIONS.stories }];
    case '/things-we-do/initiatives':
      return [{ ...THINGS_WE_DO }, { ...THINGS_SECTIONS.initiatives }];
    case '/things-we-do/brainwashing':
      return [{ ...THINGS_WE_DO }, { ...THINGS_SECTIONS.brainwashing }];
    case '/things-we-do/initiatives/future-of-taste': {
      const page = await ContentModel.getFutureOfTaste();
      return [
        { ...THINGS_WE_DO },
        { ...THINGS_SECTIONS.initiatives },
        { label: page?.breadcrumb || 'A REPORT ON THE FUTURE OF TASTE' },
      ];
    }
    case '/sustainability':
      return [{ label: 'Sustainability' }];
    case '/health':
    case '/random-answers/17-facts-about-oatly-and-nutrition':
      return [{ label: 'Health' }];
    case '/contact':
      return [{ label: 'Contact' }];
    case '/legal':
      return [{ label: 'Legal' }];
    case '/legal/privacy-policy':
      return [
        { label: 'Legal', to: '/legal' },
        { label: 'Privacy Policy' },
      ];
    default:
      break;
  }

  if (path.startsWith('/products/')) return productBreadcrumbs(path);

  const recipeMatch = path.match(/^\/recipes\/([^/]+)\/([^/]+)$/);
  if (recipeMatch) {
    return recipeDetailBreadcrumbs(
      recipeMatch[1],
      decodeURIComponent(recipeMatch[2]),
    );
  }

  const thingsMatch = path.match(/^\/things-we-do\/(stories|initiatives)\/([^/]+)$/);
  if (thingsMatch) {
    return thingsDetailBreadcrumbs(
      THINGS_SECTIONS[thingsMatch[1]],
      decodeURIComponent(thingsMatch[2]),
    );
  }

  const storyMatch = path.match(/^\/things-we-do\/([^/]+)$/);
  if (storyMatch) {
    return thingsDetailBreadcrumbs(null, decodeURIComponent(storyMatch[1]));
  }

  if (
    path === '/oatly-who' ||
    path.startsWith('/oatly-who/') ||
    path.startsWith('/sustainability/')
  ) {
    return sustainabilitySubBreadcrumbs(path);
  }

  return [];
}

const NavigationModel = { getNavItems, getHeaderBreadcrumbs, NAV_ITEMS: undefined };

export default NavigationModel;
