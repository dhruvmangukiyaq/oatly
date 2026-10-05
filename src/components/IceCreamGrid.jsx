import React, { useMemo, useState } from 'react';
import { Heart, Search } from 'lucide-react';
// ─── ICE CREAM GRID (View) ──────────────────────────────────────────────────
// Clean product-grid for /products/ice-cream: format tabs, search + sort and
// rounded cards showing name, category, flavor, pack size and price.
// Artwork is original local SVG (public/images/ice-cream/*) — no third-party
// hotlinks, so cards can never 404. Card actions (detail / cart / wishlist)
// reuse the same shop hooks as the standard listing, so brand behaviour is
// preserved.
import { useShop } from '../hooks/useShop.js';
import { enrichProduct, getSettings } from '../models/shopStore.js';
import { applyAdminVisibility, getProductOverrides } from '../models/adminStore.js';
import { matchesProduct } from '../utils/productSearch.js';
import '../styles/IceCreamGrid.css';

const FORMAT_ORDER = ['Tubs', 'Bars', 'Cones', 'Cups', 'Kulfi', 'Sandwich', 'Sundae'];

// Brand accents from product data are tuned for light cards — dark browns
// vanish on the dark card, so lift them toward a readable tint (hue kept).
function readableAccent(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (lum >= 0.55) return hex;
  const t = (v) => Math.round(v + (255 - v) * 0.62);
  return `rgb(${t(r)}, ${t(g)}, ${t(b)})`;
}

function formatFallbackImage() {
  return (
    <svg viewBox="0 0 640 640" className="ice-card__img" aria-hidden="true" focusable="false">
      <ellipse cx="320" cy="500" rx="150" ry="26" fill="#111111" opacity="0.08" />
      <rect x="205" y="230" width="230" height="240" rx="36" fill="#FFFFFF" stroke="#C6C6C6" strokeWidth="6" />
      <circle cx="275" cy="200" r="34" fill="#FCEB50" />
      <circle cx="320" cy="182" r="40" fill="#FF5C8D" />
      <circle cx="365" cy="200" r="34" fill="#8CD7A9" />
    </svg>
  );
}

