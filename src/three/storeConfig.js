// ─── STORE CONFIG — shared constants for the scroll-built store hero ────────
// Lives outside the component files on purpose: the scroll loop (StoreHero)
// writes PROG while the scene (StoreStage) reads it every frame — a module
// singleton keeps that path free of React state, re-renders and prop drilling.
// The editorial captions live here too, so the DOM copy and the 3D build are
// driven by ONE timeline and can never drift apart.

// The single source of scroll truth: smoothed 0→1 journey progress.
export const PROG = { p: 0, invalidate: null };

// ── MASTER CONSTRUCTION TIMELINE ─────────────────────────────────────────────
// Every stage is a window on the same 0→1 scroll axis. The scene reads these
// (never hard-coded numbers), so re-tuning the story is one edit here.
// Down-scroll = 0→1 builds the store; up-scroll reverses it exactly, because
// every value downstream is a pure function of PROG.p.
export const TL = {
  // 0.00–0.10  empty room: floor base, bare walls, ceiling, soft light
  empty: [0.0, 0.1],
  // 0.10–0.22  the wood finish lays itself in, strip by strip
  floor: [0.1, 0.22],
  // 0.22–0.38  uprights rise, cross-beams slide in, ceiling frames lower
  frame: [0.22, 0.38],
  // 0.38–0.50  cabinets, drawers, wall panels, trays, shelving
  storage: [0.38, 0.5],
  // 0.50–0.63  bare rails rise, furniture lands, dress forms stand up
  rails: [0.5, 0.63],
  // 0.63–0.78  garments drop onto the rails, rack by rack
  clothes: [0.63, 0.78],
  // 0.78–0.88  shelf stock, folded stacks, garments on the forms
  goods: [0.78, 0.88],
  // 0.88–0.96  downlights, track heads, pendant — the room warms up
  light: [0.88, 0.96],
  // 0.96–1.00  hotspots + the finished showroom composition
  final: [0.96, 1.0],
};

// ── EDITORIAL CAPTIONS ───────────────────────────────────────────────────────
// The reference's storytelling device: one serif line + one small paragraph
// that swaps as the room builds. Original copy, written for this store.
// w = [enter, exit] on the same 0→1 axis; align picks the composition.
// Each window sits on its stage (see TL) with a short empty beat between
// beats, so one caption fully leaves before the next arrives — they never
// cross-fade across two different screen positions.
// StoreHero writes opacity/transform straight to the DOM from its rAF loop —
// no React state on the scroll path.
export const CAPTIONS = [
  {
    w: [-0.05, 0.23],
    align: 'center',
    title: 'It starts with the room',
    sub: 'Empty walls, good light — and a floor that lays itself in, strip by strip.',
  },
  {
    w: [0.25, 0.355],
    align: 'left',
    title: 'Structure comes first',
    sub: 'Bronze uprights rise floor to ceiling, before a single piece arrives.',
  },
  {
    w: [0.37, 0.535],
    align: 'left',
    title: 'Storage finds its place',
    sub: 'Cabinets, drawers, trays and shelving slide into the walls.',
  },
  {
    w: [0.55, 0.645],
    align: 'left',
    title: 'Rails, before anything hangs',
    sub: 'Bare metal comes up out of the floor and the furniture lands.',
  },
  {
    w: [0.66, 0.86],
    align: 'left',
    title: 'Then the rails fill',
    sub: 'Garment by garment, from the collection you can actually shop.',
  },
  {
    w: [0.875, 1.08],
    align: 'left',
    title: 'The lights come up',
    sub: 'Pendant down, showroom on — everything in its place.',
  },
];

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
