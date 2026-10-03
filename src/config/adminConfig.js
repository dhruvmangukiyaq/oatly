// ─── ADMIN CONFIG (LOCKED — only 1 admin) ─────────────────────────────────────
// You are the ONLY admin of this website. Nobody else can log in as admin.
//
// SETUP (2 steps — do this once):
//  1. Put your email in ADMIN_EMAIL:
//       export const ADMIN_EMAIL = 'your@email.com';
//  2. Tell me (the developer) your admin password — I will take its SHA-256 hash
//     and store it in ADMIN_PASSWORD_HASH. NEVER put the password in the code
//     in plain text — only the hash stays here.
//
// SECURITY RULES (enforced in the code):
//  - Nobody becomes admin through signup — everyone becomes a customer.
//  - Signing up with the admin email is BLOCKED ("reserved").
//  - Admin login: an admin session starts only once email + password hash match.
//  - Any old/local admin account is auto-demoted automatically.
//  - 5 wrong passwords → 15 min lockout (brute-force friction).
//
// HONEST NOTE: this check runs in the browser. Editing localStorage through DevTools
// to bypass the UI is technically possible. For 100% security you need
// a backend login (server-side session) — that is kept as the next step.

export const ADMIN_EMAIL = 'dhruvmangukiya111@gmail.com';

export const ADMIN_PASSWORD_HASH = 'd8de88b11b6e9e72a108564fa00cde139eea884133fded5d66ebd59e140167a4';

// First-signup-auto-admin is PERMANENTLY OFF. If set to true, anyone
// could become admin — so always keep it false.
export const ALLOW_FIRST_USER_AS_ADMIN = false;

// Lockout policy
export const ADMIN_MAX_ATTEMPTS = 5;
export const ADMIN_LOCK_MINUTES = 15;

export function isAdminEmail(email = '') {
  if (!ADMIN_EMAIL) return false;
  return String(email).trim().toLowerCase() === String(ADMIN_EMAIL).trim().toLowerCase();
}

// SHA-256 hash (WebCrypto — available on localhost/https)
export async function sha256(text) {
  const data = new TextEncoder().encode(String(text));
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
