// ─── PRODUCT SEARCH (shared smart matcher) ─────────────────────────────────
// Listing search must find products by ANY related wording — current catalog
// and anything added later. Handles:
//   - synonyms: perfume → parfum/cologne/fragrance…, deo → deodorant…,
//     icecream → ice cream… (spelling variants included)
//   - all text fields: name, brand (+house), category, tagline, description,
//     volume, flavor, format, pack size
//   - multi-word queries: EVERY word must match somewhere (AND)
// Matching is substring-based and case/punctuation-insensitive.

const SYNONYM_GROUPS = [
  ['perfume', 'perfumes', 'parfum', 'parfume', 'cologne', 'fragrance', 'fragrances', 'scent', 'scents', 'attar'],
  ['edp', 'parfum'],
  ['edt', 'parfum'],
  ['chocolate', 'chocolates', 'cocoa', 'choco'],
  ['icecream', 'kulfi', 'sundae', 'gelato'],
  ['deo', 'deodorant', 'deodorants'],
  ['soap', 'soaps'],
  ['cream', 'creams', 'creme', 'cremes'],
  ['bar', 'bars'],
  ['box', 'boxes'],
  ['gift', 'gifts'],
  ['stick', 'sticks'],
  ['spray', 'sprays'],
  ['lotion', 'lotions'],
  ['gel', 'gels'],
  ['oil', 'oils'],
  ['milk', 'milks'],
  ['drink', 'drinks'],
  ['yogurt', 'yogurts', 'oatgurt'],
];

const SYNONYMS = {};
SYNONYM_GROUPS.forEach((group) => {
  group.forEach((word) => {
    SYNONYMS[word] = group;
  });
});

// ── Brand houses: facet groups + search (chanel → all Chanel lines) ─────────
export const BRAND_GROUPS = {
  Chanel: ['Bleu de Chanel', 'Allure Homme Sport', 'Allure Homme', 'Les Exclusifs de Chanel', 'Les Eaux de Chanel', 'Égoïste', 'Pour Monsieur', 'Antaeus'],
};

export const BRAND_HOUSE = Object.fromEntries(
  Object.entries(BRAND_GROUPS).flatMap(([house, members]) => members.map((m) => [m, house])),
);

const normalize = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[_/\\-]+/g, ' ')
    .replace(/[^\p{L}\p{N} ]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    // glued/compound forms → single token (icecream/ice-cream/ice creams
    // all become one word, in query AND haystack alike)
    .replace(/\bice\s*creams?\b/g, 'icecream');

function tokenAlts(token) {
  const key = normalize(token);
  const group = SYNONYMS[key];
  return group ? group.map(normalize) : [key];
}

export function matchesProduct(p, query) {
  const tokens = normalize(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return true;
  // Plain substring match ONLY — never across word joints (no space-stripped
  // matching: "swirled to" must not become "edt").
  const hay = normalize(
    [p.name, p.brand, BRAND_HOUSE[p.brand], p.category, p.tagline, p.description, p.volume, p.flavor, p.format, p.packSize]
      .filter(Boolean)
      .join(' '),
  );
  return tokens.every((t) =>
    tokenAlts(t).some((a) => a && hay.includes(a)),
  );
}
