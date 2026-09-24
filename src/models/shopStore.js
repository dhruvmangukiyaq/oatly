// ─── SHOP STORE (proper e-commerce, frontend demo) ───────────────────────────
// Cart, wishlist, coupons, settings, reviews + enriched product catalog.
// Badhu localStorage ma persist thay chhe. Backend aavse tyare aa j
// function names API calls ma feravvana raheshe.
//
// Keys:
//   oatly-cart        → { [productId]: qty }
//   oatly-wishlist    → [productId]
//   oatly-coupons     → [{ code, type, value, minOrder, expiry, active, used }]
//   oatly-settings    → { storeName, currency, shippingFee, freeShipThreshold, taxRate, announcement }
//   oatly-reviews     → [{ id, productId, author, rating, text, date, approved }]
//   oatly-admin-products (adminStore) → price/stock overrides + custom products
//   oatly-orders      → full e-commerce orders (niche schema juo)

const CART_KEY = 'oatly-cart';
const WISH_KEY = 'oatly-wishlist';
const COUPON_KEY = 'oatly-coupons';
const SETTINGS_KEY = 'oatly-settings';
const REVIEWS_KEY = 'oatly-reviews';

export const EVENT_SHOP = 'oatly-shop';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function notifyShop() {
  window.dispatchEvent(new Event(EVENT_SHOP));
}

// ── Default catalog pricing (backend ma price nathi etle deterministic) ──
function defaultPrice(p) {
  const id = String(p.id ?? p.name ?? 'x');
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 1000;
  const base = 3.49 + ((h % 40) / 10); // 3.49 … 7.39
  return Math.round(base * 100) / 100;
}

export function enrichProduct(p, overrides = {}) {
  const key = String(p.id ?? p.slug ?? p.name);
  const ov = overrides[key] || {};
  const price = ov.price != null ? Number(ov.price) : defaultPrice(p);
  const mrp = ov.mrp != null ? Number(ov.mrp) : Math.round(price * 1.2 * 100) / 100;
  return {
    rating: 4 + ((String(key).length % 10) / 10), // 4.0–4.9 deterministic
    reviewsCount: 20 + (String(key).length * 13) % 300,
    stock: 25,
    status: 'active',
    featured: false,
    ...p,
    ...ov,
    price,
    mrp,
  };
}

// ── Cart ──
export function getCart() {
  return read(CART_KEY, {});
}

export function setQty(id, qty) {
  const cart = getCart();
  const q = Math.max(0, Math.floor(Number(qty) || 0));
  if (q <= 0) delete cart[String(id)];
  else cart[String(id)] = q;
  write(CART_KEY, cart);
  notifyShop();
  return cart;
}

export function addToCart(id, qty = 1) {
  const cart = getCart();
  cart[String(id)] = (cart[String(id)] || 0) + qty;
  write(CART_KEY, cart);
  notifyShop();
  return cart;
}

export function removeFromCart(id) {
  return setQty(id, 0);
}

export function clearCart() {
  write(CART_KEY, {});
  notifyShop();
}

export function cartCount() {
  return Object.values(getCart()).reduce((s, q) => s + (Number(q) || 0), 0);
}

// ── Wishlist ──
export function getWishlist() {
  return read(WISH_KEY, []);
}

export function toggleWishlist(id) {
  const key = String(id);
  const list = getWishlist();
  const next = list.includes(key) ? list.filter((x) => x !== key) : [...list, key];
  write(WISH_KEY, next);
  notifyShop();
  return next;
}

export function isWishlisted(id) {
  return getWishlist().includes(String(id));
}

// ── Settings ──
export function getSettings() {
  return {
    storeName: 'Oatly Shop',
    currency: '$',
    shippingFee: 4.99,
    freeShipThreshold: 50,
    taxRate: 0.08,
    announcement: 'Free shipping over $50 · OAT10 = 10% off',
    ...read(SETTINGS_KEY, {}),
  };
}

export function saveSettings(patch) {
  const next = { ...getSettings(), ...patch };
  write(SETTINGS_KEY, next);
  notifyShop();
  return next;
}

// ── Coupons ──
const DEFAULT_COUPONS = [
  { code: 'OAT10', type: 'percent', value: 10, minOrder: 0, expiry: '', active: true, used: 0 },
  { code: 'WELCOME15', type: 'percent', value: 15, minOrder: 30, expiry: '', active: true, used: 0 },
  { code: 'FREESHIP', type: 'freeship', value: 0, minOrder: 20, expiry: '', active: true, used: 0 },
];

