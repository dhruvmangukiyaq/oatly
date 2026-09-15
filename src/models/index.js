// ─── MODELS BARREL (MVC) ────────────────────────────────────────────────────
// Single entry point for the async Model layer (all data via Express API).
// Controllers import from here — Views receive data via props/hooks.

export { default as ProductModel } from './productModel.js';
export * from './productModel.js';

export { default as RecipeModel } from './recipeModel.js';
export * from './recipeModel.js';

export { default as NewsModel } from './newsModel.js';
export * from './newsModel.js';

export { default as ContentModel } from './contentModel.js';
export * from './contentModel.js';

export { default as NavigationModel } from './navigationModel.js';
export * from './navigationModel.js';

export { default as SearchModel } from './searchModel.js';
export * from './searchModel.js';
