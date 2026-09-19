// ─── MODEL ────────────────────────────────────────────────────────────────
// Homepage data layer (MVC: Model). All card content, imagery, links and
// measured aspect ratios live here. Views (components) only render this data.

const SB = 'https://a.storyblok.com/f/107921';

// Homepage assets — all photos/videos from Pexels (royalty-free).
// Each image is used by exactly ONE card.
const PX = 'https://images.pexels.com/photos';
const Q = '?auto=compress&cs=tinysrgb&w=1260';
export const IMAGES = {
  press: `${PX}/35087284/pexels-photo-35087284.jpeg${Q}`,
  pressLogo: `${SB}/3133x505/9949c6bf6d/lookbook-vol3.svg`,
  bathroom: `${PX}/4725733/pexels-photo-4725733.jpeg${Q}`,
  phonebooth: `${PX}/33174185/pexels-photo-33174185.jpeg${Q}`,
  runway: `${PX}/35028555/pexels-photo-35028555.jpeg${Q}`,
  avavavLogo: `${SB}/1599x228/971a3c11a7/avavav-x-oatly.svg`,
  faq: `${PX}/13013307/pexels-photo-13013307.jpeg${Q}`,
  folder: `${PX}/38026061/pexels-photo-38026061.jpeg${Q}`,
  matchaPhone: `${PX}/8004558/pexels-photo-8004558.jpeg${Q}`,
  receipt: `${PX}/30403209/pexels-photo-30403209.jpeg${Q}`,
  receiptLogo: `${SB}/1431x3279/5e9d5df0b4/refilllogo.webp`,
  chocolate: `${PX}/39378007/pexels-photo-39378007.jpeg${Q}`,
  sticky: `${PX}/15735738/pexels-photo-15735738.jpeg${Q}`,
  beach: `${PX}/12280754/pexels-photo-12280754.jpeg${Q}`,
  icedCoffee: `${PX}/36028821/pexels-photo-36028821.jpeg${Q}`,
  popcorn: `${PX}/302899/pexels-photo-302899.jpeg${Q}`,
  lookbookDrinks: `${PX}/18732390/pexels-photo-18732390.jpeg${Q}`,
  bannerComposite: `${PX}/30208588/pexels-photo-30208588.jpeg${Q}`,
  blindtest: `${PX}/34505585/pexels-photo-34505585.jpeg${Q}`,
  barista: `${PX}/27860686/pexels-photo-27860686.jpeg${Q}`,
  table: `${PX}/30529077/pexels-photo-30529077.jpeg${Q}`,
  vest: `${PX}/14930492/pexels-photo-14930492.jpeg${Q}`,
  vault: `${PX}/7937002/pexels-photo-7937002.jpeg${Q}`,
  fats: `${PX}/8542164/pexels-photo-8542164.jpeg${Q}`,
  wakeup: `${PX}/5373242/pexels-photo-5373242.jpeg${Q}`,
  cowsmilk: `${PX}/8064117/pexels-photo-8064117.jpeg${Q}`,
  dealers: `${PX}/16608331/pexels-photo-16608331.jpeg${Q}`,
  oatlywho: `${PX}/39273903/pexels-photo-39273903.jpeg${Q}`,
  matchaCarton: `${PX}/38737533/pexels-photo-38737533.jpeg${Q}`,
};

