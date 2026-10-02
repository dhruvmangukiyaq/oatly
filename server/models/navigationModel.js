// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// Navigation structure (single source of truth for the header menu).

export const NAV_ITEMS = [
  {
    name: 'PRODUCTS',
    path: '/products',
    dropdown: [
      { name: 'Ice Cream', path: '/products/ice-cream', desc: 'Tubs, bars, cones, kulfi & sundaes' },
    ],
  },
  {
    name: 'TASTEBUDS',
    path: '/recipes/look-book-vol-3',
    dropdown: [
      { name: 'LOOK BOOK VOL. 3', path: '/recipes/look-book-vol-3', desc: 'Latest seasonal oat formulas' },
      { name: 'LOOK BOOK A/W 25', path: '/recipes/look-book-autumn-winter-2025', desc: 'Cozy autumn and winter sips' },
      { name: 'LOOK BOOK S/S 25', path: '/recipes/look-book-spring-summer-2025', desc: 'Refreshing spring & summer treats' },
      { name: 'Future Of Taste', path: '/things-we-do/initiatives/future-of-taste', desc: 'Experimental plant-based recipes' },
    ],
  },
  {
    name: 'NEWS',
    path: '/things-we-do',
    dropdown: [
      { name: 'Pee for the Planet', path: '/things-we-do/initiatives/pee-for-the-planet', desc: 'Scandinavian nutrient recycling' },
      { name: 'Oatara x AVAVAV', path: '/things-we-do/oatara-x-avavav', desc: 'Runway fashion made from oats' },
      { name: 'How Do You Say F.A.R.M. in Canadian', path: '/things-we-do/how-do-you-say-f-a-r-m-in-canadian', desc: 'Regenerative oat farming movement' },
      { name: 'Last first dates', path: '/things-we-do/last-first-dates', desc: 'Dating culture & plant milk survey' },
      { name: 'EF Pro Bikers', path: '/things-we-do/ef-pro-cycling', desc: 'Tour de France fueled by oats' },
      { name: 'Tastes like Miami', path: '/things-we-do/tastes-like-miami', desc: 'Art Basel cafecito culture' },
      { name: 'Oatara x Nespresso', path: '/things-we-do/nespresso', desc: 'Home cafe pod perfection' },
    ],
  },
  {
    name: 'SUSTAINABILITY',
    path: '/sustainability',
    dropdown: [
      { name: 'Oatara Who?', path: '/oatara-who', desc: 'Our mission and origin story' },
      { name: "Oatara's Sustainability Plan", path: '/oatara-who/sustainability-plan', desc: '4-pillar climate reduction strategy' },
      { name: 'Product climate footprint', path: '/oatara-who/sustainability-plan/climate-footprint-product-label', desc: 'Transparent CO2e labeling' },
      { name: "We're a climate solutions company", path: '/sustainability/climate-solutions-company', desc: 'Why we exist as a company' },
    ],
  },
  // HEALTH has no dropdown — single direct link per spec.
  { name: 'HEALTH', path: '/health', dropdown: null },
];

export function getNavItems() {
  return NAV_ITEMS;
}
