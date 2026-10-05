// ─── STORE CONFIG — shared constants for the scroll-built store hero ────────
// Lives outside the component files on purpose: the scroll loop (StoreHero)
// writes PROG while the scene (StoreStage) reads it every frame — a module
// singleton keeps that path free of React state, re-renders and prop drilling.

// The single source of scroll truth: smoothed 0→1 journey progress.
export const PROG = { p: 0, invalidate: null };

// Staged catalogue ids for the display set (must match the cutout WebPs in
// public/images/store/<id>.webp, built from the real catalogue images).
export const STORE_IDS = {
  // left rack — men's pieces, back to front
  men: [
    'zara-oversized-leather-look-shirt',
    'zara-corduroy-shirt-jacket',
    'zara-grey-tailored-blazer',
    'zara-ringer-neck-t-shirt',
    'zara-ribbed-knit-sweater',
    'zara-worker-jacket',
    'zara-distressed-straight-jeans',
    'zara-oxford-button-down-shirt',
    'zara-striped-embroidered-shirt',
    'mufti-plum-chevron-slim-fit-flatknit',
    'mufti-rust-viscose-floral-print-shirt',
    'zara-wide-leg-brown-trousers',
    'mufti-peach-flow-linen-solid-shirt',
  ],
  // right rack — women's pieces
  women: [
    'zara-animal-print-tulle-dress',
    'zara-mini-dress-with-tulle-cape-detail',
    'zara-striped-shirt',
    'zara-oversized-double-breasted-blazer',
    'zara-velvet-jacket-with-embroidery',
    'zara-balloon-pleat-trousers',
    'zara-midi-dress-with-draped-detail',
    'zara-contrast-stripe-soft-sweatshirt',
    'zara-pleated-short-dress',
    'zara-z1975-high-waist-regular-long-length-jeans',
    'zara-satin-midi-skirt',
  ],
  // back-wall shelf products
  shelf: [
    'cold-foam-barista-1l',
    'soft-serve-1l',
    'creamy-oat-spread-garden-herbs-150g',
    'creamy-oat-spread-tomato-basil-150g',
  ],
};