// Card deck: title / tag / image / link / measured image aspect ratio.
export const CARDS = {
  pee:      { title: 'BERRY OATMEAL BOWLS', tag: 'NEWS', imageSrc: IMAGES.bathroom, linkTo: '/things-we-do/initiatives/pee-for-the-planet', aspectRatio: '22/9' },
  lookbook: { title: 'CUCUMBER OAT COCKTAIL', tag: 'NEWS', imageSrc: IMAGES.press, linkTo: '/recipes/look-book-vol-3', aspectRatio: 'fill' },
  aftertaste: { title: 'BERRY OAT COCKTAILS', tag: 'NEWS', imageSrc: IMAGES.phonebooth, linkTo: '/news', aspectRatio: '1/2' },
  avavav:   { title: 'ICED OAT LATTE', tag: 'NEWS', imageSrc: IMAGES.runway, linkTo: '/things-we-do/oatly-x-avavav', aspectRatio: 'fill' },
  faq:      { title: 'COFFEE & FRENCH PRESS', tag: 'OTHER', imageSrc: IMAGES.faq, linkTo: '/health', aspectRatio: '6/5' },
  future:   { title: 'POWER BREAKFAST PLATE', tag: 'NEWS', imageSrc: IMAGES.folder, linkTo: '/things-we-do/initiatives/future-of-taste', aspectRatio: '1/1' },
  refill:   { title: 'FRESH CROISSANTS', tag: 'TASTEBUDS', imageSrc: IMAGES.receipt, linkTo: '/recipes/look-book-vol-3', aspectRatio: '16/9' },
  chocolate: { title: 'CHOCOLATE TRUFFLES', tag: 'PRODUCTS', imageSrc: IMAGES.chocolate, linkTo: '/products/oat-drink', aspectRatio: '4/3' },
  mucho:    { title: 'ICED MATCHA LATTE', tag: 'PRODUCTS', imageSrc: IMAGES.matchaPhone, linkTo: '/products/oat-drink', aspectRatio: '3/4' },
  sticky:   { title: 'BERRY PANCAKES', tag: 'SUSTAINABILITY', imageSrc: IMAGES.sticky, linkTo: '/oatly-who/sustainability-plan', aspectRatio: '4/3' },
  matcha:   { title: 'OAT DRINK MATCHA', tag: 'PRODUCTS', linkTo: '/products/oat-drink', aspectRatio: '5/8' },
  miami:    { title: 'SUMMER MOCKTAILS', tag: 'NEWS', imageSrc: IMAGES.beach, linkTo: '/news', aspectRatio: '5/8' },
  ginger:   { title: 'HOT GREEN TEA', tag: 'TASTEBUDS', imageSrc: IMAGES.icedCoffee, linkTo: '/recipes/look-book-autumn-winter-2025', aspectRatio: '1/1' },
  popcorn:  { title: 'LATTE ART POUR', tag: 'PRODUCTS', imageSrc: IMAGES.popcorn, linkTo: '/products/oat-drink', aspectRatio: '1/2' },
  fats:     { title: 'AVOCADO EGG TOAST', tag: 'HEALTH', imageSrc: IMAGES.fats, linkTo: '/health', aspectRatio: '5/8' },
  wakeup:   { title: 'STEAMING HOT COFFEE', tag: 'SUSTAINABILITY', imageSrc: IMAGES.wakeup, linkTo: '/oatly-who/sustainability-plan', aspectRatio: '3/4' },
  blind:    { title: 'COFFEE CUPPING TEST', tag: 'NEWS', imageSrc: IMAGES.blindtest, linkTo: '/news', aspectRatio: '1/1' },
  banner:   { title: 'DINNER WITH FRIENDS', tag: 'TASTEBUDS', imageSrc: IMAGES.bannerComposite, linkTo: '/recipes/look-book-autumn-winter-2025', aspectRatio: '1080/285' },
  cowsmilk: { title: "WHY NOT COW'S MILK", tag: 'SUSTAINABILITY', imageSrc: IMAGES.cowsmilk, linkTo: '/oatly-who/sustainability-plan', aspectRatio: '21/10' },
  barista:  { title: 'PERFECT LATTE ART', tag: 'PRODUCTS', imageSrc: IMAGES.barista, linkTo: '/products/oat-drink', aspectRatio: '21/10' },
  climate:  { title: 'BERRY GRANOLA BOWL', tag: 'SUSTAINABILITY', imageSrc: IMAGES.table, linkTo: '/sustainability/climate-solutions-company', aspectRatio: 'fill' },
  dealers:  { title: 'MORNING ESPRESSO', tag: 'OTHER', imageSrc: IMAGES.dealers, linkTo: '/contact', aspectRatio: '6/5' },
  bikers:   { title: 'MANGO OAT SMOOTHIE', tag: 'NEWS', imageSrc: IMAGES.vest, linkTo: '/things-we-do/ef-pro-cycling', aspectRatio: '1/1' },
  vault:    { title: 'BERRY SMOOTHIE BOWL', tag: 'NEWS', imageSrc: IMAGES.vault, linkTo: '/news', aspectRatio: '5/9' },
  oatlywho: { title: 'RICE BOWLS & SKEWERS', tag: 'SUSTAINABILITY', imageSrc: IMAGES.oatlywho, linkTo: '/oatly-who', aspectRatio: '1/1' },
};
