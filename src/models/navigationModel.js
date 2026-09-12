// ─── MODEL (MVC) ────────────────────────────────────────────────────────────
// Navigation structure. Previously hardcoded inside Navbar view —
// now owned by the Model so Controllers/Views stay dumb.

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
    path: '/recipes',
    dropdown: [
      { name: 'LOOK BOOK VOL. 3', path: '/recipes/look-book-vol-3', desc: 'Latest seasonal oat formulas' },
      { name: 'LOOK BOOK A/W 25', path: '/recipes/look-book-autumn-winter-2025', desc: 'Cozy autumn and winter sips' },
      { name: 'LOOK BOOK S/S 25', path: '/recipes/look-book-spring-summer-2025', desc: 'Refreshing spring & summer treats' },
      { name: 'Future Of Taste', path: '/things-we-do/initiatives/future-of-taste', desc: 'Experimental plant-based recipes' },
    ],
  },
  {
    name: 'NEWS',
    path: '/news',
    dropdown: [
      { name: 'Pee for the Planet', path: '/things-we-do/pee-for-the-planet', desc: 'Scandinavian nutrient recycling' },
      { name: 'Oatly x AVAVAV', path: '/things-we-do/oatly-x-avavav', desc: 'Runway fashion made from oats' },
      { name: 'Canadian F.A.R.M.', path: '/things-we-do/how-do-you-say-f-a-r-m-in-canadian', desc: 'Regenerative oat farming movement' },
      { name: 'Last First Dates', path: '/things-we-do/last-first-dates', desc: 'Dating culture & plant milk survey' },
      { name: 'EF Pro Bikers', path: '/things-we-do/ef-pro-cycling', desc: 'Tour de France fueled by oats' },
      { name: 'Oatly x Nespresso', path: '/things-we-do/nespresso', desc: 'Home cafe pod perfection' },
    ],
  },
  {
    name: 'SUSTAINABILITY',
    path: '/sustainability',
    dropdown: [
      { name: 'Oatly Who?', path: '/oatly-who', desc: 'Our mission and origin story' },
      { name: 'Sustainability Plan', path: '/oatly-who/sustainability-plan', desc: '4-pillar climate reduction strategy' },
      { name: 'Product Climate Footprint', path: '/oatly-who/sustainability-plan/climate-footprint-product-label', desc: 'Transparent CO2e labeling' },
      { name: 'Climate Solutions Company', path: '/sustainability/climate-solutions-company', desc: 'Why we exist as a company' },
    ],
  },
  { name: 'HEALTH', path: '/health', dropdown: null },
];

export function getNavItems() {
  return NAV_ITEMS;
}

const NavigationModel = { getNavItems, NAV_ITEMS };

export default NavigationModel;
