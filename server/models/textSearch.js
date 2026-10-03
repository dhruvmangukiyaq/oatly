// ─── SHARED TEXT MATCHING (server + client) ─────────────────────────────────
// ONE matcher for every search surface, so the results agree word for word:
//   - the search modal   → /api/search → searchModel → filterProducts (here)
//   - the listing box    → src/utils/productSearch.js (imports this file)
//   - the ice-cream grid → same helper
// Pure functions, no Node or DOM APIs — src/ imports it the same way
// src/api/staticFallback.js already imports the server models.
//
// Behaviour:
//   - synonyms: "perfume" also matches parfum / cologne / fragrance / edp /
//     edt, "yogurt" matches oatgurt, "deo" matches deodorant — spelling and
//     plural variants included
//   - multi-word queries: EVERY word must match somewhere (AND)
//   - case / punctuation-insensitive, plain substring — never across word
//     joints ("swirled to" must not become "edt"); multi-word synonyms must
//     sit ON a joint ("t shirt" finds "T-Shirt", not "...crest shirt")

const SYNONYM_GROUPS = [
  ['perfume', 'perfumes', 'parfum', 'parfume', 'cologne', 'fragrance', 'fragrances', 'scent', 'scents', 'attar'],
  ['edp', 'eau de parfum', 'parfum'],
  ['edt', 'eau de toilette', 'parfum'],
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
  // footwear: "shoes" must find sneakers / boots / loafers / heels too —
  // product names carry the style word ("Sneakers"), the copy says "footwear",
  // and nobody writes "shoes" in either. NOTE: plural "sandals" only — the
  // singular is a substring of "sandalwood" and pulls in fragrances.
  ['shoe', 'shoes', 'sneaker', 'sneakers', 'trainer', 'trainers', 'boot', 'boots', 'loafer', 'loafers', 'driver', 'drivers', 'heel', 'heels', 'sandals', 'slipper', 'slippers', 'slingback', 'derby', 'footwear'],
  // tee: "tee" must find every "T-Shirt" — names normalize to "t shirt", so
  // the bare word "tee" never appears in half the products.
  ['tee', 'tees', 't-shirt', 'tshirts'],
  ['gel', 'gels'],
  ['oil', 'oils'],
  ['milk', 'milks', 'oat drink', 'oat drinks'],
  ['drink', 'drinks'],
  ['yogurt', 'yogurts', 'oatgurt'],
];

const SYNONYMS = {};
SYNONYM_GROUPS.forEach((group) => {
  group.forEach((word) => {
    SYNONYMS[word] = group;
  });
});

// ── Brand houses: "chanel" → every Chanel line ─────────────────────────────
export const BRAND_GROUPS = {
  Chanel: ['Bleu de Chanel', 'Allure Homme Sport', 'Allure Homme', 'Les Exclusifs de Chanel', 'Les Eaux de Chanel', 'Égoïste', 'Pour Monsieur', 'Antaeus'],
};

export const BRAND_HOUSE = Object.fromEntries(
  Object.entries(BRAND_GROUPS).flatMap(([house, members]) => members.map((m) => [m, house])),
);

export function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[_/\\-]+/g, ' ')
    .replace(/[^\p{L}\p{N} ]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    // glued/compound forms → single token (icecream / ice-cream / ice creams
    // all become one word, in query AND haystack alike)
    .replace(/\bice\s*creams?\b/g, 'icecream');
}

function tokenAlts(token) {
  const key = normalize(token);
  const group = SYNONYMS[key];
  return group ? group.map(normalize) : [key];
}

// One alternative against the haystack. Single words stay plain substring
// (so "shoe" finds "shoes"); multi-word alternatives must sit on word joints —
// otherwise "t shirt" matches "...crest shirt" and pulls shirts under "tee".
function altMatches(hay, a) {
  if (!a) return false;
  if (!a.includes(' ')) return hay.includes(a);
  const rx = new RegExp(`(?:^| )${a}(?: |$)`);
  return rx.test(hay);
}

// Every field that can carry a match. Pass an array (undefined-safe) or text.
export function matchesText(fields, query) {
  const tokens = normalize(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return true;
  const hay = normalize(Array.isArray(fields) ? fields.filter(Boolean).join(' ') : fields);
  return tokens.every((t) => tokenAlts(t).some((a) => altMatches(hay, a)));
}
