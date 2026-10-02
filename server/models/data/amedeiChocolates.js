// ─── AMEDEI CHOCOLATES CATALOG ─────────────────────────────────────────────
// Amedei chocolate range (brand: "Amedei") mirroring the amedei.it/collections
// prodotti lineup: 50 g dark/milk/white bars, Prendimè bars, napolitains,
// pralines, spreads, baking drops and gift sets (52 products).
// Names are kept as plain product identifiers; descriptions below are fresh
// original copy (no brand text copied) and there are NO brand packshot images
// here — artwork comes from our local original SVGs in public/images/
// chocolates/. Wired into productCategories in siteData.js (new Chocolates
// family of categories).

const B = (id, name, volume, price, image, blurb) => ({
  id,
  name,
  slug: id,
  brand: 'Amedei',
  volume,
  price,
  mrp: price,
  tagline: 'Tuscan bean-to-bar chocolate.',
  description: blurb,
  image,
});

const BOX = '/images/chocolates/choc-box.svg';
const JAR = '/images/chocolates/choc-jar.svg';
const DROPS = '/images/chocolates/choc-drops.svg';
// Distinct original pack designs per line (no logos/text copied).
const P_FLORAL_CREAM = '/images/chocolates/pack-floral-cream.svg';
const P_FLORAL_DARK = '/images/chocolates/pack-floral-dark.svg';
const P_ORANGE = '/images/chocolates/pack-orange.svg';
const P_GREEN = '/images/chocolates/pack-green.svg';
const P_NAVY = '/images/chocolates/pack-navy.svg';
const P_CORAL = '/images/chocolates/pack-coral.svg';
const P_BLACK = '/images/chocolates/pack-black.svg';
const P_MILK = '/images/chocolates/pack-milk.svg';
const P_WHITE = '/images/chocolates/pack-white.svg';

