import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Heart, Package, User as UserIcon, LogOut } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth, getSession } from '../hooks/useAuth.js';
import { useShop } from '../hooks/useShop.js';
import { useCatalog, findProduct } from '../hooks/useCatalog.js';
import { getOrders } from '../models/adminStore.js';
import '../styles/Shop.css';

export default function AccountPage() {
  const session = getSession();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');

  if (!session) return <Navigate to="/login" replace />;

  return (
    <div className="shop-page">
      <SEO title="My Account | Oatly Shop" description="Orders, wishlist and profile." pathname="/account" />
      <div className="shop-shell">
        <p className="shop-kicker">Oatly shop</p>
        <h1>Hi, {session.name}.</h1>
        <p className="shop-sub">{session.email} · {session.role === 'admin' ? 'ADMIN' : 'CUSTOMER'}</p>
        <div className="acct-tabs">
          <button type="button" className={tab === 'orders' ? 'is-active' : ''} onClick={() => setTab('orders')}>
            <Package size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> My orders
          </button>
          <button type="button" className={tab === 'wishlist' ? 'is-active' : ''} onClick={() => setTab('wishlist')}>
            <Heart size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Wishlist
          </button>
          <button type="button" className={tab === 'profile' ? 'is-active' : ''} onClick={() => setTab('profile')}>
            <UserIcon size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Profile
          </button>
          {session.role === 'admin' && <Link to="/admin" className="shop-btn shop-btn--small">Admin panel</Link>}
          <button type="button" className="shop-btn shop-btn--small shop-btn--ghost" onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
        {tab === 'orders' && <MyOrders email={session.email} />}
        {tab === 'wishlist' && <MyWishlist />}
        {tab === 'profile' && <Profile session={session} />}
      </div>
    </div>
  );
}

function MyOrders({ email }) {
  const mine = getOrders().filter((o) => String(o.email || '').toLowerCase() === String(email).toLowerCase());
  if (mine.length === 0) {
    return (
      <div className="shop-card shop-empty">
        <p><strong>Haju koi order nathi.</strong></p>
        <Link to="/products" className="shop-btn shop-btn--small">Shop now</Link>
      </div>
    );
  }
  return (
    <div>
      {mine.map((o) => (
        <div key={o.id} className="order-card">
          <div className="order-card__head">
            <strong>{o.id}</strong>
            <span className={`status-pill status-${o.status}`}>{o.status}</span>
          </div>
          <p className="shop-sub">{new Date(o.date).toLocaleString()} · ${(Number(o.total) || 0).toFixed(2)}</p>
          <ul style={{ margin: '8px 0', paddingLeft: 18, fontSize: '0.9rem' }}>
            {(o.items || []).map((it, i) => (
              <li key={i}>{it.name} × {it.qty} — ${(Number(it.price) * Number(it.qty)).toFixed(2)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MyWishlist() {
  const { wishlist, toggleWish, add } = useShop();
  const { products } = useCatalog();
  const items = wishlist.map((id) => findProduct(products, id)).filter(Boolean);
  if (items.length === 0) return <div className="shop-card shop-empty"><p><strong>Wishlist khali chhe.</strong></p><p className="shop-sub">Products par ♥ dabavo.</p></div>;
  return (
    <div className="shop-card">
      {items.map((p) => (
        <div key={p.id} className="shop-line">
          {p.image ? <img src={p.image} alt={p.name} /> : <span />}
          <div>
            <p className="shop-line__name">{p.name}</p>
            <p className="shop-line__meta">${Number(p.price).toFixed(2)}</p>
            <div className="shop-actions" style={{ marginTop: 6 }}>
              <button type="button" className="shop-btn shop-btn--small" onClick={() => add(p.id, 1)}>Add to cart</button>
              <button type="button" className="shop-linkbtn" onClick={() => toggleWish(p.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Profile({ session }) {
  return (
    <div className="shop-card">
      <h2>Profile</h2>
      <div className="shop-row"><span>Name</span><span>{session.name}</span></div>
      <div className="shop-row"><span>Email</span><span>{session.email}</span></div>
      <div className="shop-row"><span>Role</span><span>{session.role}</span></div>
      <p className="shop-sub">Password change ane address book backend saathe aavshe.</p>
    </div>
  );
}
