// ─── ADMIN CONFIG ───────────────────────────────────────────────────────────
// Admin panel keval tamaara maate j chhe — bija koi user ne dekhashe nahi.
//
// KAM KEEM KARE CHHE:
//  1. Tame jyaare pahela signup karsho (tamaari ID), tame AUTO-ADMIN bani jasho.
//     Pachhi signup karnara badha users CUSTOMER thashe.
//  2. Jo tame chokkas email ne admin banavvu hoy to niche list ma umero:
//       export const ADMIN_EMAILS = ['tamaru@email.com'];
//     Aa email thi signup/login karsho etle admin malse — bija badha customer.
//
// NOTE (demo auth): accounts browser na localStorage ma rahe chhe,
// etle admin check frontend par j thay chhe. Real backend aavse tyare
// aa j file server-side check ma feravvani raheshe.

export const ADMIN_EMAILS = [
  // 'tamaru@email.com',
];

// Jo true hoy ane haju koi admin account na hoy, to pahelo signup karnar
// user admin bani jashe. Tame potani ID jate banavvana chho etle aa true rakho.
export const ALLOW_FIRST_USER_AS_ADMIN = true;

export function isAdminEmail(email = '') {
  const clean = String(email).trim().toLowerCase();
  return ADMIN_EMAILS.some((a) => String(a).trim().toLowerCase() === clean);
}
