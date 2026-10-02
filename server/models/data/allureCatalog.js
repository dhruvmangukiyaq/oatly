// ─── ALLURE HOMME SPORT CATALOG ────────────────────────────────────────────
// Allure Homme Sport line (brand: "Allure Homme Sport"): cologne, eau de
// toilette, eau de parfum, twist & spray sets, deodorants and grooming
// essentials (14 products). Photos are user-supplied files in
// public/images/allure/. Names are kept as plain product identifiers;
// descriptions below are fresh original copy (no brand text copied).
// Wired into productCategories in siteData.js.

const A = (id, name, volume, price, image, blurb, brand = 'Allure Homme Sport', base = '/images/allure/') => ({
  id,
  name,
  slug: id,
  brand,
  volume,
  price,
  mrp: price,
  tagline: 'Energetic sport fragrance for men.',
  description: blurb,
  image: `${base}${image}`,
});

export const ALLURE_CATEGORIES = [
  {
    slug: 'allure-homme-sport',
    name: 'Allure Homme Sport',
    tagline: 'Energetic sport fragrance for men.',
    description: 'Allure Homme Sport line — cologne, eau de toilette, eau de parfum, twist sets, deodorants and grooming essentials.',
    color: 'bg-[#E8E4DA] text-oatly-black',
    badge: 'SPORT',
    items: [      A('allure-cologne-spray-34', 'Allure Homme Sport Cologne Spray', '3.4 fl oz', 110, 'cologne-spray.avif', 'Classic sport cologne spray.'),
      A('allure-cologne-twist-set', 'Allure Homme Sport Cologne Twist Set', '3 x 0.7 fl oz', 95, 'cologne-twist-set.avif', 'Refillable twist case with three refills.'),
      A('allure-edt-spray-34', 'Allure Homme Sport Eau de Toilette Spray', '3.4 fl oz', 115, 'edt-spray.avif', 'Eau de toilette spray, fresh and sharp.'),
      A('allure-edt-twist-set', 'Allure Homme Sport EDT Twist Set', '3 x 0.7 fl oz', 95, 'edt-twist-set.avif', 'Refillable twist case with three refills.'),
      A('allure-edt-twist-refills', 'Allure Homme Sport EDT Twist Refill Trio', '3 x 0.7 fl oz', 65, 'edt-twist-refills.avif', 'Three twist refills for on-the-go.'),
      A('allure-edp-twist-set', 'Allure Homme Sport EDP Twist Set', '3 x 0.7 fl oz', 100, 'edp-twist-set.avif', 'Refillable twist case with three refills.'),
      A('allure-eau-extreme-34', 'Allure Homme Sport Eau Extrême', '3.4 fl oz', 135, 'eau-extreme.avif', 'Intense eau extrême spray.'),
      A('allure-superleggera-34', 'Allure Homme Sport Superleggera', '3.4 fl oz', 150, 'superleggera.avif', 'Ultralight eau de parfum spray.'),
      A('allure-deodorant-spray-34', 'Allure Homme Sport Deodorant Spray', '3.4 fl oz', 40, 'deodorant-spray.avif', 'Fragranced deodorant spray.'),
      A('allure-deodorant-stick-2oz', 'Allure Homme Sport Deodorant Stick', '2 oz', 32, 'deodorant-stick.avif', 'Fragranced deodorant stick.'),
      A('allure-after-shave-34', 'Allure Homme Sport After-Shave Lotion', '3.4 fl oz', 60, 'after-shave-lotion.avif', 'Soothing after-shave lotion.'),
      A('allure-after-shave-moisturizer-34', 'Allure Homme Sport After-Shave Moisturizer', '3.4 fl oz', 62, 'after-shave-moisturizer.avif', 'Hydrating after-shave moisturizer.'),
      A('allure-shower-gel-68', 'Allure Homme Sport Shower Gel', '6.8 fl oz', 55, 'shower-gel.avif', 'Fragranced shower gel.'),
      A('allure-all-over-spray-34', 'Allure Homme Sport All-Over Spray', '3.4 fl oz', 58, 'all-over-spray.avif', 'Light all-over body spray.'),
    ],
  },
  {
    slug: 'allure-homme',
    name: 'Allure Homme',
    tagline: 'Timeless elegance in white and gold.',
    description: 'Allure Homme line — eau de toilette, blanche edition, deodorant, grooming and soap.',
    color: 'bg-[#F5F2EB] text-oatly-black',
    badge: 'CLASSIC',
    items: [
      A('allure-homme-after-shave-34', 'Allure Homme After Shave Lotion', '3.4 fl oz', 58, 'after-shave-lotion.avif', 'Soothing after shave lotion.', 'Allure Homme', '/images/allure-homme/'),
      A('allure-homme-moisturizer-34', 'Allure Homme After-Shave Moisturizer', '3.4 fl oz', 62, 'after-shave-moisturizer.avif', 'Hydrating after-shave moisturizer.', 'Allure Homme', '/images/allure-homme/'),
      A('allure-homme-all-over-34', 'Allure Homme All-Over Spray', '3.4 fl oz', 60, 'all-over-spray.avif', 'Light all-over body spray.', 'Allure Homme', '/images/allure-homme/'),
      A('allure-homme-deo-stick-2oz', 'Allure Homme Deodorant Stick', '2 oz', 32, 'deodorant-stick.avif', 'Fragranced deodorant stick.', 'Allure Homme', '/images/allure-homme/'),
      A('allure-homme-edt-34', 'Allure Homme Eau de Toilette Spray', '3.4 fl oz', 115, 'edt-spray.avif', 'Eau de toilette spray, warm and elegant.', 'Allure Homme', '/images/allure-homme/'),
      A('allure-homme-blanche-34', 'Allure Homme Édition Blanche EDP', '3.4 fl oz', 140, 'edition-blanche.avif', 'Bright blanche edition eau de parfum.', 'Allure Homme', '/images/allure-homme/'),
      A('allure-homme-soap-7oz', 'Allure Homme Soap', '7 oz', 25, 'soap.avif', 'Fragranced bath soap bar.', 'Allure Homme', '/images/allure-homme/'),
    ],
  },
];
