// ─── CHANEL COLLECTIONS CATALOG ────────────────────────────────────────────
// Les Eaux de Chanel, Égoïste, Pour Monsieur and Antaeus (brand per line).
// Photos are user-supplied files. Names are kept as plain product
// identifiers; descriptions below are fresh original copy (no brand text
// copied). Wired into productCategories in siteData.js.

const L = (brand, base) => (id, name, volume, price, image, blurb) => ({
  id,
  name,
  slug: id,
  brand,
  volume,
  price,
  mrp: price,
  tagline: 'Chanel fragrance wardrobe.',
  description: blurb,
  image: `/images/${base}/${image}`,
});

const eaux = L('Les Eaux de Chanel', 'eaux');
const ego = L('Égoïste', 'egoiste');
const pm = L('Pour Monsieur', 'pour-monsieur');
const ant = L('Antaeus', 'antaeus');

const CITIES = [
  ['biarritz', 'Biarritz'],
  ['deauville', 'Deauville'],
  ['edimbourg', 'Édimbourg'],
  ['paris', 'Paris'],
  ['riviera', 'Riviera'],
  ['venise', 'Venise'],
];

const eauxItems = CITIES.flatMap(([slug, city]) => [
  eaux(`eaux-${slug}-edt-42`, `Paris-${city} Eau de Toilette`, '4.2 fl oz', 95, `${slug}-edt.avif`, `Fresh coastal eau de toilette, ${city} edition.`),
  eaux(`eaux-${slug}-lotion-68`, `Paris-${city} Body Lotion`, '6.8 fl oz', 75, `${slug}-lotion.avif`, `Scented body lotion, ${city} edition.`),
  eaux(`eaux-${slug}-shower-68`, `Paris-${city} Shower Gel`, '6.8 fl oz', 65, `${slug}-shower.avif`, `Scented shower gel, ${city} edition.`),
]);

export const CHANEL_COLLECTION_CATEGORIES = [
  {
    slug: 'les-eaux-de-chanel',
    name: 'Les Eaux de Chanel',
    tagline: 'Fresh city-inspired eaux.',
    description: 'Les Eaux de Chanel — Paris, Biarritz, Venise, Riviera, Édimbourg and Deauville editions.',
    color: 'bg-[#E8F1F5] text-oatly-black',
    badge: 'FRESH',
    items: eauxItems,
  },
  {
    slug: 'egoiste',
    name: 'Égoïste',
    tagline: 'Bold and magnetic.',
    description: 'Égoïste and Platinum Égoïste — eau de toilette, deodorants and after-shave.',
    color: 'bg-[#1A1A1A] text-white',
    badge: 'BOLD',
    items: [
      ego('egoiste-edt-34', 'Égoïste Eau de Toilette Spray', '3.4 fl oz', 115, 'edt.avif', 'Bold spiced-wood eau de toilette.'),
      ego('egoiste-deo-stick-2oz', 'Égoïste Deodorant Stick', '2 oz', 32, 'deo-stick.avif', 'Fragranced deodorant stick.'),
      ego('egoiste-platinum-edt-34', 'Platinum Égoïste Eau de Toilette Spray', '3.4 fl oz', 115, 'platinum-edt.avif', 'Energizing aromatic eau de toilette.'),
      ego('egoiste-platinum-deo-spray-34', 'Platinum Égoïste Deodorant Spray', '3.4 fl oz', 42, 'platinum-deo-spray.avif', 'Fragranced deodorant spray.'),
      ego('egoiste-platinum-deo-stick-2oz', 'Platinum Égoïste Deodorant Stick', '2 oz', 32, 'platinum-deo-stick.avif', 'Fragranced deodorant stick.'),
      ego('egoiste-platinum-after-shave-34', 'Platinum Égoïste After-Shave Lotion', '3.4 fl oz', 65, 'platinum-after-shave.avif', 'Invigorating after-shave lotion.'),
    ],
  },
  {
    slug: 'pour-monsieur',
    name: 'Pour Monsieur',
    tagline: 'Timeless citrus elegance.',
    description: 'Pour Monsieur — eau de parfum, eau de toilette and deodorant.',
    color: 'bg-[#3A3A3A] text-white',
    badge: 'TIMELESS',
    items: [
      pm('pour-monsieur-edp-25', 'Pour Monsieur Eau de Parfum Spray', '2.5 fl oz', 130, 'edp.avif', 'Refined citrus eau de parfum.'),
      pm('pour-monsieur-edt-34', 'Pour Monsieur Eau de Toilette', '3.4 fl oz', 110, 'edt.avif', 'Classic citrus eau de toilette.'),
      pm('pour-monsieur-deo-stick-2oz', 'Pour Monsieur Deodorant Stick', '2 oz', 32, 'deo-stick.avif', 'Fragranced deodorant stick.'),
    ],
  },
  {
    slug: 'antaeus',
    name: 'Antaeus',
    tagline: 'Powerful and seductive.',
    description: 'Antaeus — eau de toilette and deodorant.',
    color: 'bg-[#4A2410] text-white',
    badge: 'INTENSE',
    items: [
      ant('antaeus-edt-34', 'Antaeus Eau de Toilette Spray', '3.4 fl oz', 110, 'edt.avif', 'Powerful leather-aromatic eau de toilette.'),
      ant('antaeus-deo-stick-2oz', 'Antaeus Deodorant Stick', '2 oz', 32, 'deo-stick.avif', 'Fragranced deodorant stick.'),
    ],
  },
];
