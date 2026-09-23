import React, { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Plus, Trash2,
  Pencil, Search, LogOut, Store, RotateCcw,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth, getAllAccounts, deleteAccount } from '../hooks/useAuth.js';
import { isAdmin } from '../hooks/useAuth.js';
import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';
import {
  mergeProducts, saveProductOverride, deleteProductAdmin, restoreProductAdmin,
  addCustomProduct, getProductOverrides,
  getOrders, saveOrder, updateOrderStatus, deleteOrder, getRevenue,
  ORDER_STATUSES,
} from '../models/adminStore.js';
import '../styles/AdminPage.css';

/* ==========================================================================
   ADMIN PANEL — keval admin (tame) maate. Bija users ne /admin khulshe nahi,
   navbar ma ADMIN link dekhashe nahi.
   Tabs: Dashboard | Products | Orders | Customers
   ========================================================================== */

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
];

function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin(user)) {
    return (
      <div className="admin-page">
        <div className="admin-card admin-denied">
          <h1>Access denied.</h1>
          <p>Aa page keval admin maate chhe. Tamaaru account customer chhe.</p>
          <div className="admin-actions">
            <Link to="/products" className="admin-btn">Shop now</Link>
            <Link to="/" className="admin-btn admin-btn--ghost">Home</Link>
          </div>
        </div>
      </div>
    );
  }
  return children;
}

function Stat({ label, value, sub }) {
  return (
    <div className="admin-stat">
      <p className="admin-stat__value">{value}</p>
      <p className="admin-stat__label">{label}</p>
      {sub && <p className="admin-stat__sub">{sub}</p>}
    </div>
  );
}

export default function AdminPage() {
  return (
    <RequireAdmin>
      <AdminInner />
    </RequireAdmin>
  );
}

function AdminInner() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);

  // MODEL: base products backend thi, pachhi admin overrides merge
  const baseProducts = useApiData(() => ProductModel.getAllProducts(), []) || [];
  const overrides = getProductOverrides();
  const products = useMemo(
    () => mergeProducts(Array.isArray(baseProducts) ? baseProducts : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseProducts, refresh],
  );
  const orders = useMemo(() => getOrders(), // eslint-disable-next-line react-hooks/exhaustive-deps
  [refresh]);
  const accounts = useMemo(() => getAllAccounts(), // eslint-disable-next-line react-hooks/exhaustive-deps
  [refresh]);
  const customers = accounts.filter((a) => a.role !== 'admin');
  const revenue = getRevenue(orders);

  const q = query.trim().toLowerCase();
  const filteredProducts = products.filter((p) =>
    !q || [p.name, p.category, p.id].filter(Boolean).join(' ').toLowerCase().includes(q),
  );
  const filteredOrders = orders.filter((o) =>
    !q || [o.id, o.customer, o.email, o.status].filter(Boolean).join(' ').toLowerCase().includes(q),
  );
  const filteredCustomers = customers.filter((c) =>
    !q || [c.name, c.email].filter(Boolean).join(' ').toLowerCase().includes(q),
  );

  const reload = () => setRefresh((v) => v + 1);

  return (
    <div className="admin-page">
      <SEO title="Admin Panel | Oatly" description="Shop admin — orders, products, customers." pathname="/admin" />

      <div className="admin-shell">
        {/* Sidebar */}
        <aside className="admin-side">
          <p className="admin-kicker">Oatly shop</p>
          <h1>Admin panel</h1>
          <p className="admin-who">
            Logged in as <strong>{user?.name}</strong>
            <span className="admin-badge">ADMIN</span>
          </p>
          <nav className="admin-tabs" aria-label="Admin sections">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={tab === id ? 'is-active' : ''}
                onClick={() => { setTab(id); setQuery(''); }}
              >
                <Icon size={16} aria-hidden="true" /> {label}
                {id === 'orders' && orders.filter((o) => o.status === 'pending').length > 0 && (
                  <span className="admin-count">{orders.filter((o) => o.status === 'pending').length}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="admin-side__foot">
            <Link to="/products" className="admin-btn admin-btn--ghost admin-btn--small">
              <Store size={15} aria-hidden="true" /> View shop
            </Link>
            <Link to="/login" onClick={logout} className="admin-btn admin-btn--small admin-btn--ghost">
              <LogOut size={15} aria-hidden="true" /> Logout
            </Link>
          </div>
        </aside>

        {/* Main */}
        <section className="admin-main">
          <div className="admin-toolbar">
            <div className="admin-search">
              <Search size={16} aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  tab === 'products' ? 'Search products…' :
                  tab === 'orders' ? 'Search orders…' :
                  tab === 'customers' ? 'Search customers…' : 'Search…'
                }
                aria-label="Search"
              />
            </div>
          </div>

          {tab === 'dashboard' && (
            <Dashboard
              products={products} orders={orders} customers={customers}
              revenue={revenue} overridesCount={Object.keys(overrides).filter((k) => !k.startsWith('__')).length}
              onGo={setTab}
            />
          )}
          {tab === 'products' && <ProductsTab items={filteredProducts} reload={reload} />}
          {tab === 'orders' && <OrdersTab items={filteredOrders} reload={reload} />}
          {tab === 'customers' && <CustomersTab items={filteredCustomers} reload={reload} />}
        </section>
      </div>
    </div>
  );
}

