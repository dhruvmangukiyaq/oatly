// ─── Product placeholder imagery (free-to-use Pexels photos) ────────────────
// Used ONLY when a product item has no real photography yet (`item.image`).
// Source: https://www.pexels.com (free to use, no attribution required).
// Verified live (HTTP 200) on 2026-09-15. Served at w=800 for grid display.
// If a URL ever breaks, the <img onError> in ProductListing hides it and the
// card still renders its name label.

const px = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

export const CATEGORY_PLACEHOLDERS = {
  // Cold Foam → whipped-cream coffee (Pexels search: "soft serve")
  'cold-foam': px(34786516),
  // Soft Serve → ice cream scoops (Pexels search: "ice cream scoops")
  'soft-serve': px(7761650),
  // Spread → sandwich close-up (Pexels search: "bagel")
  spread: px(24796900),
  // Cooking → creamy mac and cheese (Pexels search: "pasta")
  cooking: px(32083398),
  // Chilled Oat Drinks → milk being poured (Pexels search: "oat milk")
  'chilled-oat-drink': px(1435446),
  // Oat Drink → milk splash (Pexels search: "oat milk")
  'oat-drink': px(28985887),
  // Oatgurt → yogurt bowl (Pexels search: "yogurt bowl")
  oatgurt: px(14864289),
  // Ice Cream → gelato tub (Pexels search: "ice cream scoops")
  'ice-cream': px(684968),
};

export function getPlaceholderForCategory(slug) {
  return CATEGORY_PLACEHOLDERS[slug] || CATEGORY_PLACEHOLDERS['oat-drink'];
}
