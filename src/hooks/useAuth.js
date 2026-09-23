import { useCallback, useEffect, useState } from 'react';
import { ADMIN_EMAILS, ALLOW_FIRST_USER_AS_ADMIN, isAdminEmail } from '../config/adminConfig.js';

// ─── AUTH (frontend session for the shop) ───────────────────────────────────
// Users are stored locally (per browser): registered accounts in
// `oatly-accounts`, active session in `oatly-session`. Same API shape as a
// future backend auth service, so swapping it later is a one-file change.
//
// ROLES:
//  - 'admin'    → keval tame (pahela signup karnar, athava ADMIN_EMAILS vala).
//                 Admin panel (/admin) keval admin j joi shake chhe.
//  - 'customer' → bija badha users. Emne admin link ke route dekhashe nahi.

const ACCOUNTS_KEY = 'oatly-accounts';
const SESSION_KEY = 'oatly-session';
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

function decideRole(email, accounts) {
  if (isAdminEmail(email)) return 'admin';
  if (ALLOW_FIRST_USER_AS_ADMIN) {
    const hasAdmin = accounts.some((a) => a.role === 'admin' || isAdminEmail(a.email));
    if (!hasAdmin) return 'admin'; // pahelo user (tame) → auto admin
  }
  return 'customer';
}

export function isAdmin(user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  // Migration: juna session ma role na hoy to email list parthi nakki karo
  return isAdminEmail(user.email);
}

export function getSession() {
  const session = read(SESSION_KEY, null);
  if (session && !session.role) {
    // juna session ne role aapo (email list aadharit)
    return { ...session, role: isAdminEmail(session.email) ? 'admin' : 'customer' };
  }
  return session;
}

export function getAllAccounts() {
  return read(ACCOUNTS_KEY, []);
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

  const login = useCallback((email, password) => {
    const accounts = read(ACCOUNTS_KEY, []);
    const found = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) return { ok: false, error: 'No account with this email. Please create one.' };
    if (found.password !== password) return { ok: false, error: 'Wrong password. Try again.' };
    // juna account ma role na hoy to have thi nakki karo + save karo
    let role = found.role;
    if (!role) {
      role = decideRole(found.email, accounts);
      found.role = role;
      write(ACCOUNTS_KEY, accounts);
    } else if (isAdminEmail(found.email)) {
      role = 'admin';
      found.role = role;
      write(ACCOUNTS_KEY, accounts);
    }
    const session = { name: found.name, email: found.email, role };
    write(SESSION_KEY, session);
    setUser(session);
    notify();
    return { ok: true, role };
  }, []);

  const signup = useCallback((name, email, password) => {
    const accounts = read(ACCOUNTS_KEY, []);
    if (accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, error: 'This email already has an account. Please log in.' };
    }
    const role = decideRole(email, accounts);
    const account = { name: name.trim(), email: email.trim(), password, role, createdAt: new Date().toISOString() };
    accounts.push(account);
    write(ACCOUNTS_KEY, accounts);
    const session = { name: account.name, email: account.email, role };
    write(SESSION_KEY, session);
    setUser(session);
    notify();
    return { ok: true, role };
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

// Admin mate: customer account delete karva (AdminPage vapre chhe)
export function deleteAccount(email) {
  const accounts = read(ACCOUNTS_KEY, []);
  const next = accounts.filter((a) => a.email.toLowerCase() !== String(email).toLowerCase());
  write(ACCOUNTS_KEY, next);
  notify();
  return next;
}

export { ADMIN_EMAILS };
