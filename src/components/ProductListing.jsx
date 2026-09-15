import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
// ─── MVC: View (shared) ─────────────────────────────────────────────────────
// Breadcrumb + filter bar + product grid, reused by /products (ALL PRODUCTS)
// and every /products/:category page. Data comes from props (resolved via
// ProductModel in the page controllers) — this file owns no data fetching.
// All items carry official imagery from the API; a broken URL hides gracefully.
import ProcessBand from './ProcessBand.jsx';
import '../styles/ProductListing.css';

function ProductCard({ item, onSelect }) {
  const [imgOk, setImgOk] = useState(!!item.image);
  // Official product imagery from the API.
  const src = item.image;
  const name = <p className="plist-card__name">{item.name}</p>;
  const media = (
    <div className="plist-card__media">
      {imgOk ? (
        <img
          src={src}
          alt={item.name}
          className="plist-card__img"
          loading="lazy"
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
      <button
        type="button"
        className="plist-card"
        onClick={() => onSelect({ ...item, image: src })}
      >
        {media}
        {name}
      </button>
    </li>
  );
}

export default function ProductListing({ categories, activeSlug, items, onSelectProduct }) {
  const activeCategory = categories.find((c) => c.slug === activeSlug) || null;

  return (
    <>
      <div className="plist">
        <div className="plist__inner">
        {/* ── 1. BREADCRUMB: Home icon > PRODUCTS > CURRENT ── */}
        <nav aria-label="Breadcrumb">
          <ol className="plist-crumb__list">
            <li>
              <Link to="/" className="plist-crumb__link" aria-label="Home">
                <Home size={16} aria-hidden="true" />
              </Link>
            </li>
            <li aria-hidden="true" className="plist-crumb__sep">
              &gt;
            </li>
            <li>
              {activeCategory ? (
                <Link to="/products" className="plist-crumb__link">
                  Products
                </Link>
              ) : (
                <span className="plist-crumb__current" aria-current="page">
                  Products
                </span>
              )}
            </li>
            {activeCategory && (
              <>
                <li aria-hidden="true" className="plist-crumb__sep">
                  &gt;
                </li>
                <li>
                  <span className="plist-crumb__current" aria-current="page">
                    {activeCategory.name}
                  </span>
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* ── 2. FILTER BAR: ALL + every category, route-driven ── */}
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

        {/* ── 3. PRODUCT GRID ── */}
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

      {/* ── 4. PROCESS BAND: same UI under every product listing ── */}
      <ProcessBand />
    </>
  );
}
