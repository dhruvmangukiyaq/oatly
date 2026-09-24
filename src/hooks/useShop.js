import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EVENT_SHOP, getCart, setQty, addToCart, removeFromCart, clearCart, cartCount,
  getWishlist, toggleWishlist, getCoupons, getSettings,
} from '../models/shopStore.js';

export function useShop() {
  const [cart, setCartState] = useState(() => getCart());
  const [wishlist, setWishState] = useState(() => getWishlist());
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    const sync = () => {
      setCartState(getCart());
      setWishState(getWishlist());
    };
    window.addEventListener(EVENT_SHOP, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT_SHOP, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const add = useCallback((id, qty = 1) => setCartState(addToCart(id, qty)), []);
  const updateQty = useCallback((id, qty) => setCartState(setQty(id, qty)), []);
  const remove = useCallback((id) => setCartState(removeFromCart(id)), []);
  const clear = useCallback(() => { clearCart(); setCartState({}); }, []);
  const toggleWish = useCallback((id) => setWishState(toggleWishlist(id)), []);

  const count = useMemo(() => Object.values(cart).reduce((s, q) => s + (Number(q) || 0), 0), [cart]);

  return {
    cart, count, add, updateQty, remove, clear,
    wishlist, toggleWish,
    couponCode, setCouponCode,
    coupons: getCoupons(),
    settings: getSettings(),
    cartCountStatic: cartCount,
  };
}

export default useShop;
