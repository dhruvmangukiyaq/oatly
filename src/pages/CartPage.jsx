import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useShop } from '../hooks/useShop.js';
import { useCatalog, findProduct } from '../hooks/useCatalog.js';
import { calcTotals, validateCoupon } from '../models/shopStore.js';
import '../styles/Shop.css';

export default function CartPage() {
  const { cart, updateQty, remove, clear, couponCode, setCouponCode, settings } = useShop();
  const { products } = useCatalog();
  const [input, setInput] = useState(couponCode);
  const [msg, setMsg] = useState('');

  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const p = findProduct(products, id);
      return p ? { id, qty, name: p.name, price: p.price, image: p.image, stock: p.stock } : null;
    })
    .filter(Boolean);

  const totals = calcTotals(lines, { couponCode, settings });

  const apply = () => {
    const code = input.trim().toUpperCase();
    if (!code) { setCouponCode(''); setMsg(''); return; }
    const v = validateCoupon(code, totals.subtotal);
    if (!v.ok) { setMsg(v.error); return; }
    setCouponCode(code);
    setMsg(`Coupon ${code} applied!`);
  };

  return (
    <div className="shop-page">
      <SEO title="Cart | Oatly Shop" description="Your shopping cart." pathname="/cart" />
      <div className="shop-shell">
        <p className="shop-kicker">Oatly shop</p>
        <h1>Your cart.</h1>
        {lines.length === 0 ? (
          <div className="shop-card shop-empty">
            <p><strong>Cart khali chhe.</strong></p>
            <p className="shop-sub">Chalo oat milk, oatgurt ane ice cream umeriye.</p>
            <Link to="/products" className="shop-btn">Shop products</Link>
          </div>
        ) : (
          <div className="shop-grid2">
            <div className="shop-card">
              {lines.map((l) => (
                <div key={l.id} className="shop-line">
                  {l.image ? <img src={l.image} alt={l.name} /> : <span />}
                  <div>
                    <p className="shop-line__name">{l.name}</p>
                    <p className="shop-line__meta">{settings.currency}{Number(l.price).toFixed(2)} · Stock: {l.stock ?? '—'}</p>
                    <div className="qty">
                      <button type="button" onClick={() => updateQty(l.id, l.qty - 1)}>−</button>
                      <span>{l.qty}</span>
                      <button type="button" onClick={() => updateQty(l.id, Math.min(l.qty + 1, Number(l.stock) || 99))}>+</button>
                    </div>
                    <button type="button" className="shop-linkbtn" onClick={() => remove(l.id)}>Remove</button>
                  </div>
                  <span className="shop-line__price">{settings.currency}{(l.price * l.qty).toFixed(2)}</span>
                </div>
              ))}
              <button type="button" className="shop-linkbtn" onClick={clear}>Clear cart</button>
            </div>
            <div className="shop-card">
              <h2>Summary</h2>
              <div className="shop-coupon">
                <input placeholder="COUPON CODE" value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} />
                <button type="button" className="shop-btn shop-btn--small shop-btn--ghost" onClick={apply}>Apply</button>
              </div>
              {msg && <p className={msg.includes('applied') ? 'shop-success' : 'shop-error'}>{msg}</p>}
              <div className="shop-row"><span>Subtotal</span><span>{settings.currency}{totals.subtotal.toFixed(2)}</span></div>
              {totals.discount > 0 && <div className="shop-row shop-row--discount"><span>Discount ({couponCode})</span><span>−{settings.currency}{totals.discount.toFixed(2)}</span></div>}
              <div className="shop-row"><span>Shipping</span><span>{totals.shipping === 0 ? 'FREE' : `${settings.currency}${totals.shipping.toFixed(2)}`}</span></div>
              <div className="shop-row"><span>Tax ({Math.round(settings.taxRate * 100)}%)</span><span>{settings.currency}{totals.tax.toFixed(2)}</span></div>
              <div className="shop-row shop-row--total"><span>Total</span><span>{settings.currency}{totals.total.toFixed(2)}</span></div>
              <div className="shop-actions">
                <Link to="/checkout" className="shop-btn shop-btn--big">Checkout →</Link>
                <Link to="/products" className="shop-btn shop-btn--ghost shop-btn--big">Continue shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
