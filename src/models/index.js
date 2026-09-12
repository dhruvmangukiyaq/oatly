// ─── MODELS BARREL (MVC) ────────────────────────────────────────────────────
// Single entry point for the Model layer. Controllers import from here —
// Views must NOT import from here directly (they receive data via props).

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

// Homepage deck (existing model, kept as canonical homepage model)
export * from './homepage.js';