function IceCreamCard({ item, onSelect, onAdded }) {
  const [imgOk, setImgOk] = useState(true);
  const { add, wishlist, toggleWish } = useShop();
  const key = String(item.id ?? item.slug ?? item.name);
  const wished = wishlist.includes(key);
  const settings = getSettings();
  const cur = settings.currency || '$';
  const price = Number(item.price) || 0;
  const mrp = Number(item.mrp) || 0;
  const off = mrp > price && mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const stock = Number(item.stock ?? 1);
  const out = stock <= 0;
  const low = !out && stock <= 5;
  const flavor = item.flavor || '';
  const packSize = item.packSize || item.volume || '';
  const format = item.format || '';
  const alt = `${item.name}${flavor ? ` — ${flavor} flavour` : ''}${packSize ? `, ${packSize}` : ''} product photo`;
  const detailLabel = `View details for ${item.name}${flavor ? `, ${flavor}` : ''}${packSize ? `, ${packSize}` : ''}`;

  const showImg = imgOk && item.image;

  return (
    <li className="ice-grid__item">
      <article className="ice-card" style={item.accent ? { '--ice-accent': readableAccent(item.accent) } : undefined}>
        <button
          type="button"
          className="ice-card__main"
          onClick={() => onSelect && onSelect(item)}
          aria-label={detailLabel}
        >
          <span className="ice-card__media">
            {showImg ? (
              <img
                src={item.image}
                alt={alt}
                className="ice-card__img"
                loading="lazy"
                decoding="async"
                width="640"
                height="640"
                draggable={false}
                onError={() => setImgOk(false)}
              />
            ) : (
              formatFallbackImage()
            )}
            {off > 0 && (
              <span className="ice-card__badge">{off}% off</span>
            )}
          </span>
          <span className="ice-card__body">
            <span className="ice-card__kicker">
              {item.brand ? `${item.brand} · ` : ''}Ice Cream{format ? ` · ${format}` : ''}
            </span>
            <span className="ice-card__name">{item.name}</span>
            {(flavor || packSize) && (
              <span className="ice-card__meta">
                {flavor && <span className="ice-card__flavor">{flavor}</span>}
                {flavor && packSize && <span aria-hidden="true"> · </span>}
                {packSize && <span>{packSize}</span>}
              </span>
            )}
            <span className="ice-card__price">
              <span className="ice-card__amount">{cur}{price.toFixed(2)}</span>
              {mrp > price && <s className="ice-card__mrp">{cur}{mrp.toFixed(2)}</s>}
            </span>
            <span className="ice-card__sub">
              {out ? 'Out of stock' : low ? `Only ${stock} left` : `★ ${Number(item.rating || 4.5).toFixed(1)} (${item.reviewsCount || 0})`}
            </span>
          </span>
        </button>
        <span className="ice-card__actions">
          <button
            type="button"
            className="ice-card__add"
            disabled={out}
            onClick={() => { add(key, 1); if (onAdded) onAdded(); }}
            aria-label={out ? `${item.name} is sold out` : `Add ${item.name} to cart`}
          >
            {out ? 'Sold out' : 'Add to cart +'}
          </button>
          <button
            type="button"
            aria-label={wished ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`}
            aria-pressed={wished}
            className={`ice-card__wish${wished ? ' is-active' : ''}`}
            onClick={() => toggleWish(key)}
          >
            <Heart size={15} fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
        </span>
      </article>
    </li>
  );
}

export default function IceCreamGrid({ items, onSelect, onAdded }) {
  const [tab, setTab] = useState('All');
  const [q, setQ] = useState('');
  // Admin-deleted products do NOT show in the grid (bug fix); custom ones only
  // within the Ice Cream scope. No memo — the list is rebuilt and the admin state
  // must be fresh on every render (delete → immediate effect in the listing).
  const enriched = applyAdminVisibility(items, { category: 'Ice Cream' })
    .map((p) => enrichProduct(p, getProductOverrides()))
    .filter((p) => p.status !== 'archived');

  const formats = useMemo(() => {
    const seen = new Map();
    enriched.forEach((p) => {
      if (!p.format) return;
      seen.set(p.format, (seen.get(p.format) || 0) + 1);
    });
    return FORMAT_ORDER.filter((f) => seen.has(f)).map((f) => ({ name: f, n: seen.get(f) }));
  }, [enriched]);

  const visible = useMemo(() => {
    const list = enriched.filter((p) => {
      if (tab !== 'All' && p.format !== tab) return false;
      return matchesProduct(p, q);
    });
    return list;
  }, [enriched, tab, q]);

  const tabs = [{ name: 'All', n: enriched.length }, ...formats];

  return (
    <section className="ice">
      <div className="ice__inner">
        <div className="ice-tabs" role="group" aria-label="Filter ice cream by format">
          {tabs.map((t) => (
            <button
              key={t.name}
              type="button"
              className={`ice-tabs__btn${tab === t.name ? ' ice-tabs__btn--active' : ''}`}
              aria-pressed={tab === t.name}
              onClick={() => setTab(t.name)}
            >
              {t.name}
              <span className="ice-tabs__count" aria-hidden="true">{t.n}</span>
            </button>
          ))}
        </div>

        <div className="ice-tools">
          <label className="ice-tools__search">
            <Search size={15} aria-hidden="true" />
            <span className="ice-tools__sr">Search ice cream</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search flavour, e.g. vanilla…"
              aria-label="Search ice cream"
              type="search"
            />
          </label>
        </div>

        <p className="ice-count" aria-live="polite">
          Showing {visible.length} of {enriched.length} treats{tab !== 'All' ? ` in ${tab}` : ''}
        </p>

        {visible.length === 0 ? (
          <div className="ice-empty">
            <p>No treats match “{q}”{tab !== 'All' ? ` in ${tab}` : ''}.</p>
            <button
              type="button"
              className="ice-empty__clear"
              onClick={() => { setQ(''); setTab('All'); }}
            >
              Clear search & filters
            </button>
          </div>
        ) : (
          <ul className="ice-grid">
            {visible.map((item) => (
              <IceCreamCard
                key={String(item.id ?? item.slug ?? item.name)}
                item={item}
                onSelect={onSelect}
                onAdded={onAdded}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
