import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// ─── MVC: View (shared) ─────────────────────────────────────────────────────
// Filter bar + product grid, reused by /products (ALL PRODUCTS)
// and every /products/:category page. Data comes from props (resolved via
// ProductModel in the page controllers) — this file owns no data fetching.
// All items carry official imagery from the API; a broken URL hides gracefully.
import ProcessBand from './ProcessBand.jsx';
import Product360 from './Product360.jsx';
import '../styles/ProductListing.css';

function ProductCard({ item, onSelect }) {
  const [imgOk, setImgOk] = useState(!!item.image);
  // Official product imagery from the API.
  const src = item.image;

  const name = <p className="plist-card__name">{item.name}</p>;
  const media = (
    <div className="plist-card__media">
      {imgOk ? (
        <Product360
          src={src}
          alt={item.name}
          onClick={() => onSelect && onSelect({ ...item, image: src })}
          onError={() => setImgOk(false)}
        />
      ) : null}
    </div>
  );

  // Quick-view modal when a handler is provided, static card otherwise.
  if (!onSelect) {
    return (
      <li>
        <div className="plist-card plist-card--static">
          {media}
          {name}
        </div>
      </li>
    );
  }
  return (
    <li>
      <div
        className="plist-card"
        onClick={() => onSelect({ ...item, image: src })}
      >
        {media}
        {name}
      </div>
    </li>
  );
}

export default function ProductListing({ categories, activeSlug, items, onSelectProduct }) {
  const activeCategory = categories.find((c) => c.slug === activeSlug) || null;

  return (
    <>
      <div className="plist">
        <div className="plist__inner">
        {/* ── 1. FILTER BAR: ALL + every category, route-driven ── */}
        <nav className="plist-filter" aria-label="Product categories">
          <ul className="plist-filter__list">
            <li>
              <Link
                to="/products"
                className={`plist-filter__link${!activeCategory ? ' plist-filter__link--active' : ''}`}
                aria-current={!activeCategory ? 'page' : undefined}
              >
                All Products
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/products/${cat.slug}`}
                  className={`plist-filter__link${cat.slug === activeSlug ? ' plist-filter__link--active' : ''}`}
                  aria-current={cat.slug === activeSlug ? 'page' : undefined}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── 2. PRODUCT GRID ── */}
        {items.length === 0 ? (
          <p className="plist-empty">No products in this category yet.</p>
        ) : (
          <ul className="plist-grid">
            {items.map((item) => (
              <ProductCard
                key={item.id || item.slug}
                item={item}
                onSelect={onSelectProduct}
              />
            ))}
          </ul>
        )}
        </div>
      </div>

      {/* ── 3. PROCESS BAND: same UI under every product listing ── */}
      <ProcessBand />
    </>
  );
}
