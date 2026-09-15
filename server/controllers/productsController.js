// ─── BACKEND CONTROLLER ─────────────────────────────────────────────────────
// Products: HTTP layer (req/res) over productModel. No business logic here.

import * as Products from '../models/productModel.js';

export function listCategories(req, res) {
  res.json(Products.getProductCategories());
}

export function getCategory(req, res) {
  const category = Products.getCategoryBySlug(req.params.slug);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json({ category, products: Products.getProductsByCategorySlug(req.params.slug) });
}

export function listProducts(req, res) {
  const { category = 'All', q = '' } = req.query;
  res.json(Products.filterProducts({ category, query: q }));
}

export function getCategoryNames(req, res) {
  res.json(Products.getProductCategoryNames());
}

export function getProduct(req, res) {
  const product = Products.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
}