/* ── Dashboard ── */
function Dashboard({ products, orders, customers, revenue, overridesCount, onGo }) {
  const pending = orders.filter((o) => o.status === 'pending').length;
  const lowStock = products.filter((p) => Number(p.stock ?? 999) <= 5).length;
  const recent = orders.slice(0, 5);
  return (
    <div>
      <div className="admin-grid">
        <Stat label="Revenue" value={`$${revenue.toFixed(2)}`} sub={`${orders.length} orders`} />
        <Stat label="Products" value={products.length} sub={`${overridesCount} edited`} />
        <Stat label="Pending orders" value={pending} sub="need action" />
        <Stat label="Customers" value={customers.length} sub="registered" />
        {lowStock > 0 && <Stat label="Low stock (≤5)" value={lowStock} sub="restock karo" />}
      </div>
      <div className="admin-panel">
        <div className="admin-panel__head">
          <h2>Recent orders</h2>
          <button type="button" className="admin-link" onClick={() => onGo('orders')}>All orders →</button>
        </div>
        {recent.length === 0 ? (
          <p className="admin-empty">Haju koi order nathi. Nava order aavse etle ahiya dekhase.</p>
        ) : (
          <ul className="admin-list">
            {recent.map((o) => (
              <li key={o.id}>
                <strong>{o.id}</strong> · {o.customer || o.email} · ${Number(o.total || 0).toFixed(2)}
                <span className={`admin-pill admin-pill--${o.status}`}>{o.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Products (e-commerce CRUD) ── */
function ProductsTab({ items, reload }) {
  const [editing, setEditing] = useState(null); // product id
  const [form, setForm] = useState({ price: '', stock: '' });
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', category: 'Oat Drink', price: '', stock: '' });
  const deleted = getProductOverrides().__deleted || [];

  const startEdit = (p) => {
    setEditing(String(p.id ?? p.slug ?? p.name));
    setForm({ price: p.price ?? '', stock: p.stock ?? '' });
  };

  const saveEdit = (p) => {
    const key = String(p.id ?? p.slug ?? p.name);
    saveProductOverride(key, {
      price: Number(form.price) || 0,
      stock: form.stock === '' ? undefined : Number(form.stock),
    });
    setEditing(null);
    reload();
  };

  const create = (e) => {
    e.preventDefault();
    if (newForm.name.trim().length < 2) return;
    addCustomProduct({
      name: newForm.name.trim(),
      category: newForm.category.trim() || 'Oat Drink',
      price: Number(newForm.price) || 0,
      stock: Number(newForm.stock) || 0,
      tagline: 'Admin added product',
    });
    setNewForm({ name: '', category: 'Oat Drink', price: '', stock: '' });
    setShowNew(false);
    reload();
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <h2>Products ({items.length})</h2>
        <button type="button" className="admin-btn admin-btn--small" onClick={() => setShowNew((v) => !v)}>
          <Plus size={15} aria-hidden="true" /> {showNew ? 'Close' : 'Add product'}
        </button>
      </div>

      {showNew && (
        <form className="admin-form" onSubmit={create}>
          <input placeholder="Product name *" value={newForm.name} onChange={(e) => setNewForm({ ...newForm, name: e.target.value })} />
          <input placeholder="Category" value={newForm.category} onChange={(e) => setNewForm({ ...newForm, category: e.target.value })} />
          <input placeholder="Price ($)" type="number" min="0" step="0.01" value={newForm.price} onChange={(e) => setNewForm({ ...newForm, price: e.target.value })} />
          <input placeholder="Stock" type="number" min="0" step="1" value={newForm.stock} onChange={(e) => setNewForm({ ...newForm, stock: e.target.value })} />
          <button type="submit" className="admin-btn admin-btn--small">Save product</button>
        </form>
      )}

      {deleted.length > 0 && (
        <p className="admin-note">
          {deleted.length} product(s) hidden.
          {deleted.map((id) => (
            <button key={id} type="button" className="admin-link" onClick={() => { restoreProductAdmin(id); reload(); }}>
              <RotateCcw size={13} aria-hidden="true" /> Restore {id}
            </button>
          ))}
        </p>
      )}

      <div className="admin-tablewrap">
        <table className="admin-table">
          <thead>
            <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const key = String(p.id ?? p.slug ?? p.name);
              const isEdit = editing === key;
              return (
                <tr key={key}>
                  <td><strong>{p.name}</strong><br /><small>{key}</small></td>
                  <td>{p.category || '—'}</td>
                  <td>
                    {isEdit ? (
                      <input className="admin-cellinput" type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    ) : (p.price != null ? `$${Number(p.price).toFixed(2)}` : '—')}
                  </td>
                  <td>
                    {isEdit ? (
                      <input className="admin-cellinput" type="number" min="0" step="1" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                    ) : (p.stock != null ? p.stock : '—')}
                  </td>
                  <td className="admin-rowactions">
                    {isEdit ? (
                      <>
                        <button type="button" className="admin-btn admin-btn--small" onClick={() => saveEdit(p)}>Save</button>
                        <button type="button" className="admin-btn admin-btn--small admin-btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="admin-iconbtn" aria-label={`Edit ${p.name}`} onClick={() => startEdit(p)}>
                          <Pencil size={15} aria-hidden="true" />
                        </button>
                        <button
                          type="button" className="admin-iconbtn admin-iconbtn--danger" aria-label={`Delete ${p.name}`}
                          onClick={() => { deleteProductAdmin(key, Boolean(p.isCustom)); reload(); }}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {items.length === 0 && <p className="admin-empty">Koi product malyu nahi.</p>}
    </div>
  );
}

/* ── Orders (e-commerce) ── */
function OrdersTab({ items, reload }) {
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ customer: '', email: '', total: '', status: 'pending' });

  const create = (e) => {
    e.preventDefault();
    if (!form.customer.trim() && !form.email.trim()) return;
    saveOrder({
      customer: form.customer.trim() || 'Walk-in',
      email: form.email.trim(),
      items: [{ name: 'Manual order', qty: 1, price: Number(form.total) || 0 }],
      total: Number(form.total) || 0,
      status: form.status,
    });
    setForm({ customer: '', email: '', total: '', status: 'pending' });
    setShowNew(false);
    reload();
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <h2>Orders ({items.length})</h2>
        <button type="button" className="admin-btn admin-btn--small" onClick={() => setShowNew((v) => !v)}>
          <Plus size={15} aria-hidden="true" /> {showNew ? 'Close' : 'Manual order'}
        </button>
      </div>

      {showNew && (
        <form className="admin-form" onSubmit={create}>
          <input placeholder="Customer name" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Total ($)" type="number" min="0" step="0.01" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="submit" className="admin-btn admin-btn--small">Add order</button>
        </form>
      )}

      <div className="admin-tablewrap">
        <table className="admin-table">
          <thead>
            <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((o) => (
              <tr key={o.id}>
                <td><strong>{o.id}</strong><br /><small>{new Date(o.date).toLocaleString()}</small></td>
                <td>{o.customer || '—'}<br /><small>{o.email || ''}</small></td>
                <td>${Number(o.total || 0).toFixed(2)}</td>
                <td>
                  <select
                    className={`admin-pill admin-pill--${o.status}`}
                    value={o.status}
                    onChange={(e) => { updateOrderStatus(o.id, e.target.value); reload(); }}
                    aria-label={`Status for ${o.id}`}
                  >
                    {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <button
                    type="button" className="admin-iconbtn admin-iconbtn--danger" aria-label={`Delete ${o.id}`}
                    onClick={() => { deleteOrder(o.id); reload(); }}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && <p className="admin-empty">Haju koi order nathi — manual order umeri shako cho.</p>}
    </div>
  );
}

/* ── Customers ── */
function CustomersTab({ items, reload }) {
  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <h2>Customers ({items.length})</h2>
      </div>
      <div className="admin-tablewrap">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Joined</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.email}>
                <td><strong>{c.name}</strong></td>
                <td>{c.email}</td>
                <td><small>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</small></td>
                <td>
                  <button
                    type="button" className="admin-iconbtn admin-iconbtn--danger" aria-label={`Remove ${c.email}`}
                    onClick={() => { deleteAccount(c.email); reload(); }}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && <p className="admin-empty">Haju koi customer register nathi thayo.</p>}
      <p className="admin-note">Admin accounts ahiya dekhashe nahi — keval customers.</p>
    </div>
  );
}
