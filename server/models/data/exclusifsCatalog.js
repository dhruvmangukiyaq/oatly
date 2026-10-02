// ─── LES EXCLUSIFS DE CHANEL CATALOG ───────────────────────────────────────
// Les Exclusifs line (brand: "Les Exclusifs de Chanel"): eau de parfum,
// body oils, gentle oil and body cream (27 products). Photos are
// user-supplied files in public/images/exclusifs/. Names are kept as plain
// product identifiers; descriptions below are fresh original copy (no brand
// text copied). Wired into productCategories in siteData.js.

const E = (id, name, volume, price, image, blurb, hover = null) => ({
  id,
  name,
  slug: id,
  brand: 'Les Exclusifs de Chanel',
  volume,
  price,
  mrp: price,
  tagline: 'Rare, storied compositions.',
  description: blurb,
  image: `/images/exclusifs/${image}`,
  ...(hover ? { hoverImage: `/images/exclusifs/${hover}` } : {}),
});

export const EXCLUSIFS_CATEGORIES = [
  {
    slug: 'les-exclusifs',
    name: 'Les Exclusifs de Chanel',
    tagline: 'Rare, storied compositions.',
    description: 'Les Exclusifs de Chanel — eau de parfum, body oils and creams.',
    color: 'bg-[#111111] text-white',
    badge: 'EXCEPTIONAL',
    items: [
      E('exclusifs-comete', 'Les Exclusifs Comète', '75 ml', 230, 'comete.webp', 'Luminous floral musk.'),
      E('exclusifs-le-lion', 'Les Exclusifs Le Lion de Chanel', '75 ml', 230, 'le-lion.webp', 'Ambery, radiant character.'),
      E('exclusifs-coromandel', 'Les Exclusifs Coromandel', '75 ml', 230, 'coromandel.webp', 'Opulent oriental woods.'),
      E('exclusifs-sycomore', 'Les Exclusifs Sycomore', '75 ml', 230, 'sycomore.webp', 'Smoky vetiver woods.'),
      E('exclusifs-gardenia', 'Les Exclusifs Gardénia', '75 ml', 230, 'gardenia.webp', 'Velvety white florals.'),
      E('exclusifs-beige', 'Les Exclusifs Beige', '75 ml', 230, 'beige.webp', 'Warm honeyed florals.'),
      E('exclusifs-no22', 'Les Exclusifs N°22', '75 ml', 230, 'no22.webp', 'Aldehydic floral classic.'),
      E('exclusifs-bois-des-iles', 'Les Exclusifs Bois des Iles', '75 ml', 230, 'bois-des-iles.webp', 'Creamy sandalwood warmth.'),
      E('exclusifs-jersey', 'Les Exclusifs Jersey', '75 ml', 230, 'jersey.webp', 'Soft lavender fields.'),
      E('exclusifs-cuir-de-russie', 'Les Exclusifs Cuir de Russie', '75 ml', 230, 'cuir-de-russie.webp', 'Smoked leather flowers.'),
      E('exclusifs-1932', 'Les Exclusifs 1932', '75 ml', 230, '1932.webp', 'Sparkling jasmine bouquet.'),
      E('exclusifs-misia', 'Les Exclusifs Misia', '75 ml', 230, 'misia.webp', 'Powdery violet rose.'),
      E('exclusifs-la-pausa', 'Les Exclusifs La Pausa', '75 ml', 230, 'la-pausa.webp', 'Mediterranean iris glow.'),
      E('exclusifs-bel-respiro', 'Les Exclusifs Bel Respiro', '75 ml', 230, 'bel-respiro.webp', 'Green garden freshness.'),
      E('exclusifs-boy', 'Les Exclusifs Boy', '75 ml', 230, 'boy.webp', 'Daring lavender geranium.'),
      E('exclusifs-rue-cambon-31', 'Les Exclusifs 31 Rue Cambon', '75 ml', 230, 'rue-cambon-31.webp', 'Chypre in its purest form.'),
      E('exclusifs-no18', 'Les Exclusifs N°18', '75 ml', 230, 'no18.webp', 'Sculpted ambrette seeds.'),
      E('exclusifs-eau-de-cologne', 'Les Exclusifs Eau de Cologne', '75 ml', 190, 'eau-de-cologne.webp', 'Citrus cologne, crisp and bright.'),
      E('exclusifs-1957', 'Les Exclusifs 1957', '75 ml', 230, '1957.webp', 'White musk luminosity.', '1957-alt.webp'),
      E('exclusifs-sycomore-huile', 'Les Exclusifs Sycomore Huile', '', 160, 'sycomore-huile.webp', 'Silky vetiver body oil.'),
      E('exclusifs-coromandel-huile', 'Les Exclusifs Coromandel Huile', '', 160, 'coromandel-huile.webp', 'Silky oriental body oil.'),
      E('exclusifs-gardenia-huile', 'Les Exclusifs Gardénia Huile', '', 160, 'gardenia-huile.webp', 'Silky floral body oil.'),
      E('exclusifs-beige-huile', 'Les Exclusifs Beige Huile', '', 160, 'beige-huile.webp', 'Silky honeyed body oil.'),
      E('exclusifs-comete-huile', 'Les Exclusifs Comète Huile', '', 160, 'comete-huile.webp', 'Silky musky body oil.'),
      E('exclusifs-le-lion-huile', 'Les Exclusifs Le Lion Huile', '', 160, 'le-lion-huile.webp', 'Silky ambery body oil.'),
      E('exclusifs-huile-douce', 'Les Exclusifs Huile Douce', '8.4 fl oz', 95, 'huile-douce.avif', 'Gentle oil for hair and body.'),
      E('exclusifs-body-cream', 'Les Exclusifs Fresh Body Cream', '5 oz', 85, 'body-cream.avif', 'Fresh scented body cream.'),
    ],
  },
];
