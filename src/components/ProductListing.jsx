import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpDown } from 'lucide-react';
// ─── MVC: View (shared) ─────────────────────────────────────────────────────
// Filter bar + product grid, reused by /products (ALL PRODUCTS)
// and every /products/:category page. Shop-ready: price, rating, stock,
// add-to-cart, wishlist, sort + search (standard marketplace features).
import ProcessBand from './ProcessBand.jsx';
import Product360 from './Product360.jsx';
import { useShop } from '../hooks/useShop.js';
import { enrichProduct, getSettings } from '../models/shopStore.js';
import { getProductOverrides } from '../models/adminStore.js';
import '../styles/ProductListing.css';
import '../styles/Shop.css';

const SORTS = [
  { id: 'pop', label: 'Popularity' },
  { id: 'low', label: 'Price: Low → High' },
  { id: 'high', label: 'Price: High → Low' },
  { id: 'rate', label: 'Rating' },
  { id: 'off', label: 'Discount' },
];

function ProductCard({ item, onSelect, onAdded }) {
  const [imgOk, setImgOk] = useState(!!item.image);
  const { add, wishlist, toggleWish } = useShop();
  const src = item.image;
  const key = String(item.id ?? item.slug ?? item.name);
  const wished = wishlist.includes(key);
  const s = getSettings();
  const off = item.mrp > item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;
  const out = Number(item.stock ?? 1) <= 0;
  const low = !out && Number(item.stock) <= 5;

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

  return (
    <li>
      <div className="plist-card" onClick={() => onSelect && onSelect({ ...item, image: src })}>
        {media}
        <p className="plist-card__name">{item.name}</p>
        {/* Price row — same plain small type as the name (spec minimal) */}
        <p className="plist-card__price" onClick={(e) => e.stopPropagation()}>
          <span>{s.currency}{Number(item.price).toFixed(2)}</span>
          {item.mrp > item.price && <s>{s.currency}{Number(item.mrp).toFixed(2)}</s>}
          {off > 0 && <span className="plist-card__off">{off}% off</span>}
        </p>
        <p className="plist-card__rating">★ {Number(item.rating || 4.5).toFixed(1)} ({item.reviewsCount || 0})</p>
        {out ? (
          <p className="plist-card__stock plist-card__stock--out">Out of stock</p>
        ) : low ? (
          <p className="plist-card__stock plist-card__stock--low">Only {item.stock} left</p>
        ) : null}
        {/* Quiet text actions — underline on hover, like the rest of the site */}
        <div className="plist-card__buy" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="plist-card__add"
            disabled={out}
            onClick={() => { add(key, 1); if (onAdded) onAdded(); }}
          >
            {out ? 'Sold out' : 'Add to cart +'}
          </button>
          <button
            type="button"
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wished}
            className={`plist-card__wish${wished ? ' is-active' : ''}`}
            onClick={() => toggleWish(key)}
          >
            <Heart size={14} fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default function ProductListing({ categories, activeSlug, items, onSelectProduct, onAdded }) {
  const activeCategory = categories.find((c) => c.slug === activeSlug) || null;
  const [sort, setSort] = useState('pop');
  const [q, setQ] = useState('');
  const overrides = getProductOverrides();

  const enriched = useMemo(
    () => (items || []).map((p) => enrichProduct(p, overrides)),
    [items, overrides],
  );

  const visible = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = enriched.filter((p) =>
      !query || [p.name, p.category, p.tagline].filter(Boolean).join(' ').toLowerCase().includes(query),
    );
    switch (sort) {
      case 'low': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'high': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rate': list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'off':
        list = [...list].sort((a, b) => {
          const ao = a.mrp > a.price ? (a.mrp - a.price) / a.mrp : 0;
          const bo = b.mrp > b.price ? (b.mrp - b.price) / b.mrp : 0;
          return bo - ao;
        });
        break;
      default: break;
    }
    return list.filter((p) => p.status !== 'archived');
  }, [enriched, sort, q]);

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

          {/* ── Shop toolbar: search + sort (same quiet row style as filter) ── */}
          <div className="plist-tools">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="plist-tools__search"
            />
            <label className="plist-tools__sort">
              <ArrowUpDown size={14} aria-hidden="true" /> Sort
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>

          {/* ── 2. PRODUCT GRID ── */}
          {visible.length === 0 ? (
            <p className="plist-empty">No products found. Try another search.</p>
          ) : (
            <ul className="plist-grid">
              {visible.map((item) => (
                <ProductCard
                  key={item.id || item.slug}
                  item={item}
                  onSelect={onSelectProduct}
                  onAdded={onAdded}
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
