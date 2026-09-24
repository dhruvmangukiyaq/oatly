import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useShop } from '../hooks/useShop.js';
import { useCatalog, findProduct } from '../hooks/useCatalog.js';
import { calcTotals } from '../models/shopStore.js';
import '../styles/Shop.css';

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, remove, couponCode, setCouponCode, settings } = useShop();
  const { products } = useCatalog();
  const [localCoupon, setLocalCoupon] = useState('');

  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const p = findProduct(products, id);
      if (!p) return null;
      return { id, qty, name: p.name, price: p.price, image: p.image };
    })
    .filter(Boolean);

  const code = localCoupon || couponCode;
  const totals = calcTotals(lines, { couponCode: code, settings });

  const apply = () => setCouponCode(localCoupon.trim().toUpperCase());

  return (
    <div className={`cartdrawer${open ? ' cartdrawer--open' : ''}`} aria-hidden={!open}>
      <div className="cartdrawer__bg" onClick={onClose} />
      <aside className="cartdrawer__panel" role="dialog" aria-label="Shopping cart">
        <div className="cartdrawer__head">
          <h2><ShoppingCart size={18} style={{ display: 'inline', verticalAlign: '-3px' }} /> Cart ({lines.reduce((s, l) => s + l.qty, 0)})</h2>
          <button type="button" className="plist-card__wish" aria-label="Close cart" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="cartdrawer__body">
          {lines.length === 0 ? (
            <div className="shop-empty">
              <p><strong>Cart khali chhe.</strong></p>
              <p className="shop-sub">Products page thi oat goodness add karo.</p>
              <Link to="/products" className="shop-btn shop-btn--small" onClick={onClose}>Shop now</Link>
            </div>
          ) : (
            lines.map((l) => (
              <div key={l.id} className="shop-line">
                {l.image ? <img src={l.image} alt={l.name} /> : <div style={{ width: 72, height: 72 }} />}
                <div>
                  <p className="shop-line__name">{l.name}</p>
                  <p className="shop-line__meta">{settings.currency}{Number(l.price).toFixed(2)} each</p>
                  <div className="qty">
                    <button type="button" aria-label="Decrease" onClick={() => updateQty(l.id, l.qty - 1)}>−</button>
                    <span>{l.qty}</span>
                    <button type="button" aria-label="Increase" onClick={() => updateQty(l.id, l.qty + 1)}>+</button>
                  </div>
                  <button type="button" className="shop-linkbtn" onClick={() => remove(l.id)}>
                    <Trash2 size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> Remove
                  </button>
                </div>
                <span className="shop-line__price">{settings.currency}{(l.price * l.qty).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
        {lines.length > 0 && (
          <div className="cartdrawer__foot">
            <div className="shop-coupon">
              <input
                placeholder="COUPON (OAT10)"
                value={localCoupon || couponCode}
                onChange={(e) => setLocalCoupon(e.target.value.toUpperCase())}
              />
              <button type="button" className="shop-btn shop-btn--small shop-btn--ghost" onClick={apply}>Apply</button>
            </div>
            <div className="shop-row"><span>Subtotal</span><span>{settings.currency}{totals.subtotal.toFixed(2)}</span></div>
            {totals.discount > 0 && <div className="shop-row shop-row--discount"><span>Discount</span><span>−{settings.currency}{totals.discount.toFixed(2)}</span></div>}
            <div className="shop-row"><span>Shipping</span><span>{totals.shipping === 0 ? 'FREE' : `${settings.currency}${totals.shipping.toFixed(2)}`}</span></div>
            <div className="shop-row shop-row--total"><span>Total</span><span>{settings.currency}{totals.total.toFixed(2)}</span></div>
            <div className="shop-actions">
              <Link to="/cart" className="shop-btn shop-btn--ghost shop-btn--small" onClick={onClose}>View cart</Link>
              <Link to="/checkout" className="shop-btn shop-btn--small" onClick={onClose}>Checkout →</Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
