// ─── ADMIN STORE (frontend demo) ────────────────────────────────────────────
// Products overrides + Orders browser na localStorage ma rahe chhe:
//   oatly-admin-products → { [id]: { price, stock, name, category, ... } }
//                          + `__deleted`: [ids] + `__custom`: [new products]
//   oatly-orders         → [{ id, customer, email, items, total, status, date }]
// Backend aavse tyare aa j function names API calls ma feravvana raheshe.

const PRODUCTS_KEY = 'oatly-admin-products';
const ORDERS_KEY = 'oatly-orders';
export const ORDER_STATUSES = ['pending', 'packed', 'shipped', 'delivered', 'cancelled'];

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

// ── Products ──
export function getProductOverrides() {
  return read(PRODUCTS_KEY, { __deleted: [], __custom: [] });
}

export function saveProductOverride(id, patch) {
  const data = getProductOverrides();
  data[String(id)] = { ...(data[String(id)] || {}), ...patch };
  write(PRODUCTS_KEY, data);
  return data;
}

export function deleteProductAdmin(id, isCustom = false) {
  const data = getProductOverrides();
  if (isCustom) {
    data.__custom = (data.__custom || []).filter((p) => String(p.id) !== String(id));
  } else {
    delete data[String(id)];
    data.__deleted = [...(data.__deleted || []), String(id)];
  }
  write(PRODUCTS_KEY, data);
  return data;
}

export function restoreProductAdmin(id) {
  const data = getProductOverrides();
  data.__deleted = (data.__deleted || []).filter((x) => String(x) !== String(id));
  write(PRODUCTS_KEY, data);
  return data;
}

export function addCustomProduct(product) {
  const data = getProductOverrides();
  const id = product.id || `custom-${Date.now()}`;
  const entry = { id, ...product, isCustom: true, createdAt: new Date().toISOString() };
  data.__custom = [...(data.__custom || []), entry];
  write(PRODUCTS_KEY, data);
  return entry;
}

// Backend products + admin overrides ne merge karo (AdminPage vapre chhe)
export function mergeProducts(baseProducts = []) {
  const overrides = getProductOverrides();
  const deleted = new Set((overrides.__deleted || []).map(String));
  const merged = baseProducts
    .filter((p) => !deleted.has(String(p.id ?? p.slug ?? p.name)))
    .map((p) => {
      const key = String(p.id ?? p.slug ?? p.name);
      return overrides[key] ? { ...p, ...overrides[key] } : p;
    });
  return [...(overrides.__custom || []), ...merged];
}

// ── Orders ──
export function getOrders() {
  return read(ORDERS_KEY, []);
}

export function saveOrder(order) {
  const orders = getOrders();
  const entry = {
    id: order.id || `ORD-${Date.now().toString().slice(-6)}`,
    date: order.date || new Date().toISOString(),
    status: order.status || 'pending',
    ...order,
  };
  write(ORDERS_KEY, [entry, ...orders]);
  return entry;
}

export function updateOrderStatus(id, status) {
  return updateOrder(id, { status });
}

// Generic patch (tracking, refund, address…); status change timeline ma nondhay.
export function updateOrder(id, patch) {
  const orders = getOrders().map((o) => {
    if (String(o.id) !== String(id)) return o;
    const next = { ...o, ...patch };
    if (patch.status && patch.status !== o.status) {
      next.timeline = [...(o.timeline || []), { status: patch.status, date: new Date().toISOString() }];
    }
    return next;
  });
  write(ORDERS_KEY, orders);
  return orders;
}

export function getOrder(id) {
  return getOrders().find((o) => String(o.id) === String(id)) || null;
}

export function deleteOrder(id) {
  const orders = getOrders().filter((o) => String(o.id) !== String(id));
  write(ORDERS_KEY, orders);
  return orders;
}

export function getRevenue(orders = []) {
  return orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);
}
