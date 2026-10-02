// ─── ICE CREAM PRESENTATION ─────────────────────────────────────────────────
// Merchandising fields (flavor/format/pack-size/price) + fresh copy for the
// Ice Cream category. Photos: ORIGINAL catalog packshots are kept (owner
// request) — local SVG illustrations in public/images/ice-cream/ stay only as
// automatic fallback when a product has no photo. Applied in siteData.js
// after the catalog merges, so backend + static fallback + detail pages share it.

export const ICE_CREAM_IMAGE_BASE = '/images/ice-cream';

export const ICE_CREAM_PRESENTATION = {
  // ── Oatara-style pints (500 ml) ──
  'ice-cream-chocolate-500ml': {
    flavor: 'Chocolate',
    format: 'Tubs',
    packSize: '500 ml',
    price: 5.99,
    mrp: 6.99,
    image: `${ICE_CREAM_IMAGE_BASE}/pint-chocolate.svg`,
    accent: '#4A2C1A',
    blurb: 'Dense cocoa frozen dessert, scooped straight from the pint.',
  },
  'ice-cream-salted-caramel-500ml': {
    flavor: 'Salted Caramel',
    format: 'Tubs',
    packSize: '500 ml',
    price: 6.29,
    mrp: 7.29,
    image: `${ICE_CREAM_IMAGE_BASE}/pint-caramel.svg`,
    accent: '#A8641F',
    blurb: 'Buttery caramel frozen dessert with a light sea-salt finish.',
  },
  'ice-cream-vanilla-500ml': {
    flavor: 'Vanilla',
    format: 'Tubs',
    packSize: '500 ml',
    price: 5.49,
    mrp: 6.49,
    image: `${ICE_CREAM_IMAGE_BASE}/pint-vanilla.svg`,
    accent: '#B89B5E',
    blurb: 'Classic vanilla-bean frozen dessert, smooth and spoonable.',
  },
  'ice-cream-strawberry-500ml': {
    flavor: 'Strawberry',
    format: 'Tubs',
    packSize: '500 ml',
    price: 5.79,
    mrp: 6.79,
    image: `${ICE_CREAM_IMAGE_BASE}/pint-strawberry.svg`,
    accent: '#E56B8C',
    blurb: 'Berry-swirled frozen dessert with a fresh fruit finish.',
  },
  'ice-cream-fudge-brownie': {
    flavor: 'Chocolate Fudge',
    format: 'Tubs',
    packSize: '1 Pint (473 ml)',
    price: 6.49,
    mrp: 7.49,
    image: `${ICE_CREAM_IMAGE_BASE}/pint-chocolate.svg`,
    accent: '#4A2C1A',
    blurb: 'Chocolate frozen dessert folded with fudge brownie pieces.',
  },

  // ── Bars, cones, kulfi, cups, sandwiches, sundaes ──
  'amul-epic-choco-almond-with-beligian-chocolate': {
    flavor: 'Chocolate Almond',
    format: 'Bars',
    packSize: '80 ml',
    price: 1.99,
    mrp: 2.49,
    image: `${ICE_CREAM_IMAGE_BASE}/bar-choco.svg`,
    accent: '#3A2317',
    blurb: 'Chocolate-coated bar with roasted almond crunch.',
  },
  'amul-chocolate-crackle-ice-cream': {
    flavor: 'Chocolate Crackle',
    format: 'Tubs',
    packSize: '540 g',
    price: 4.99,
    mrp: 5.99,
    image: `${ICE_CREAM_IMAGE_BASE}/pint-chocolate.svg`,
    accent: '#4A2C1A',
    blurb: 'Milk-chocolate frozen dessert with a crisp crackle layer.',
  },
  'amul-fruit-n-nut-fantasy': {
    flavor: 'Fruit & Nut',
    format: 'Tubs',
    packSize: '540 g',
    price: 4.99,
    mrp: 5.99,
    image: `${ICE_CREAM_IMAGE_BASE}/tub-fruity.svg`,
    accent: '#F0923C',
    blurb: 'Candied-fruit tub with cashew and raisin bites.',
  },
  'amul-ice-cream-sandwich-vanilla': {
    flavor: 'Vanilla Sandwich',
    format: 'Sandwich',
    packSize: '80 ml',
    price: 1.79,
    mrp: 2.19,
    image: `${ICE_CREAM_IMAGE_BASE}/sandwich-vanilla.svg`,
    accent: '#6B4226',
    blurb: 'Vanilla frozen layer pressed between soft cocoa biscuits.',
  },
  'amul-chocolate-brownie': {
    flavor: 'Chocolate Brownie',
    format: 'Tubs',
    packSize: '540 g',
    price: 6.49,
    mrp: 7.49,
    image: `${ICE_CREAM_IMAGE_BASE}/tub-fruity.svg`,
    accent: '#4A2C1A',
    blurb: 'Family tub with chewy brownie chunks throughout.',
  },
  'amul-chocolate-magic-sundae': {
    flavor: 'Chocolate Sundae',
    format: 'Sundae',
    packSize: '1 L',
    price: 6.49,
    mrp: 7.49,
    image: `${ICE_CREAM_IMAGE_BASE}/sundae-cup.svg`,
    accent: '#6B4226',
    blurb: 'Layered chocolate sundae tub with ripple sauce.',
  },
  'amul-butterscotch-gold': {
    flavor: 'Butterscotch',
    format: 'Cups',
    packSize: '69 g cup',
    price: 1.49,
    mrp: 1.79,
    image: `${ICE_CREAM_IMAGE_BASE}/tub-butterscotch.svg`,
    accent: '#C9962E',
    blurb: 'Single-serve butterscotch cup with caramel crunch.',
  },
  'amul-black-currant-tri-cone': {
    flavor: 'Black Currant',
    format: 'Cones',
    packSize: '120 ml',
    price: 1.99,
    mrp: 2.49,
    image: `${ICE_CREAM_IMAGE_BASE}/cone-berry.svg`,
    accent: '#6E3FA3',
    blurb: 'Triple-scoop style cone with dark-berry swirl.',
  },
  'amul-chocochips-ice-cream': {
    flavor: 'Choco Chips',
    format: 'Tubs',
    packSize: '270 g',
    price: 3.49,
    mrp: 3.99,
    image: `${ICE_CREAM_IMAGE_BASE}/pint-chocolate.svg`,
    accent: '#4A2C1A',
    blurb: 'Everyday tub studded with tiny chocolate chips.',
  },
  'amul-vanilla-royale': {
    flavor: 'Vanilla Royale',
    format: 'Tubs',
    packSize: '405 g',
    price: 3.99,
    mrp: 4.79,
    image: `${ICE_CREAM_IMAGE_BASE}/pint-vanilla.svg`,
    accent: '#B89B5E',
    blurb: 'Rich vanilla tub for sundaes, shakes and scoops.',
  },
  'amul-butterscotch-bliss': {
    flavor: 'Butterscotch Bliss',
    format: 'Tubs',
    packSize: '750 ml',
    price: 5.49,
    mrp: 6.49,
    image: `${ICE_CREAM_IMAGE_BASE}/tub-butterscotch.svg`,
    accent: '#C9962E',
    blurb: 'Large butterscotch tub with praline pieces.',
  },
  'amul-pista-malai-kulfi': {
    flavor: 'Pista Malai Kulfi',
    format: 'Kulfi',
    packSize: '60 ml',
    price: 1.29,
    mrp: 1.59,
    image: `${ICE_CREAM_IMAGE_BASE}/kulfi-pista.svg`,
    accent: '#5A7A44',
    blurb: 'Creamy pista kulfi on a stick, lightly sweetened.',
  },
  'amul-tender-coconut': {
    flavor: 'Tender Coconut',
    format: 'Cups',
    packSize: '67 g cup',
    price: 1.49,
    mrp: 1.79,
    image: `${ICE_CREAM_IMAGE_BASE}/cup-coconut.svg`,
    accent: '#4E7A5E',
    blurb: 'Light coconut cup with real tender-coconut pulp.',
  },
  'amul-sundae-gudbud': {
    flavor: 'Gudbud Sundae',
    format: 'Sundae',
    packSize: '125 ml',
    price: 2.49,
    mrp: 2.99,
    image: `${ICE_CREAM_IMAGE_BASE}/sundae-cup.svg`,
    accent: '#C0392B',
    blurb: 'Multi-layer sundae cup with fruit, nuts and sauce.',
  },
  'amul-rajbhog': {
    flavor: 'Rajbhog',
    format: 'Tubs',
    packSize: '540 g',
    price: 6.49,
    mrp: 7.49,
    image: `${ICE_CREAM_IMAGE_BASE}/tub-fruity.svg`,
    accent: '#D99A4E',
    blurb: 'Festive saffron-kesar tub with pistachio notes.',
  },
  'magnum-chocolate-truffle-80ml': {
    flavor: 'Chocolate Truffle',
    format: 'Bars',
    packSize: '80 ml',
    price: 2.79,
    mrp: 3.29,
    image: '/images/magnum/truffle.avif',
    accent: '#3A2317',
    blurb: 'Cracking chocolate shell over a smooth truffle centre.',
  },
  'magnum-almond-80ml': {
    flavor: 'Almond',
    format: 'Bars',
    packSize: '80 ml',
    price: 2.99,
    mrp: 3.49,
    image: '/images/magnum/almond.avif',
    accent: '#8A5A33',
    blurb: 'Roasted almond pieces in a chocolate-coated bar.',
  },
  'magnum-brownie-80ml': {
    flavor: 'Brownie',
    format: 'Bars',
    packSize: '80 ml',
    price: 2.79,
    mrp: 3.29,
    image: '/images/magnum/brownie.avif',
    accent: '#4A2C1A',
    blurb: 'Chewy brownie bits inside a chocolate-coated bar.',
  },
};

