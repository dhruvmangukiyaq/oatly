import React, { useMemo } from 'react';
import SEO from '../components/SEO';
import ProductListing from '../components/ProductListing';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// /products = the same ProductListing layout with ALL PRODUCTS active.
// Item assembly (flatten + tag with parent slug) is view-composition;
// category/product truth lives in ProductModel (siteData).

import ProductModel from '../../models/productModel.js';

export default function ProductsPage({ onSelectProduct }) {
  const categories = useMemo(() => ProductModel.getProductCategories(), []);

  // ALL PRODUCTS: every category item, tagged so placeholders resolve.
  const allItems = useMemo(
    () =>
      categories.flatMap((cat) =>
        (cat.items || []).map((item) => ({ ...item, _categorySlug: cat.slug }))
      ),
    [categories]
  );

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
