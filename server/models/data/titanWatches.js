// ─── TITAN WATCHES ───────────────────────────────────────────────────────────
// 214 Titan timepieces — one entry per model in public/images/watches/,
// copied from the user's "Men & woman Watches_ Titan" folder (218 photographs;
// one model was shot 4 ways, so those extras become its detail-page gallery).
//
// The source files carry NOTHING but a model code (`1698SM01_1_X7HB.webp`), so
// every other field is GENERATED from that code through a deterministic FNV-1a
// hash: same code in → same product out, on any machine, with no data file to
// drift. The model code stays in the name and the description, so any entry
// traces straight back to the photograph it was built from.
//
// `mrp` is set equal to `price` on purpose — no invented discount, and it keeps
// this range out of the homepage "deals" rail, which selects on `mrp > price`.
// `volume` is left off too: the detail page renders it as "Net volume:", which
// reads wrong on a watch (the case size lives in `specs` instead).
// `specs.Model` is absent for the same kind of reason: /products builds one
// filter facet per spec key, and a "Model" facet would offer 10 of 214 codes at
// random — noise where a real filter wants to be. The code is already the last
// token of the name and is repeated in the description.
// Wired into productCategories in siteData.js.

const CODES = [
  "10011QL01",
  "10012NM01",
  "10017SL01",
  "10028QL01",
  "10028SM01",
  "10038QM01",
  "10050QM01",
  "10050SM01",
  "10058YM01",
  "10058YM04",
  "10059YM01",
  "10059YM02",
  "10060BM01",
  "10063BM01",
  "10076SL02",
  "10076WL01",
  "10077SM01",
  "1043YL10",
  "1043YL11",
  "1578YM05",
  "1580YL05",
  "1584SM03",
  "1584YM02",
  "1595SL06",
  "1595WL09",
  "1595WL12",
  "1638SM01",
  "1650BM01",
  "1650BM05",
  "1650YM08",
  "1688KM06",
  "1688KM12",
  "1698BM01",
  "1698QM02",
  "1698SM01",
  "1698WL01",
  "1712YM01",
  "1712YM02",
  "1712YM03",
  "1713BM02",
  "1715YM03",
  "1730SL02",
  "1730SM03",
  "1733KL03",
  "1733KM01",
  "1733KM03",
  "1734KM01",
  "1734WL01",
  "1767NM01",
  "1767SL03",
  "1769SM01",
  "1770SM03",
  "1774SM01",
  "1775BM02",
  "1802NL01",
  "1802NL02",
  "1802NM01",
  "1802QL04",
  "1802QL05",
  "1802SL02",
  "1802SL11",
  "1802SL21",
  "1802WL02",
  "1802WL03",
  "1803NM01",
  "1805KL02",
  "1805NM02",
  "1805QM01",
  "1805QM04",
  "1805QP01",
  "1805SL04",
  "1805WL03",
  "1805WM02",
  "1805WP01",
  "1806KM01",
  "1806NL02",
  "1806NM01",
  "1806QM03",
  "1806SM01",
  "1823QM01",
  "1823WL02",
  "1824BM01",
  "1824BM03",
  "1824KM01",
  "1824WL02",
  "1824WL03",
  "1825KM01",
  "1825KM02",
  "1825SL15",
  "1825SM09",
  "1825SM10",
  "1825SM11",
  "1825YM12",
  "1828KM02",
  "1828SM02",
  "1830KL02",
  "1843YM05",
  "1845WL01",
  "1865NL01",
  "1870SL10",
  "1870SL12",
  "1870SM07",
  "1870YM01",
  "1874SL02",
  "1874SL05",
  "1877NM01",
  "1885SL01",
  "1885SL03",
  "1885SL04",
  "1885SM02",
  "1885WM01",
  "3273NM01",
  "3278QM01",
  "3278SM03",
  "3278SM05",
  "3286KM01",
  "3291SM02",
  "3344KL02",
  "38086PP02",
  "38086PP03",
  "38088PP03K",
  "38123NM01",
  "38125SM01",
  "38151PP01K",
  "38151PP04K",
  "38151PP05K",
  "38153QP01",
  "38153SP01",
  "38154PP02",
  "38154PP03",
  "38154PP05",
  "38159WL01",
  "38202PP01K",
  "38203PP01K",
  "38203PP02K",
  "38203PP03K",
  "38225PP01K",
  "38227PP01K",
  "679YL01",
  "68062PP02K",
  "77082SM02W",
  "77083SM01",
  "77105SM02",
  "77140SL01",
  "77146BM01",
  "77146SM02",
  "77146WL01",
  "77149SM01",
  "77163YM07W",
  "77187KM02",
  "7930PP01",
  "7930PP24W",
  "7987SM07W",
  "7987SM10W",
  "7987YL01",
  "90086KM01J",
  "90110BM01",
  "90110WL08",
  "90110YM02",
  "90127KM02",
  "90142QM02",
  "90169NL01",
  "90174KD03",
  "90175KD03",
  "90184AM01",
  "90189SM01",
  "90196AM02",
  "90197AP01K",
  "90198NM01",
  "90200WL01",
  "90204AM01",
  "90204AP01",
  "90205AM01",
  "90205AP04",
  "90206AP01",
  "90207NM01",
  "90208NM01",
  "90213SL01",
  "90221QM02",
  "90223NM01",
  "90223WL01",
  "90224QL01",
  "90247AP01C",
  "90247AP02C",
  "90247AP03C",
  "90248AP01C",
  "90248AP02C",
  "90248AP03C",
  "90251WP01C",
  "90254SM01",
  "90257SM01",
  "90298NP01K",
  "90298QP01K",
  "90298WP01K",
  "90299NP01K",
  "90299WP01K",
  "9151SM01",
  "FV30001QM03W",
  "FV30005KM01W",
  "FV30037SM01W",
  "FV30038NM01W",
  "FV30038QM01W",
  "KCWGX0063802MN",
  "SP70006SL02",
  "SP70007SL01",
  "SP70008KM01",
  "SP70008SL01",
  "SP70026SM01W",
  "SP70033QM01",
  "SP70048NM01W",
  "SP70071SM01",
  "SP70093SM01W",
  "SP70109SM01W",
  "SP70115QL01W",
];