// Fallback presentation for any future ice-cream SKU (keyword-matched).
export function fallbackPresentation(product = {}) {
  const name = `${product.name || ''} ${product.id || ''}`.toLowerCase();
  const pick = (re, image, flavor, format, accent) =>
    re.test(name) ? { image: `${ICE_CREAM_IMAGE_BASE}/${image}`, flavor, format, accent } : null;
  return (
    pick(/kulfi/, 'kulfi-pista.svg', 'Kulfi', 'Kulfi', '#5A7A44') ||
    pick(/cone/, 'cone-berry.svg', 'Cone', 'Cones', '#6E3FA3') ||
    pick(/coffee|mocha|cappuccino/, 'pint-caramel.svg', 'Coffee', 'Tubs', '#6B4226') ||
    pick(/sandwich/, 'sandwich-vanilla.svg', 'Sandwich', 'Sandwich', '#6B4226') ||
    pick(/sundae|gudbud/, 'sundae-cup.svg', 'Sundae', 'Sundae', '#C0392B') ||
    pick(/coconut/, 'cup-coconut.svg', 'Coconut', 'Cups', '#4E7A5E') ||
    pick(/butterscotch/, 'tub-butterscotch.svg', 'Butterscotch', 'Tubs', '#C9962E') ||
    pick(/strawberry|berry|currant/, 'pint-strawberry.svg', 'Berry', 'Tubs', '#E56B8C') ||
    pick(/vanilla/, 'pint-vanilla.svg', 'Vanilla', 'Tubs', '#B89B5E') ||
    pick(/caramel/, 'pint-caramel.svg', 'Caramel', 'Tubs', '#A8641F') ||
    pick(/bar|epic|stick/, 'bar-choco.svg', 'Chocolate Bar', 'Bars', '#3A2317') ||
    { image: `${ICE_CREAM_IMAGE_BASE}/pint-chocolate.svg`, flavor: 'Chocolate', format: 'Tubs', accent: '#4A2C1A' }
  );
}

// Apply presentation over raw ice-cream items. Keeps the product id, name,
// brand AND original photo intact; only merchandising fields get our fresh
// copy. Local SVG art is used solely as fallback for photo-less items.
export function applyIceCreamPresentation(items = []) {
  return (items || []).map((p) => {
    const key = String(p.id || '');
    const preset = ICE_CREAM_PRESENTATION[key];
    const fb = fallbackPresentation(p);
    const use = preset || fb;
    const packSize = (preset && preset.packSize) || p.volume || p.packSize || '';
    return {
      ...p,
      category: 'Ice Cream',
      flavor: (preset && preset.flavor) || fb.flavor,
      format: (preset && preset.format) || fb.format,
      packSize,
      volume: packSize || p.volume,
      price: preset && preset.price != null ? preset.price : p.price,
      mrp: preset && preset.mrp != null ? preset.mrp : p.mrp,
      image: p.image || use.image,
      accent: use.accent,
      tagline: (preset && preset.blurb) || p.tagline,
      description: (preset && preset.blurb) || p.description,
    };
  });
}