export function getCoupons() {
  const saved = read(COUPON_KEY, null);
  if (!saved) {
    write(COUPON_KEY, DEFAULT_COUPONS);
    return DEFAULT_COUPONS;
  }
  return saved;
}

export function saveCoupon(coupon) {
  const list = getCoupons();
  const code = String(coupon.code || '').trim().toUpperCase();
  if (!code) return list;
  const idx = list.findIndex((c) => c.code === code);
  const entry = { type: 'percent', value: 10, minOrder: 0, expiry: '', active: true, used: 0, ...coupon, code };
  const next = idx >= 0 ? list.map((c, i) => (i === idx ? entry : c)) : [...list, entry];
  write(COUPON_KEY, next);
  notifyShop();
  return next;
}

export function deleteCoupon(code) {
  const next = getCoupons().filter((c) => c.code !== code);
  write(COUPON_KEY, next);
  notifyShop();
  return next;
}

export function validateCoupon(code, subtotal) {
  const c = getCoupons().find((x) => x.code === String(code || '').trim().toUpperCase());
  if (!c) return { ok: false, error: 'Invalid coupon code.' };
  if (!c.active) return { ok: false, error: 'This coupon is inactive.' };
  if (c.expiry && new Date(c.expiry) < new Date()) return { ok: false, error: 'This coupon expired.' };
  if (Number(subtotal) < Number(c.minOrder || 0)) {
    return { ok: false, error: `Minimum order $${Number(c.minOrder).toFixed(2)} required.` };
  }
  return { ok: true, coupon: c };
}

export function markCouponUsed(code) {
  const next = getCoupons().map((c) => (c.code === code ? { ...c, used: (c.used || 0) + 1 } : c));
  write(COUPON_KEY, next);
  return next;
}

// ── Totals ──
export function calcTotals(lines, { couponCode = '', settings = null } = {}) {
  const s = settings || getSettings();
  const subtotal = lines.reduce((sum, l) => sum + Number(l.price || 0) * Number(l.qty || 0), 0);
  let discount = 0;
  let freeShip = false;
  let coupon = null;
  if (couponCode) {
    const v = validateCoupon(couponCode, subtotal);
    if (v.ok) {
      coupon = v.coupon;
      if (coupon.type === 'percent') discount = (subtotal * Number(coupon.value)) / 100;
      else if (coupon.type === 'flat') discount = Math.min(Number(coupon.value), subtotal);
      else if (coupon.type === 'freeship') freeShip = true;
    }
  }
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = afterDiscount === 0 || freeShip || afterDiscount >= Number(s.freeShipThreshold) ? 0 : Number(s.shippingFee);
  const tax = afterDiscount * Number(s.taxRate);
  const total = afterDiscount + shipping + tax;
  return { subtotal, discount, shipping, tax, total, coupon, freeShip };
}

// ── Reviews ──
export function getReviews(productId = null) {
  const all = read(REVIEWS_KEY, []);
  return productId ? all.filter((r) => String(r.productId) === String(productId)) : all;
}

export function addReview({ productId, author, rating, text }) {
  const all = read(REVIEWS_KEY, []);
  const entry = {
    id: `rev-${Date.now()}`,
    productId: String(productId),
    author: String(author || 'Guest'),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    text: String(text || '').slice(0, 500),
    date: new Date().toISOString(),
    approved: true,
  };
  write(REVIEWS_KEY, [entry, ...all]);
  notifyShop();
  return entry;
}

export function deleteReview(id) {
  const next = read(REVIEWS_KEY, []).filter((r) => r.id !== id);
  write(REVIEWS_KEY, next);
  notifyShop();
  return next;
}

export function setReviewApproved(id, approved) {
  const next = read(REVIEWS_KEY, []).map((r) => (r.id === id ? { ...r, approved } : r));
  write(REVIEWS_KEY, next);
  notifyShop();
  return next;
}

// ── Categories (admin-managed, backend + local merge) ──
const CATS_KEY = 'oatly-admin-categories';

export function getCustomCategories() {
  return read(CATS_KEY, []);
}

export function saveCategory(cat) {
  const list = getCustomCategories();
  const slug = String(cat.slug || cat.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const entry = { name: cat.name, slug, description: cat.description || '' };
  const idx = list.findIndex((c) => c.slug === slug);
  const next = idx >= 0 ? list.map((c, i) => (i === idx ? entry : c)) : [...list, entry];
  write(CATS_KEY, next);
  notifyShop();
  return next;
}

export function deleteCategory(slug) {
  const next = getCustomCategories().filter((c) => c.slug !== slug);
  write(CATS_KEY, next);
  notifyShop();
  return next;
}