// Same model code, extra studio shots → the detail page's image gallery.
const GALLERY = {
  "1730SM03": [
    "1730SM03-2",
    "1730SM03-3",
    "1730SM03-4",
    "1730SM03-5",
  ]
};

// Deterministic FNV-1a: stable across runs and machines, so the generated
// copy never reshuffles between builds.
const hash = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

// Titan's collection names — mixed by hash so a shelf never reads as one line.
const SERIES = [
  'Classic', 'Regalia', 'Raga', 'Bandhan', 'Edge', 'Octane', 'Nexus', 'Urban',
  'Heritage', 'Pristine', 'Metropolis', 'Olympian', 'Sleek', 'Royce',
];

const TYPES = ['Analog', 'Chronograph', 'Digital', 'Solar Analog', 'Multi-Function'];

// Second code letter → how the strap reads. M/L/P/D is the only structure the
// filenames offer, so this mapping is generated, not verified against Titan's
// own specs — it exists to give 214 entries a plausible, varied shelf talker.
const STRAPS = {
  M: { label: 'stainless-steel bracelet', spec: 'Stainless steel' },
  L: { label: 'leather strap', spec: 'Leather' },
  P: { label: 'silicone strap', spec: 'Silicone' },
  D: { label: 'two-tone bracelet', spec: 'Two-tone steel' },
};

const MOVEMENT = {
  Analog: 'Quartz analog',
  Chronograph: 'Quartz chronograph',
  Digital: 'Digital module',
  'Solar Analog': 'Solar quartz',
  'Multi-Function': 'Quartz multi-function',
};