export const AMEDEI_CATEGORIES = [
  {
    slug: 'chocolate-bars',
    name: 'Chocolate Bars',
    tagline: 'Single-origin dark, milk and white bars.',
    description: 'Amedei 50 g bars and Prendimè slabs — Tuscan bean-to-bar chocolate.',
    color: 'bg-[#4A2C1A] text-white',
    badge: 'BEAN TO BAR',
    items: [
      B('amedei-porcelana-50g', 'Amedei Porcelana', '50 g', 11.29, P_FLORAL_CREAM, 'Rare Porcelana cacao, 70% dark bar.'),
      B('amedei-toscano-black-80-50g', 'Amedei Toscano Black 80', '50 g', 6.49, P_ORANGE, '80% extra-dark bar, intense and smooth.'),
      B('amedei-toscano-black-100-50g', 'Amedei Toscano Black 100', '50 g', 6.49, P_GREEN, '100% unsweetened dark bar.'),
      B('amedei-venezuela-50g', 'Amedei Venezuela', '50 g', 7.49, P_NAVY, 'Single-origin Venezuelan cacao, 70% dark.'),
      B('amedei-grenada-50g', 'Amedei Grenada', '50 g', 7.49, P_CORAL, 'Single-origin Grenadian cacao, 70% dark.'),
      B('amedei-chuao-50g', 'Amedei Chuao', '50 g', 11.29, P_FLORAL_DARK, 'Single-origin Chuao cacao, 70% dark.'),
      B('amedei-acero-50g', 'Amedei Acero', '50 g', 11.29, P_FLORAL_DARK, 'Toscano 70% dark bar with a round finish.'),
      B('amedei-toscano-black-70-50g', 'Amedei Toscano Black 70', '50 g', 6.49, P_BLACK, 'The house 70% dark bar.'),
      B('amedei-toscano-black-90-50g', 'Amedei Toscano Black 90', '50 g', 6.49, P_BLACK, '90% extra-dark bar.'),
      B('amedei-blanco-de-criollo-50g', 'Amedei Blanco de Criollo', '50 g', 11.29, P_WHITE, 'White Criollo chocolate bar.'),
      B('amedei-ecuador-50g', 'Amedei Ecuador', '50 g', 7.49, P_BLACK, 'Single-origin Ecuadorian cacao, 70% dark.'),
      B('amedei-nove-50g', 'Amedei Nove', '50 g', 11.29, P_BLACK, 'Nine-cacao blend, 70% dark bar.'),
      B('amedei-madagascar-50g', 'Amedei Madagascar', '50 g', 7.49, P_BLACK, 'Single-origin Madagascan cacao, 70% dark.'),
      B('amedei-toscano-frutti-rossi-50g', 'Amedei Toscano Frutti Rossi', '50 g', 6.49, P_CORAL, '70% dark bar with red fruits.'),
      B('amedei-toscano-pistacchio-50g', 'Amedei Toscano Pistacchio', '50 g', 6.49, P_MILK, 'Milk chocolate bar with pistachio.'),
      B('amedei-toscano-latte-50g', 'Amedei Toscano Latte', '50 g', 6.49, P_MILK, 'Classic milk chocolate bar.'),
      B('amedei-toscano-gianduja-50g', 'Amedei Toscano Gianduja', '50 g', 6.49, P_MILK, 'Milk chocolate with hazelnut gianduja.'),
      B('amedei-toscano-nocciola-50g', 'Amedei Toscano Nocciola', '50 g', 6.49, P_MILK, 'Milk chocolate bar with hazelnuts.'),
      B('amedei-toscano-frutti-gialli-50g', 'Amedei Toscano Frutti Gialli', '50 g', 6.49, P_ORANGE, '70% dark bar with yellow fruits.'),
      B('amedei-toscano-bianco-50g', 'Amedei Toscano Bianco', '50 g', 6.49, P_WHITE, 'White chocolate bar.'),
      B('amedei-toscano-mandorla-50g', 'Amedei Toscano Mandorla', '50 g', 6.49, P_MILK, 'Milk chocolate bar with almonds.'),
      B('amedei-toscano-black-63-50g', 'Amedei Toscano Black 63', '50 g', 6.49, P_BLACK, '63% dark bar, smooth and balanced.'),
      B('amedei-prendime-black-70-500g', 'Amedei Prendimé Toscano Black 70 - 500g', '500 g', 29.99, P_BLACK, 'Extra-thick 500 g dark slab.'),
      B('amedei-prendime-fondente-nocciole-150g', 'Amedei Prendimé fondente con nocciole - 150g', '150 g', 11.99, P_BLACK, 'Dark slab with hazelnuts, 150 g.'),
      B('amedei-prendime-latte-nocciole-500g', 'Amedei Prendimé al latte con nocciole - 500g', '500 g', 29.99, P_MILK, 'Extra-thick 500 g milk slab with hazelnuts.'),
      B('amedei-prendime-latte-nocciola-150g', 'Amedei Prendimé al latte con nocciola - 150g', '150 g', 11.99, P_MILK, 'Milk slab with hazelnut, 150 g.'),
      B('amedei-prendime-fondente-mandorla-150g', 'Amedei Prendimé fondente con mandorla - 150g', '150 g', 11.99, P_BLACK, 'Dark slab with almonds, 150 g.'),
      B('amedei-prendime-black-70-150g', 'Amedei Prendimé Toscano Black 70 - 150g', '150 g', 11.99, P_BLACK, 'Extra-thick 150 g dark slab.'),
      B('amedei-prendime-fondente-mandorla-500g', 'Amedei Prendimé fondente con mandorla - 500g', '500 g', 29.99, P_BLACK, 'Extra-thick 500 g dark slab with almonds.'),
    ],
  },
  {
    slug: 'napolitains',
    name: 'Napolitains',
    tagline: 'Single-serve squares in gift boxes.',
    description: 'Amedei napolitains assortments — tasting boxes of single-origin squares.',
    color: 'bg-[#6B4226] text-white',
    badge: 'TASTING BOX',
    items: [
      B('amedei-fondenti-36-napolitains', 'Amedei I Fondenti - 36 Napolitains', '36 pcs', 27.99, BOX, 'Box of 36 dark napolitains.'),
      B('amedei-cru-36-napolitains', 'Amedei I Cru - 36 Napolitains', '36 pcs', 27.99, BOX, 'Box of 36 single-origin napolitains.'),
      B('amedei-selezione-porcelana-12', 'Amedei Selezione Porcelana - 12 Napolitains', '12 pcs', 12.99, BOX, 'Box of 12 Porcelana napolitains.'),
      B('amedei-selezione-neri-12', 'Amedei Selezione I Neri - 12 Napolitains', '12 pcs', 12.99, BOX, 'Box of 12 extra-dark napolitains.'),
      B('amedei-selezione-cru-12', 'Amedei Selezione I Cru - 12 Napolitains', '12 pcs', 11.99, BOX, 'Box of 12 single-origin napolitains.'),
      B('amedei-selezione-chuao-12', 'Amedei Selezione Chuao - 12 Napolitains', '12 pcs', 12.99, BOX, 'Box of 12 Chuao napolitains.'),
      B('amedei-selezione-classici-12', 'Amedei Selezione I Classici - 12 Napolitains', '12 pcs', 10.99, BOX, 'Box of 12 classic napolitains.'),
    ],
  },
  {
    slug: 'pralines',
    name: 'Pralines',
    tagline: 'Filled chocolate pralines.',
    description: 'Amedei praline assortments in gift boxes.',
    color: 'bg-[#8A5A33] text-white',
    badge: 'FILLED',
    items: [
      B('amedei-praline-16', 'Amedei Le Praline 16', '16 pcs', 29.99, BOX, 'Box of 16 assorted pralines.'),
      B('amedei-praline-5-gold', 'Amedei Le Praline 5 Gold', '5 pcs', 12.99, BOX, 'Box of 5 gold pralines.'),
      B('amedei-praline-5-orange', 'Amedei Le Praline 5 Orange', '5 pcs', 12.99, BOX, 'Box of 5 orange pralines.'),
    ],
  },
  {
    slug: 'spreads',
    name: 'Spreads & Creams',
    tagline: 'Spoonable hazelnut creams.',
    description: 'Amedei hazelnut cocoa spreads in jars.',
    color: 'bg-[#A8641F] text-white',
    badge: 'SPOONABLE',
    items: [
      B('amedei-crema-nocciola-black-200g', 'Amedei Crema Nocciola Black - 200g', '200 g', 11.99, JAR, 'Dark hazelnut spread, 200 g jar.'),
      B('amedei-crema-nocciola-200g', 'Amedei Crema Nocciola - 200g', '200 g', 11.99, JAR, 'Hazelnut cocoa spread, 200 g jar.'),
    ],
  },
  {
    slug: 'baking',
    name: 'Baking Chocolate',
    tagline: 'Drops and granella for baking.',
    description: 'Amedei baking drops and cocoa granella.',
    color: 'bg-[#5A4A2A] text-white',
    badge: 'FOR BAKING',
    items: [
      B('amedei-gocce-black-70', 'Amedei Gocce Toscano Black 70', '', 16.49, DROPS, 'Dark chocolate drops for baking.'),
      B('amedei-gocce-black-90', 'Amedei Gocce Toscano Black 90', '', 16.49, DROPS, 'Extra-dark chocolate drops for baking.'),
      B('amedei-gocce-latte', 'Amedei Gocce Toscano Latte', '', 16.49, DROPS, 'Milk chocolate drops for baking.'),
      B('amedei-granella', 'Amedei Granella', '', 16.49, DROPS, 'Cocoa nib granella for baking.'),
    ],
  },
  {
    slug: 'gifts',
    name: 'Gift Sets',
    tagline: 'Prestige collections and gift boxes.',
    description: 'Amedei gift collections — tasting sets and prestige boxes.',
    color: 'bg-[#2E1A10] text-white',
    badge: 'GIFT SET',
    items: [
      B('amedei-icona', 'Amedei Icona', 'Gift set', 64.99, BOX, 'Prestige signature gift set.'),
      B('amedei-fabbrica', 'Amedei Fabbrica', 'Gift box', 72.99, BOX, 'Chocolate factory gift box.'),
      B('amedei-viaggio', 'Amedei Viaggio', 'Gift set', 189.99, BOX, 'Grand tasting journey set.'),
      B('amedei-appunti-cioccolato', 'Amedei Appunti di Cioccolato', 'Gift set', 114.99, BOX, 'Chocolate tasting notes set.'),
      B('amedei-snack-box', 'Amedei Toscano Snack Box', 'Gift box', 48.99, BOX, 'Assorted chocolate snack box.'),
      B('amedei-box-mini-classici', 'Amedei Box Mini Tavolette I Classici', 'Gift box', 94.99, BOX, 'Box of 20 g classic mini bars.'),
      B('amedei-box-mini-frutti', 'Amedei Box Mini Tavolette I Frutti', 'Gift box', 94.99, BOX, 'Box of 20 g fruit mini bars.'),
    ],
  },
];
