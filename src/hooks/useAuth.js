import { useCallback, useEffect, useState } from 'react';

// ─── AUTH (frontend session for the shop) ───────────────────────────────────
// Users are stored locally (per browser): registered accounts in
// `oatly-accounts`, active session in `oatly-session`. Same API shape as a
// future backend auth service, so swapping it later is a one-file change.

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

export function getSession() {
  return read(SESSION_KEY, null);
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
    const session = { name: found.name, email: found.email };
    write(SESSION_KEY, session);
    setUser(session);
    notify();
    return { ok: true };
  }, []);

  const signup = useCallback((name, email, password) => {
    const accounts = read(ACCOUNTS_KEY, []);
    if (accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, error: 'This email already has an account. Please log in.' };
    }
    const account = { name: name.trim(), email: email.trim(), password };
    accounts.push(account);
    write(ACCOUNTS_KEY, accounts);
    const session = { name: account.name, email: account.email };
    write(SESSION_KEY, session);
    setUser(session);
    notify();
    return { ok: true };
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

  return { user, login, signup, logout };
}
