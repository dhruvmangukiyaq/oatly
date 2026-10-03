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
      { name: 'Ice Cream', path: '/products/ice-cream', desc: 'Tubs, bars, cones, kulfi & sundaes' },
      { name: 'Chocolate Bars', path: '/products/chocolate-bars', desc: 'Single-origin dark, milk and white bars' },
      { name: 'Napolitains', path: '/products/napolitains', desc: 'Single-serve tasting squares' },
      { name: 'Godiva Bars', path: '/products/godiva-bars', desc: 'Signature mini bars and bar sets' },
      { name: 'Godiva Gift Boxes', path: '/products/godiva-gifts', desc: 'Assorted gift boxes' },
      { name: 'Bleu de Chanel', path: '/products/bleu-de-chanel', desc: 'Citrus-woody fragrance for men' },
      { name: 'Allure Homme Sport', path: '/products/allure-homme-sport', desc: 'Energetic sport fragrance' },
      { name: 'Allure Homme', path: '/products/allure-homme', desc: 'Timeless elegance in white and gold' },
      { name: 'Les Exclusifs de Chanel', path: '/products/les-exclusifs', desc: 'Rare, storied compositions' },
      { name: 'Les Eaux de Chanel', path: '/products/les-eaux-de-chanel', desc: 'Fresh city-inspired eaux' },
      { name: 'Égoïste', path: '/products/egoiste', desc: 'Bold and magnetic' },
      { name: 'Pour Monsieur', path: '/products/pour-monsieur', desc: 'Timeless citrus elegance' },
      { name: 'Antaeus', path: '/products/antaeus', desc: 'Powerful and seductive' },
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
];

export function getNavItems() {
  return NAV_ITEMS;
}
