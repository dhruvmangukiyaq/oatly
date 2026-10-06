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
  // 0.50–0.63  bare shelving rises, furniture lands, plinths stand up
  rails: [0.5, 0.63],
  // 0.63–0.78  product lands on the bays, shelf by shelf
  clothes: [0.63, 0.78],
  // 0.78–0.88  island table, back shelf and the plinth pieces
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
    title: 'Shelves, before anything lands',
    sub: 'Bare bronze and oak come up out of the floor, and the furniture settles.',
  },
  {
    w: [0.66, 0.86],
    align: 'left',
    title: 'Then the shelves fill',
    sub: 'Carton by carton, tub by tub — then the watch wall fills.',
  },
  {
    w: [0.875, 1.08],
    align: 'left',
    title: 'The lights come up',
    sub: 'Pendant down, showroom on — everything in its place.',
  },
];

// Staged catalogue ids for the display set — every one is a real product in
// the catalogue, and each has a cutout WebP in public/images/store/<id>.webp
// built from that product's own photography, so what stands on the shelf is
// genuinely stock you can buy. Six guest brands anchor the premium end.
export const STORE_IDS = {
  // side bays — the house oat range, cartons and tubs, mixed by shelf level
  bay: [
    'chilled-oat-drink-barista-edition-1l',
    'oat-drink-matcha-1l',
    'oat-drink-barista-coconut-flavour-1l',
    'cold-foam-barista-1l',
    'soft-serve-1l',
    'creamy-oat-1l',
    'creamy-oat-spread-garden-herbs-150g',
    'creamy-oat-spread-tomato-basil-150g',
    'creamy-oat-spread-plain-150g',
    'oatgurt-strawberry-400g',
    'oat-drink-baristamatic-1-5l',
    'vanilla-custard-250ml',
    'oat-drink-matcha-strawberry-flavour-250ml',
    'oat-drink-matcha-250ml',
  ],
  // back-wall shelf unit, seen square on from the storefront
  shelf: [
    'chilled-oat-drink-barista-edition-1l',
    'cold-foam-barista-1l',
    'magnum-almond-80ml',
    'soft-serve-1l',
    'oatgurt-strawberry-400g',
  ],
  // the feature shelving under the sign — the watch wall. All 214 Titan
  // models are in the catalogue; these 18 are the ones whose packshot keys
  // cleanly into a cutout, so what stands on these shelves is genuinely stock
  // you can buy. Straight on to the storefront, so square photos read square.
  wall: [
    'titan-1584ym02',
    'titan-77146wl01',
    'titan-90197ap01k',
    'titan-7930pp24w',
    'titan-10063bm01',
    'titan-3278sm03',
    'titan-1802sl02',
    'titan-1595sl06',
    'titan-sp70007sl01',
    'titan-77163ym07w',
    'titan-77083sm01',
    'titan-38159wl01',
    'titan-3291sm02',
    'titan-1805wl03',
    'titan-1805wm02',
    'titan-679yl01',
    'titan-3273nm01',
    'titan-1843ym05',
  ],
  // the island table — house range alongside the guest brands
  table: [
    'chilled-oat-drink-barista-edition-1l',
    'godiva-truffles-15pc',
    'oat-drink-matcha-1l',
    'amedei-porcelana-50g',
    'creamy-oat-spread-garden-herbs-150g',
    'zara-vibrant-leather-eau-de-toilette',
  ],
  // two plinths at the front of the room, one guest piece each
  plinth: ['bleu-edt-spray-34', 'godiva-gold-15pc'],
};
