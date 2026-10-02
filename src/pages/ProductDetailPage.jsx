import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Truck, RotateCcw, ShieldCheck, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { useCatalog, findProduct } from '../hooks/useCatalog.js';
import { useShop } from '../hooks/useShop.js';
import { useAuth, getSession, isAdmin } from '../hooks/useAuth.js';
import { getCoupons, getReviews, addReview, getSettings } from '../models/shopStore.js';
import '../styles/ProductListing.css';
import '../styles/ProductDetail.css';

/* ==========================================================================
   PRODUCT DETAIL PAGE — Amazon/Flipkart jevu full product page, apdi theme ma.
   Gallery (thumbnails + hover zoom) | buy box (qty, cart, buy now, wishlist) |
   offers | delivery info | highlights | specs | reviews | related products.
   Card/modal click → ahiya avay chhe (quick-view modal ni jagyae).
   ========================================================================== */

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, categories } = useCatalog();
  const { add, wishlist, toggleWish } = useShop();
  const { user } = useAuth();
  const adminView = isAdmin(user);
  const navigate = useNavigate();

  const product = useMemo(() => findProduct(products, id), [products, id]);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(null);
  const [qty, setQty] = useState(1);
  const [brokenFor, setBrokenFor] = useState(null);
  // Broken-image flag is keyed by product id, so navigating between products
  // never leaves a stale broken state behind (no effect needed).

  const related = useMemo(() => {
    if (!product) return [];
    const others = (products || [])
      .filter((p) => String(p.id ?? p.slug ?? p.name) !== String(product.id ?? product.slug ?? product.name));
    const sameBrand = others.filter((p) => (p.brand || '') && p.brand === product.brand);
    const sameCat = others.filter((p) => p.brand !== product.brand && (p.category || '') === (product.category || ''));
    const rest = others.filter((p) => p.brand !== product.brand && (p.category || '') !== (product.category || ''));
    return [...sameBrand, ...sameCat, ...rest].slice(0, 8);
  }, [products, product]);

  if (!products || products.length === 0) return null;

  if (!product) {
    return (
      <div className="shop-page">
        <div className="shop-shell">
          <p className="shop-kicker">Oatara shop</p>
          <h1>Product not found.</h1>
          <p className="shop-sub">Aa product madyu nahi — delete thai gayu hase.</p>
          <Link to="/products" className="shop-btn shop-btn--small">All products</Link>
        </div>
      </div>
    );
  }

  const pid = String(product.id ?? product.slug ?? product.name);
  const gallery = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.hoverImage].filter(Boolean);
  const activeSrc = gallery[Math.min(activeImg, gallery.length - 1)];
  const imgBroken = brokenFor === pid;
  const settings = getSettings();
  const cur = settings.currency || '$';
  const off = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const out = Number(product.stock ?? 1) <= 0;
  const wished = wishlist.includes(pid);
  const catSlug = (categories || []).find((c) => c.name === product.category)?.slug;
  const coupons = getCoupons().filter((c) => c.active);

  const onZoomMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)),
    });
  };

  const buyNow = () => {
    if (out) return;
    add(pid, qty);
    navigate('/checkout');
  };

  return (
    <div className="pdetail">
      <SEO
        title={product.name}
        description={product.tagline || product.description || product.name}
        pathname={`/products/item/${pid}`}
      />
      <div className="pdetail__inner">
        {/* Breadcrumb — listing jevu */}
        <nav className="pdetail-crumb" aria-label="Breadcrumb">
          <Link to="/" className="pdetail-crumb__link">Home</Link>
          <span aria-hidden="true"> › </span>
          <Link to="/products" className="pdetail-crumb__link">Products</Link>
          {catSlug && (
            <>
              <span aria-hidden="true"> › </span>
              <Link to={`/products/${catSlug}`} className="pdetail-crumb__link">{product.category}</Link>
            </>
          )}
          <span aria-hidden="true"> › </span>
          <span className="pdetail-crumb__current" aria-current="page">{product.name}</span>
        </nav>

        <div className="pdetail__top">
          {/* Gallery */}
          <div className="pdetail-gallery">
            {gallery.length > 1 && (
              <div className="pdetail-thumbs">
                {gallery.map((src, i) => (
                  <button
                    key={i} type="button" aria-label={`View image ${i + 1}`}
                    onClick={() => { setActiveImg(i); setZoom(null); setBrokenFor(null); }}
                    className={`pdetail-thumb${i === activeImg ? ' is-active' : ''}`}
                  >
                    <img src={src} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
                  </button>
                ))}
              </div>
            )}
            <div
              className="pdetail-mainimg"
              onMouseMove={onZoomMove}
              onMouseLeave={() => setZoom(null)}
            >
              {product.badge && <span className="badge-sticker pdetail-badge">{product.badge}</span>}
              {activeSrc && !imgBroken ? (
                <img
                  src={activeSrc}
                  alt={product.name}
                  onError={() => setBrokenFor(pid)}
                  style={zoom ? { transform: 'scale(2)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                />
              ) : (
                <span className="pdetail-imgfallback" role="img" aria-label={`${product.name} product image unavailable`}>
                  {product.name}
                </span>
              )}
            </div>
          </div>

          {/* Buy box */}
          <div className="pdetail-info">
            <p className="pdetail-kicker">
              {product.brand ? `${product.brand} · ` : ''}{product.category}
            </p>
            <h1>{product.name}</h1>
            {(product.flavor || product.packSize || product.format) && (
              <p className="pdetail-tax">
                {[product.flavor, product.format, product.packSize || product.volume].filter(Boolean).join(' · ')}
              </p>
            )}
            {product.brand && (
              <p className="pdetail-tax">Sold by: <strong>{product.brand}</strong>{product.volume ? ` · ${product.volume}` : ''}</p>
            )}
            <p className="plist-card__rating">
              ★ {Number(product.rating || 4.5).toFixed(1)} · {product.reviewsCount || 0} ratings
              {' · '}<a href="#pdetail-reviews" className="pdetail-link">See reviews</a>
            </p>
            <div className="plist-card__price pdetail-price">
              <span>{cur}{Number(product.price).toFixed(2)}</span>
              {product.mrp > product.price && <s>{cur}{Number(product.mrp).toFixed(2)}</s>}
              {off > 0 && <span className="plist-card__off">{off}% off</span>}
            </div>
            <p className="pdetail-tax">Inclusive of all taxes</p>
            {out ? (
              <p className="plist-card__stock plist-card__stock--out">Out of stock</p>
            ) : Number(product.stock) <= 5 ? (
              <p className="plist-card__stock plist-card__stock--low">Only {product.stock} left in stock!</p>
            ) : (
              <p className="pdetail-instock">In stock</p>
            )}

            {!adminView ? (
              <>
                <div className="pdetail-buyrow">
                  <span className="qty">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty((v) => Math.max(1, v - 1))}>−</button>
                    <span>{qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty((v) => Math.min(v + 1, Number(product.stock) || 99))}>+</button>
                  </span>
                  <button
                    type="button" disabled={out}
                    onClick={() => add(pid, qty)}
                    className="shop-btn shop-btn--small"
                  >
                    <ShoppingCart size={14} aria-hidden="true" /> {out ? 'Sold out' : 'Add to cart'}
                  </button>
                  <button
                    type="button" aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={wished}
                    onClick={() => toggleWish(pid)}
                    className={`plist-card__wish${wished ? ' is-active' : ''}`}
                  >
                    <Heart size={15} fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
                  </button>
                </div>
                <button
                  type="button" disabled={out}
                  onClick={buyNow}
                  className="shop-btn shop-btn--big"
                >
                  Buy now →
                </button>
              </>
            ) : (
              <p className="pdetail-tax">Admin view — buying disabled.</p>
            )}

            {/* Delivery promises */}
            <ul className="pdetail-delivery">
              <li><Truck size={15} aria-hidden="true" /> Free shipping over {cur}{Number(settings.freeShipThreshold ?? 50).toFixed(2)}</li>
              <li><ShieldCheck size={15} aria-hidden="true" /> Cash on Delivery available</li>
              <li><RotateCcw size={15} aria-hidden="true" /> {Number(settings.returnWindowDays ?? 30)}-day easy returns</li>
            </ul>

            {/* Offers */}
            {coupons.length > 0 && (
              <div className="pdetail-offers">
                <h2><Tag size={14} aria-hidden="true" /> Available offers</h2>
                <ul>
                  {coupons.slice(0, 4).map((c) => (
                    <li key={c.code}>
                      <strong>{c.code}</strong> — {c.type === 'percent' ? `${c.value}% off` : c.type === 'flat' ? `${cur}${c.value} off` : 'Free shipping'}
                      {Number(c.minOrder) > 0 && <small> on orders over {cur}{Number(c.minOrder).toFixed(2)}</small>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="pdetail-sections">
          {(product.highlights?.length > 0 || product.ingredients?.length > 0) && (
            <section className="pdetail-sec">
              <h2>{product.ingredients ? 'Ingredients' : 'About this item'}</h2>
              <ul className="pdetail-points">
                {(product.ingredients || product.highlights).map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </section>
          )}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <section className="pdetail-sec">
              <h2>Specifications</h2>
              <table className="pdetail-specs">
                <tbody>
                  {Object.entries(product.specs).map(([k, v]) => (
                    <tr key={k}><th>{k}</th><td>{String(v)}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
          {product.description && (
            <section className="pdetail-sec">
              <h2>Description</h2>
              <p>{product.description}</p>
              {product.tagline && <p className="pdetail-tagline">{product.tagline}</p>}
            </section>
          )}
          {product.nutrition && (
            <section className="pdetail-sec">
              <h2>Nutrition facts</h2>
              <table className="pdetail-specs">
                <tbody>
                  {Object.entries(product.nutrition).map(([k, v]) => (
                    <tr key={k}><th style={{ textTransform: 'capitalize' }}>{k}</th><td>{String(v)}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
          {product.volume && (
            <section className="pdetail-sec">
              <h2>Package</h2>
              <p>Net volume: {product.volume}{product.climateFootprint ? ` · Climate footprint: ${product.climateFootprint}` : ''}</p>
            </section>
          )}
          <ReviewsBlock productId={pid} />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pdetail-sec">
            <h2>Related products</h2>
            <ul className="pdetail-related">
              {related.map((r) => {
                const rid = String(r.id ?? r.slug ?? r.name);
                return (
                  <li key={rid}>
                    <Link to={`/products/item/${rid}`} className="plist-card">
                      {r.image && <div className="plist-card__media"><img src={r.image} alt={r.name} className="plist-card__img" loading="lazy" /></div>}
                      {r.brand && <p className="plist-card__brand">{r.brand}</p>}
                      <p className="plist-card__name">{r.name}</p>
                      <p className="plist-card__price"><span>{cur}{Number(r.price).toFixed(2)}</span></p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function ReviewsBlock({ productId }) {
  const session = getSession();
  const [list, setList] = useState(() => getReviews(productId));
  const [name, setName] = useState(session?.name || '');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');

  const avg = list.length ? list.reduce((s, r) => s + Number(r.rating || 0), 0) / list.length : 0;

  const submit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) { setMsg('Name lakho.'); return; }
    if (text.trim().length < 3) { setMsg('Review lakho.'); return; }
    addReview({ productId, author: name.trim(), rating, text: text.trim() });
    setText('');
    setMsg('Review saved. Thanks!');
    setList(getReviews(productId));
  };

  return (
    <section className="pdetail-sec" id="pdetail-reviews">
      <h2>Customer reviews {list.length > 0 && <small>★ {avg.toFixed(1)} · {list.length} review(s)</small>}</h2>
      {list.length === 0 ? (
        <p className="shop-sub">Haju koi review nathi — pahela tame lakho!</p>
      ) : (
        <ul className="pdetail-reviews">
          {list.slice(0, 10).map((r) => (
            <li key={r.id}>
              <strong>{'★'.repeat(Number(r.rating) || 0)}</strong> · <strong>{r.author}</strong>{' '}
              <small>{new Date(r.date).toLocaleDateString()}</small>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      )}
      <form className="shop-form pdetail-reviewform" onSubmit={submit}>
        <h3>Write a review</h3>
        <label>Name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tamaru naam" /></label>
        <label>Rating
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>)}
          </select>
        </label>
        <label>Review<input value={text} onChange={(e) => setText(e.target.value)} placeholder="Product kevu lagyu?" /></label>
        {msg && <p className="shop-sub">{msg}</p>}
        <button type="submit" className="shop-btn shop-btn--small">Submit review</button>
      </form>
    </section>
  );
}
