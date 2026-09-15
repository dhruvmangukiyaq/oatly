// ─── API BARREL ─────────────────────────────────────────────────────────────
// Single entry point for backend access. Views/Controllers import from here —
// never call fetch() directly in components or pages.

export * from './client.js';
export * from './navigation.js';
export * from './products.js';
export * from './recipes.js';
export * from './news.js';
export * from './content.js';
export * from './search.js';
