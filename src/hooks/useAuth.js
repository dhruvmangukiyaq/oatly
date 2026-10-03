import { useCallback, useEffect, useState } from 'react';
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH,
  ADMIN_MAX_ATTEMPTS,
  ADMIN_LOCK_MINUTES,
  isAdminEmail,
  sha256,
} from '../config/adminConfig.js';

// ─── AUTH (LOCKED admin + open customer shop) ───────────────────────────────
// Customers: browser localStorage (`oatly-accounts` / `oatly-session`).
// Admin: KEVAL 1 fixed email + password-hash (adminConfig.js). Signup thi
// admin KOI DIVAS banto nathi; juna admin records auto-demote thay chhe.
//
// ROLES:
//  - 'admin'    → keval ADMIN_EMAIL + correct password. /admin keval aena mate.
//  - 'customer' → bija badha. Emne admin link/route dekhashe nahi.

const ACCOUNTS_KEY = 'oatly-accounts';
const SESSION_KEY = 'oatly-session';
const ATTEMPTS_KEY = 'oatly-admin-attempts';
const EVENT = 'oatly-auth';

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
    /* private mode — session only lives in memory */
  }
}

function notify() {
  window.dispatchEvent(new Event(EVENT));
}

// Juna records ma bhul thi admin role hoy to customer ma utaari do.
// (Pela first-signup rule thi koi admin banyu hoy to e ahiya clean thashe.)
function sanitizeAccounts() {
  const accounts = read(ACCOUNTS_KEY, []);
  let changed = false;
  accounts.forEach((a) => {
    if (a.role === 'admin' && !isAdminEmail(a.email)) {
      a.role = 'customer';
      changed = true;
    }
    if (!a.role) {
      a.role = 'customer';
      changed = true;
    }
  });
  if (changed) write(ACCOUNTS_KEY, accounts);
  return accounts;
}

export function isAdmin(user) {
  if (!user || user.role !== 'admin') return false;
  return isAdminEmail(user.email);
}

export function getSession() {
  sanitizeAccounts();
  const session = read(SESSION_KEY, null);
  if (!session) return null;
  // Session ma admin claim hoy pan email admin ni na hoy → customer.
  if (session.role === 'admin' && !isAdminEmail(session.email)) {
    const fixed = { ...session, role: 'customer' };
    write(SESSION_KEY, fixed);
    return fixed;
  }
  if (!session.role) return { ...session, role: 'customer' };
  return session;
}

export function getAllAccounts() {
  return sanitizeAccounts();
}

// ── Admin brute-force friction ──
function getAttempts() {
  return read(ATTEMPTS_KEY, { count: 0, lockedUntil: 0 });
}

function adminLocked() {
  const a = getAttempts();
  if (a.lockedUntil && Date.now() < a.lockedUntil) {
    const mins = Math.ceil((a.lockedUntil - Date.now()) / 60000);
    return `Too many wrong attempts. Try again in ~${mins} min.`;
  }
  return null;
}

function recordAdminFail() {
  const a = getAttempts();
  const count = (a.count || 0) + 1;
  const lockedUntil = count >= ADMIN_MAX_ATTEMPTS ? Date.now() + ADMIN_LOCK_MINUTES * 60000 : 0;
  write(ATTEMPTS_KEY, { count: lockedUntil ? 0 : count, lockedUntil });
}

function resetAdminAttempts() {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
  } catch {
    /* ignore */
  }
}

export function useAuth() {
  const [user, setUser] = useState(() => getSession());

  useEffect(() => {
    const sync = () => setUser(getSession());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // NOTE: async — admin path ma SHA-256 check thay chhe.
  const login = useCallback(async (email, password) => {
    const cleanEmail = String(email).trim();
    sanitizeAccounts();

    // ── ADMIN PATH: keval fixed email + password hash match ──
    if (isAdminEmail(cleanEmail)) {
      const locked = adminLocked();
      if (locked) return { ok: false, error: locked };
      if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
        return { ok: false, error: 'Admin setup incomplete. Contact the site owner.' };
      }
      let hash = '';
      try {
        hash = await sha256(password);
      } catch {
        return { ok: false, error: 'This browser cannot verify admin login. Try another browser.' };
      }
      if (hash !== ADMIN_PASSWORD_HASH) {
        recordAdminFail();
        return { ok: false, error: 'Wrong admin password.' };
      }
      resetAdminAttempts();
      const session = { name: 'Admin', email: ADMIN_EMAIL, role: 'admin' };
      write(SESSION_KEY, session);
      setUser(session);
      notify();
      try {
        window.dispatchEvent(new Event('oatly-shop'));
      } catch {
        /* ignore */
      }
      return { ok: true, role: 'admin' };
    }

    // ── CUSTOMER PATH: signup karel account j login kari shake ──
    const accounts = read(ACCOUNTS_KEY, []);
    const found = accounts.find((a) => String(a.email).toLowerCase() === cleanEmail.toLowerCase());
    if (!found) return { ok: false, error: 'No account with this email. Please create one.' };
    if (found.password !== password) return { ok: false, error: 'Wrong password. Try again.' };
    const session = { name: found.name, email: found.email, role: 'customer' };
    write(SESSION_KEY, session);
    setUser(session);
    notify();
    return { ok: true, role: 'customer' };
  }, []);

  const signup = useCallback((name, email, password) => {
    const cleanEmail = String(email).trim();
    sanitizeAccounts();
    // Admin email RESERVED — enathi signup thay j nahi.
    if (isAdminEmail(cleanEmail)) {
      return { ok: false, error: 'This email is reserved. Please log in instead.' };
    }
    const accounts = read(ACCOUNTS_KEY, []);
    if (accounts.some((a) => String(a.email).toLowerCase() === cleanEmail.toLowerCase())) {
      return { ok: false, error: 'This email already has an account. Please log in.' };
    }
    // Signup hammesha CUSTOMER — koi divas admin nahi.
    const account = { name: String(name).trim(), email: cleanEmail, password, role: 'customer', createdAt: new Date().toISOString() };
    accounts.push(account);
    write(ACCOUNTS_KEY, accounts);
    const session = { name: account.name, email: account.email, role: 'customer' };
    write(SESSION_KEY, session);
    setUser(session);
    notify();
    return { ok: true, role: 'customer' };
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setUser(null);
    notify();
  }, []);

  return { user, isAdmin: isAdmin(user), login, signup, logout };
}

// Seller Hub mate: customer account delete karva
export function deleteAccount(email) {
  const accounts = read(ACCOUNTS_KEY, []);
  const next = accounts.filter((a) => String(a.email).toLowerCase() !== String(email).toLowerCase());
  write(ACCOUNTS_KEY, next);
  notify();
  return next;
}

export { ADMIN_EMAIL };
