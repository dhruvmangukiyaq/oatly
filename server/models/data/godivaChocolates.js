// ─── GODIVA CHOCOLATES CATALOG ─────────────────────────────────────────────
// Godiva chocolate range (brand: "Godiva") from user-provided product photos:
// Signature mini bars, Pistachio & Kadayif bar sets, Goldmark assortments,
// Truffles collections and Birthday gift boxes (19 products).
// Names are kept as plain product identifiers; descriptions below are fresh
// original copy (no brand text copied). Photos are user-supplied files in
// public/images/godiva/. Wired into productCategories in siteData.js.

const G = (id, name, volume, price, image, blurb, hover = null) => ({
  id,
  name,
  slug: id,
  brand: 'Godiva',
  volume,
  price,
  mrp: price,
  tagline: 'Belgian chocolate assortments.',
  description: blurb,
  image: `/images/godiva/${image}`,
  ...(hover ? { hoverImage: `/images/godiva/${hover}` } : {}),
});

export const GODIVA_CATEGORIES = [
  {
    slug: 'godiva-bars',
    name: 'Godiva Bars',
    tagline: 'Signature mini bars and filled bar sets.',
    description: 'Godiva Signature mini bars and Pistachio & Kadayif bar sets.',
    color: 'bg-[#0F1E3D] text-white',
    badge: 'SIGNATURE',
    items: [
      G('godiva-signature-milk-minibars', 'Godiva Signature Milk Mini Bars', '', 9.99, 'signature-milk.webp', 'Creamy milk chocolate mini bars.'),
      G('godiva-signature-milk-caramel-minibars', 'Godiva Signature Milk Caramel Mini Bars', '', 9.99, 'signature-milk-caramel.webp', 'Milk chocolate mini bars with caramel.'),
      G('godiva-minibars-dark-almond-8pc', 'Godiva Mini Bars Dark Almond 8pc', '8 pcs', 12.99, 'minibars-dark-almond.webp', 'Dark chocolate mini bars with almond, box of 8.'),
      G('godiva-minibars-dark-seasalt-8pc', 'Godiva Mini Bars Dark Sea Salt 8pc', '8 pcs', 12.99, 'minibars-dark-seasalt.webp', 'Dark chocolate mini bars with sea salt, box of 8.'),
      G('godiva-minibars-milk-8pc', 'Godiva Mini Bars Milk Chocolate 8pc', '8 pcs', 12.99, 'minibars-milk.webp', 'Milk chocolate mini bars, box of 8.'),
      G('godiva-minibars-salted-caramel-8pc', 'Godiva Mini Bars Salted Caramel 8pc', '8 pcs', 12.99, 'minibars-salted-caramel.webp', 'Salted caramel mini bars, box of 8.'),
      G('godiva-pistachio-kadayif-set', 'Godiva Pistachio & Kadayif Bars Set', '5 bars', 24.99, 'pistachio-kadayif-set.webp', 'Milk and dark pistachio kadayif bars, set of 5.'),
      G('godiva-pistachio-kadayif-dark-set', 'Godiva Dark Pistachio & Kadayif Bars Set', '5 bars', 24.99, 'pistachio-kadayif-dark-set.webp', 'Dark pistachio kadayif bars, set of 5.'),
    ],
  },
  {
    slug: 'godiva-gifts',
    name: 'Godiva Gift Boxes',
    tagline: 'Assorted gift boxes for every occasion.',
    description: 'Godiva Goldmark, Truffles and Birthday gift boxes.',
    color: 'bg-[#2E1A10] text-white',
    badge: 'GIFT BOX',
    items: [
      G('godiva-gold-15pc', 'Godiva Gold Collection 15pc', '15 pcs', 29.99, 'gold-15pc.webp', 'Gold assortment, box of 15.', 'gold-15pc-open.webp'),
      G('godiva-gold-30pc', 'Godiva Gold Collection 30pc', '30 pcs', 49.99, 'gold-30pc.webp', 'Gold assortment, box of 30.', 'gold-30pc-tray.webp'),
      G('godiva-truffles-15pc', 'Godiva Truffles Collection 15pc', '15 pcs', 29.99, 'truffles-15pc.webp', 'Assorted truffles, box of 15.', 'truffles-15pc-tray.webp'),
      G('godiva-truffles-24pc', 'Godiva Truffles Collection 24pc', '24 pcs', 44.99, 'truffles-24pc.webp', 'Assorted truffles, box of 24.', 'truffles-24pc-tray.webp'),
      G('godiva-dark-truffles-15pc', 'Godiva Dark Truffles 15pc', '15 pcs', 29.99, 'dark-truffles-15pc.webp', 'Dark chocolate truffles, box of 15.', 'dark-truffles-15pc-tray.webp'),
      G('godiva-dark-truffles-24pc', 'Godiva Dark Truffles 24pc', '24 pcs', 44.99, 'dark-truffles-24pc.webp', 'Dark chocolate truffles, box of 24.', 'dark-truffles-24pc-tray.webp'),
      G('godiva-patisserie-15pc', 'Godiva Patisserie Truffles 15pc', '15 pcs', 29.99, 'patisserie-15pc.webp', 'Patisserie truffles, box of 15.', 'patisserie-15pc-tray.webp'),
      G('godiva-patisserie-24pc', 'Godiva Patisserie Truffles 24pc', '24 pcs', 49.99, 'patisserie-24pc.webp', 'Patisserie truffles, box of 24.', 'patisserie-24pc-tray.webp'),
      G('godiva-goldmark-18pc', 'Godiva Goldmark Cake-Inspired 18pc', '18 pcs', 34.99, 'goldmark-18pc.webp', 'Cake-inspired assortment, box of 18.', 'goldmark-18pc-tray.webp'),
      G('godiva-birthday-gold-15pc', 'Godiva Birthday Gold Gift Box 15pc', '15 pcs', 32.99, 'birthday-gold-15pc.webp', 'Birthday gold gift box of 15.', 'birthday-gold-15pc-tray.webp'),
      G('godiva-birthday-truffles-15pc', 'Godiva Birthday Truffles Gift Box 15pc', '15 pcs', 32.99, 'birthday-truffles-15pc.webp', 'Birthday truffles gift box of 15.', 'birthday-truffles-15pc-tray.webp'),
    ],
  },
];
