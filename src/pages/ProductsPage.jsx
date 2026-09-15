import React from 'react';
import SEO from '../components/SEO';
import ProductListing from '../components/ProductListing';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// /products = the same ProductListing layout with ALL PRODUCTS active.
// Categories arrive from the Model (async Express API); items are flattened
// + tagged with the parent slug for placeholder resolution.

import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';

export default function ProductsPage({ onSelectProduct }) {
  // MODEL (async API — page renders once categories arrive)
  const categories = useApiData(() => ProductModel.getProductCategories(), []);
  if (!categories) return null;

  // ALL PRODUCTS: every category item.
  const allItems = categories.flatMap((cat) => cat.items || []);

  return (
    <>
      <SEO
        title="All Products"
        description="Every oat drink, oatgurt, ice cream, spread and more — the full Oatly product range."
        pathname="/products"
      />
      <ProductListing
        categories={categories}
        activeSlug={null}
        items={allItems}
        onSelectProduct={onSelectProduct}
      />
    </>
  );
}