// [base case size, spread] per type — chronographs and digitals run larger.
const CASE_RANGE = {
  Analog: [38, 5],
  Chronograph: [40, 5],
  Digital: [42, 5],
  'Solar Analog': [39, 5],
  'Multi-Function': [40, 5],
};

// Retail price points; the entry-level half is repeated so the range skews the
// way a real watch wall does rather than reading as a flat lottery.
const TIERS = [
  29.99, 34.99, 39.99, 44.99, 49.99, 54.99, 59.99, 64.99, 69.99, 79.99,
  89.99, 99.99, 109.99, 119.99, 129.99, 149.99, 169.99, 189.99, 219.99,
  249.99, 279.99, 319.99, 349.99,
];
const PRICE_POOL = TIERS.concat(TIERS.slice(0, 14));

const TAGLINES = [
  'The one you never take off.',
  'Dress it up, or leave it on all week.',
  'Built for every day, not just the good ones.',
  'Quiet dial, confident wrist.',
  'Reads at a glance, wears for years.',
  'Simple, and all the better for it.',
  'Your daily driver, properly made.',
  'Small detail, big habit.',
];

const build = (code) => {
  const h = hash(code);
  const letters = code.replace(/^[0-9]+/, '').slice(0, 2);
  const strap = STRAPS[letters.slice(1, 2)] || STRAPS.M;
  const type = TYPES[(h >>> 3) % TYPES.length];
  const series = SERIES[(h >>> 9) % SERIES.length];
  const movement = MOVEMENT[type];
  const [base, spread] = CASE_RANGE[type];
  const size = base + ((h >>> 5) % spread);
  // leather caps out lower than a sealed bracelet
  const wr = strap.spec === 'Leather' ? 3 : h % 2 ? 5 : 3;
  const price = PRICE_POOL[h % PRICE_POOL.length];
  const openers = [
    `${series} ${type.toLowerCase()} by Titan`,
    `A ${series.toLowerCase()} ${type.toLowerCase()} from Titan`,
    `${series}, the ${type.toLowerCase()} way`,
  ];
  const extra = GALLERY[code] || null;
  return {
    id: `titan-${code.toLowerCase()}`,
    slug: `titan-${code.toLowerCase()}`,
    brand: 'Titan',
    name: `Titan ${series} ${type} ${code}`,
    price,
    mrp: price,
    tagline: TAGLINES[(h >>> 17) % TAGLINES.length],
    description: `${openers[(h >>> 11) % openers.length]} — ${size} mm case on a ${strap.label}, ${wr} ATM water resistance, ${movement.toLowerCase()}. Model ${code}.`,
    image: `/images/watches/${code}.webp`,
    ...(extra ? { images: [`/images/watches/${code}.webp`, ...extra.map((s) => `/images/watches/${s}.webp`)] } : {}),
    highlights: [
      `${movement} in a ${size} mm case`,
      `${strap.label.charAt(0).toUpperCase() + strap.label.slice(1)} for everyday wear`,
      `Water resistant to ${wr} ATM`,
    ],
    specs: {
      'Case size': `${size} mm`,
      Movement: movement,
      Strap: strap.spec,
      'Water resistance': `${wr} ATM`,
    },
    rating: 4 + ((h >>> 2) % 10) / 10,
    reviewsCount: 18 + (h % 260),
    stock: 12 + ((h >>> 6) % 45),
  };
};

const TITAN_ITEMS = CODES.map(build);

export const TITAN_CATEGORIES = [
  {
    slug: 'titan-watches',
    name: 'Titan Watches',
    tagline: 'Time, told well — 214 models from Titan.',
    description:
      'Titan analog, chronograph, solar and digital timepieces — the everyday beater, the dress watch and everything in between.',
    color: 'bg-oatly-blue text-white',
    badge: 'TIMEPIECES',
    items: TITAN_ITEMS,
  },
];
