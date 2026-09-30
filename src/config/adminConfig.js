// ─── ADMIN CONFIG (LOCKED — keval 1 admin) ────────────────────────────────────
// Aa website no admin KEVAL tame j chho. Biju koi admin login kari shakse nahi.
//
// SETUP (2 step — ek var karvanu):
//  1. ADMIN_EMAIL ma tamaro email lakho:
//       export const ADMIN_EMAIL = 'tamaru@email.com';
//  2. Tamaro admin password mane (developer ne) kaho — hu eno SHA-256 hash
//     banavi ne ADMIN_PASSWORD_HASH ma mukish. Code ma password KDYAREY
//     plain text ma lakhvo NAAHI — keval hash j raheshe.
//
// SECURITY RULES (code ma enforce thayela chhe):
//  - Signup thi KOI admin banto NATHI — badha customer j banse.
//  - Admin email thi signup karva jay to BLOCK thashe ("reserved").
//  - Admin login: email + password hash match thase TYARE j admin session.
//  - Juna/local koi pan admin account hoy to auto-DEMOTE thai jashe.
//  - Khota password 5 var → 15 min lock (brute-force friction).
//
// HONEST NOTE: aa check browser ma thay chhe. DevTools thi localStorage
// badli ne UI bypass technically possible chhe. 100% full security mate
// backend login (server-side session) joiye — e next step rakhelu chhe.

export const ADMIN_EMAIL = 'dhruvmangukiya111@gmail.com';

export const ADMIN_PASSWORD_HASH = 'd8de88b11b6e9e72a108564fa00cde139eea884133fded5d66ebd59e140167a4';

// Pahela-signup-auto-admin PERMANENT BANDH. true karso to bijo koi pan
// admin bani shakse — etle hammesha false j rakhvu.
export const ALLOW_FIRST_USER_AS_ADMIN = false;

// Lockout policy
export const ADMIN_MAX_ATTEMPTS = 5;
export const ADMIN_LOCK_MINUTES = 15;

export function isAdminEmail(email = '') {
  if (!ADMIN_EMAIL) return false;
  return String(email).trim().toLowerCase() === String(ADMIN_EMAIL).trim().toLowerCase();
}

// SHA-256 hash (WebCrypto — localhost/https par available)
export async function sha256(text) {
  const data = new TextEncoder().encode(String(text));
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
