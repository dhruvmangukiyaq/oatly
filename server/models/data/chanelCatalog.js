// ─── BLEU DE CHANEL CATALOG ────────────────────────────────────────────────
// Bleu de Chanel line (brand: "Bleu de Chanel" by Chanel): parfum, eau de
// parfum, eau de toilette, twist & spray sets, deodorants and grooming
// essentials (18 products). Photos are user-supplied files in
// public/images/chanel/. Names are kept as plain product identifiers;
// descriptions below are fresh original copy (no brand text copied).
// Wired into productCategories in siteData.js.

const C = (id, name, volume, price, image, blurb) => ({
  id,
  name,
  slug: id,
  brand: 'Bleu de Chanel',
  volume,
  price,
  mrp: price,
  tagline: 'Citrus-woody fragrance for men.',
  description: blurb,
  image: `/images/chanel/${image}`,
});

export const CHANEL_CATEGORIES = [
  {
    slug: 'bleu-de-chanel',
    name: 'Bleu de Chanel',
    tagline: 'Citrus-woody fragrance for men.',
    description: 'Bleu de Chanel line — parfum, eau de parfum, eau de toilette, deodorants and grooming essentials.',
    color: 'bg-[#0F1E3D] text-white',
    badge: 'FOR MEN',
    items: [
      C('bleu-parfum-spray-34', 'Bleu de Chanel Parfum Spray', '3.4 fl oz', 165, 'parfum-spray.avif', 'Concentrated parfum spray, long-lasting.'),
      C('bleu-edp-spray-34', 'Bleu de Chanel Eau de Parfum Spray', '3.4 fl oz', 145, 'edp-spray.avif', 'Eau de parfum spray, bold and refined.'),
      C('bleu-edt-spray-34', 'Bleu de Chanel Eau de Toilette Spray', '3.4 fl oz', 125, 'edt-spray.avif', 'Eau de toilette spray, fresh and crisp.'),
      C('bleu-lexclusif-54', "Bleu de Chanel L'Exclusif Parfum", '5.4 fl oz', 220, 'lexclusif.avif', 'Exclusive large-format parfum spray.'),
      C('bleu-parfum-twist-set', 'Bleu de Chanel Parfum Twist & Spray Set', '3 x 0.7 fl oz', 120, 'parfum-twist-set.avif', 'Refillable twist case with three refills.'),
      C('bleu-edp-twist-set', 'Bleu de Chanel EDP Twist & Spray Set', '3 x 0.7 fl oz', 110, 'edp-twist-set.avif', 'Refillable twist case with three refills.'),
      C('bleu-edp-twist-refills', 'Bleu de Chanel EDP Twist Refill Trio', '3 x 0.7 fl oz', 75, 'edp-twist-refills.avif', 'Three twist refills for on-the-go.'),
      C('bleu-edt-twist-set', 'Bleu de Chanel EDT Twist & Spray Set', '3 x 0.7 fl oz', 105, 'edt-twist-set.avif', 'Refillable twist case with three refills.'),
      C('bleu-edt-twist-refills', 'Bleu de Chanel EDT Twist Refill Trio', '3 x 0.7 fl oz', 70, 'edt-twist-refills.avif', 'Three twist refills for on-the-go.'),
      C('bleu-minis-trio', 'Bleu de Chanel Minis Trio', '3 x 0.7 fl oz', 65, 'minis-trio.avif', 'Three miniature sprays, travel-ready.'),
      C('bleu-deodorant-spray-34', 'Bleu de Chanel Deodorant Spray', '3.4 fl oz', 45, 'deodorant-spray.avif', 'Fragranced deodorant spray.'),
      C('bleu-deodorant-stick-2oz', 'Bleu de Chanel Deodorant Stick', '2 oz', 35, 'deodorant-stick.avif', 'Fragranced deodorant stick.'),
      C('bleu-after-shave-34', 'Bleu de Chanel After-Shave Lotion', '3.4 fl oz', 70, 'after-shave.avif', 'Soothing after-shave lotion.'),
      C('bleu-shower-gel-68', 'Bleu de Chanel Shower Gel', '6.8 fl oz', 60, 'shower-gel.avif', 'Fragranced shower gel.'),
      C('bleu-all-over-spray-34', 'Bleu de Chanel All-Over Spray', '3.4 fl oz', 65, 'all-over-spray.avif', 'Light all-over body spray.'),
      C('bleu-cleansing-gel-34', 'Bleu de Chanel 2-in-1 Cleansing Gel', '3.4 fl oz', 55, 'cleansing-gel.avif', 'Face and body cleansing gel.'),
      C('bleu-moisturizer-3oz', 'Bleu de Chanel 3-in-1 Moisturizer', '3 fl oz', 60, 'moisturizer.avif', 'Face, beard and body moisturizer.'),
      C('bleu-hair-care-32', 'Bleu de Chanel Fragranced Hair Care', '3.2 fl oz', 55, 'hair-care.avif', 'Fragranced hair care fluid.'),
    ],
  },
];
