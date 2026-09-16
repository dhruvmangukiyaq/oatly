// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// Navigation structure (single source of truth for the header menu).

export const NAV_ITEMS = [
  {
    name: 'PRODUCTS',
    path: '/products',
    dropdown: [
      { name: 'Cold Foam', path: '/products/cold-foam', desc: 'Instant foam magic in a can' },
      { name: 'Soft Serve', path: '/products/soft-serve', desc: 'Plant-based soft serve perfection' },
      { name: 'Spread', path: '/products/spread', desc: 'Tangy oat schmear for bagels' },
      { name: 'Cooking', path: '/products/cooking', desc: 'Heavy cream alternative for cooking' },
      { name: 'Chilled Oat Drinks', path: '/products/chilled-oat-drink', desc: 'Fresh from the dairy aisle' },
      { name: 'Oat Drink', path: '/products/oat-drink', desc: 'The OG oat milk carton' },
      { name: 'Oatgurt', path: '/products/oatgurt', desc: 'Spoonable oat yogurt' },
      { name: 'Ice Cream', path: '/products/ice-cream', desc: 'Indulgent dairy-free pints' },
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
      { name: 'Pee for the Planet', path: '/things-we-do/pee-for-the-planet', desc: 'Scandinavian nutrient recycling' },
      { name: 'Oatly x AVAVAV', path: '/things-we-do/oatly-x-avavav', desc: 'Runway fashion made from oats' },
      { name: 'How Do You Say F.A.R.M. in Canadian', path: '/things-we-do/how-do-you-say-f-a-r-m-in-canadian', desc: 'Regenerative oat farming movement' },
      { name: 'Last first dates', path: '/things-we-do/last-first-dates', desc: 'Dating culture & plant milk survey' },
      { name: 'EF Pro Bikers', path: '/things-we-do/ef-pro-cycling', desc: 'Tour de France fueled by oats' },
      { name: 'Tastes like Miami', path: '/things-we-do/tastes-like-miami', desc: 'Art Basel cafecito culture' },
      { name: 'Oatly x Nespresso', path: '/things-we-do/nespresso', desc: 'Home cafe pod perfection' },
    ],
  },
  {
    name: 'SUSTAINABILITY',
    path: '/sustainability',
    dropdown: [
      { name: 'Oatly Who?', path: '/oatly-who', desc: 'Our mission and origin story' },
      { name: "Oatly's Sustainability Plan", path: '/oatly-who/sustainability-plan', desc: '4-pillar climate reduction strategy' },
      { name: 'Product climate footprint', path: '/oatly-who/sustainability-plan/climate-footprint-product-label', desc: 'Transparent CO2e labeling' },
      { name: "We're a climate solutions company", path: '/sustainability/climate-solutions-company', desc: 'Why we exist as a company' },
    ],
  },
  // HEALTH has no dropdown — single direct link per spec.
  { name: 'HEALTH', path: '/health', dropdown: null },
];

export function getNavItems() {
  return NAV_ITEMS;
}
