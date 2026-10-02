import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductListing from '../components/ProductListing';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// /products = the same ProductListing layout with ALL PRODUCTS active.
// Categories arrive from the Model (async Express API); items are flattened
// + tagged with the parent slug for placeholder resolution.
// Card click → dedicated detail page (/products/item/:id).

import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';

export default function ProductsPage() {
  const navigate = useNavigate();
  // MODEL (async API — page renders once categories arrive)
  const categories = useApiData(() => ProductModel.getProductCategories(), []);
  if (!categories) return null;

  // ALL PRODUCTS: every category item.
  const allItems = categories.flatMap((cat) => cat.items || []);

  const openDetail = (p) => {
    if (!p) return;
    navigate(`/products/item/${p.id ?? p.slug ?? p.name}`);
  };

  return (
    <>
      <SEO
        title="All Products"
        description="Every oat drink, oatgurt, ice cream, spread and more — the full Oatara range, plus Magnum ice cream and Godiva chocolates."
        pathname="/products"
      />
      <ProductListing
        categories={categories}
        activeSlug={null}
        items={allItems}
        onSelectProduct={openDetail}
      />
    </>
  );
}
