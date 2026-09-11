// ─── MODEL ────────────────────────────────────────────────────────────────
// Homepage data layer (MVC: Model). All card content, imagery, links and
// measured aspect ratios live here. Views (components) only render this data.

const SB = 'https://a.storyblok.com/f/107921';

// Real oatly.com homepage assets (Storyblok CDN + Vimeo video posters).
// Each image is used by exactly ONE card.
export const IMAGES = {
  press: 'https://i.vimeocdn.com/video/2172481812-b68b23486d35edaf22e04887be0fcb713bc99b5a53c038844771e5c06cfd6743-d_1280x720?region=us',
  pressLogo: `${SB}/3133x505/9949c6bf6d/lookbook-vol3.svg`,
  bathroom: `${SB}/1600x1067/3841b30322/oatly_se_2026_pee-for-the-planet_001-large.jpg`,
  phonebooth: 'https://i.vimeocdn.com/video/2167925531-a6636b625d664038207a349b918694cdb7dde89442bd1b73445f1f2de9a92f37-d_1280x720?region=us',
  runway: 'https://i.vimeocdn.com/video/2129387717-5373f7f6b1f73233ee56ffa89e19167307dc37d9812287dbf49a5949a0f227fa-d_1280x720?region=us',
  avavavLogo: `${SB}/1599x228/971a3c11a7/avavav-x-oatly.svg`,
  faq: `${SB}/1268x1100/d89816f603/faq-ing.png`,
  folder: `${SB}/1268x1268/6de5951301/futureoftastereport_l.webp`,
  matchaPhone: 'https://i.vimeocdn.com/video/2127286353-1355c44ae659a152cb766072233f51bd9cb3b3a8f4a245663cf601d55621ddd4-d_1280x720?region=us',
  receipt: `${SB}/1500x1500/29299c5fea/oatly_look_book_mini_drop_25_26_receipt.webp`,
  receiptLogo: `${SB}/1431x3279/5e9d5df0b4/refilllogo.webp`,
  chocolate: `${SB}/1268x1268/e219d2f05c/chocolate.webp`,
  sticky: `${SB}/2720x2720/b7129cff02/oatly-17-steps.webp`,
  beach: 'https://i.vimeocdn.com/video/2127286516-3d898da9053a5138e341387bc75aaab040293424606eb9a93de29c75fa8b39bb-d_1280x720?region=us',
  icedCoffee: `${SB}/1268x1268/a1ffec6f9f/gingernut.webp`,
  popcorn: `${SB}/1268x2720/88ec9848e9/popcorn.webp`,
  lookbookDrinks: `${SB}/4224x2752/d42df44643/look-book-1.webp`,
  bannerComposite: 'https://assets.oatly.com/asset/68098b18-2a51-4a2f-a61a-66767f296c80/w1080/WEB-Oatly_Lookbook_refill_Desktop_new.png',
  blindtest: `${SB}/1269x1269/6c2fc1f47a/blind-taste.webp`,
  barista: `${SB}/2720x1268/0589273691/originalb.webp`,
  table: `${SB}/2721x2721/35c610b9fd/photo.webp`,
  vest: `${SB}/1268x1268/dbd765abdf/efprobikers.webp`,
  vault: `${SB}/1268x2720/623efad245/vault.webp`,
  fats: `${SB}/1268x2720/c287f8c12e/getyourfatsstraight.webp`,
  wakeup: `${SB}/2728x4180/eb45e9b494/su.webp`,
  cowsmilk: `${SB}/2721x1269/3f48933707/cowsmilk.webp`,
  dealers: `${SB}/1268x1268/14c6665bab/oatdealers.webp`,
  oatlywho: `${SB}/1276x1276/b92df43bce/oatlywho.webp`,
  matchaCarton: `${SB}/1268x2720/377faa9127/matcha.webp`,
};

// Card deck: title / tag / image / link / measured image aspect ratio.
export const CARDS = {
  pee:      { title: 'PEE FOR THE PLANET', tag: 'NEWS', imageSrc: IMAGES.bathroom, linkTo: '/things-we-do/pee-for-the-planet', aspectRatio: '22/9' },
  lookbook: { title: 'LOOK BOOK VOL. 3', tag: 'NEWS', imageSrc: IMAGES.press, linkTo: '/recipes/look-book-vol-3', aspectRatio: 'fill', videoId: '1204166757', videoHash: '8956f12d6d' },
  aftertaste: { title: 'AFTERTASTE', tag: 'NEWS', imageSrc: IMAGES.phonebooth, linkTo: '/news', aspectRatio: '1/2', videoId: '1200748815', videoHash: 'b47798b059' },
  avavav:   { title: 'OATLY & AVAVAV GOES TO MILAN FASHION WEEK', tag: 'NEWS', imageSrc: IMAGES.runway, linkTo: '/things-we-do/oatly-x-avavav', aspectRatio: 'fill', videoId: '1169506136', videoHash: '27394f0282' },
  faq:      { title: 'FREQUENTLY ASKED QUESTIONS', tag: 'OTHER', imageSrc: IMAGES.faq, linkTo: '/health', aspectRatio: '6/5' },
  future:   { title: 'THE FUTURE OF TASTE', tag: 'NEWS', imageSrc: IMAGES.folder, linkTo: '/things-we-do/initiatives/future-of-taste', aspectRatio: '1/1' },
  refill:   { title: 'THE OATLY LOOK BOOK REFILL', tag: 'TASTEBUDS', imageSrc: IMAGES.receipt, linkTo: '/recipes/look-book-vol-3', aspectRatio: '16/9' },
  chocolate: { title: 'OAT DRINK CHOCOLATE', tag: 'PRODUCTS', imageSrc: IMAGES.chocolate, linkTo: '/products/oat-drink', aspectRatio: '4/3' },
  mucho:    { title: 'MUCHO MATCHA', tag: 'PRODUCTS', imageSrc: IMAGES.matchaPhone, linkTo: '/products/oat-drink', aspectRatio: '3/4', videoId: '1168787373', videoHash: 'f868f30780' },
  sticky:   { title: 'THE OATLY 17 STEP SUSTAINABILITY PLAN', tag: 'SUSTAINABILITY', imageSrc: IMAGES.sticky, linkTo: '/oatly-who/sustainability-plan', aspectRatio: '4/3' },
  matcha:   { title: 'OAT DRINK MATCHA', tag: 'PRODUCTS', linkTo: '/products/oat-drink', aspectRatio: '5/8' },
  miami:    { title: 'TASTES LIKE MIAMI', tag: 'NEWS', imageSrc: IMAGES.beach, linkTo: '/news', aspectRatio: '5/8', videoId: '1168787516', videoHash: '3e7016327a' },
  ginger:   { title: 'GINGER NUT CHAI', tag: 'TASTEBUDS', imageSrc: IMAGES.icedCoffee, linkTo: '/recipes/look-book-autumn-winter-2025', aspectRatio: '1/1' },
  popcorn:  { title: 'OAT DRINK BARISTA POPCORN', tag: 'PRODUCTS', imageSrc: IMAGES.popcorn, linkTo: '/products/oat-drink', aspectRatio: '1/2' },
  fats:     { title: 'SMALL HEALTHY BOOK', tag: 'HEALTH', imageSrc: IMAGES.fats, linkTo: '/health', aspectRatio: '5/8' },
  wakeup:   { title: 'SUSTAINABILITY REPORT 2025', tag: 'SUSTAINABILITY', imageSrc: IMAGES.wakeup, linkTo: '/oatly-who/sustainability-plan', aspectRatio: '3/4' },
  blind:    { title: 'OATLY BLIND TASTE TEST', tag: 'NEWS', imageSrc: IMAGES.blindtest, linkTo: '/news', aspectRatio: '1/1' },
  banner:   { title: 'THE OATLY LOOK BOOK AUTUMN/WINTER 2025', tag: 'TASTEBUDS', imageSrc: IMAGES.bannerComposite, linkTo: '/recipes/look-book-autumn-winter-2025', aspectRatio: '1080/285' },
  cowsmilk: { title: 'SUSTAINABILITY REPORT 2024', tag: 'SUSTAINABILITY', imageSrc: IMAGES.cowsmilk, linkTo: '/oatly-who/sustainability-plan', aspectRatio: '21/10' },
  barista:  { title: 'OAT DRINK BARISTA EDITION', tag: 'PRODUCTS', imageSrc: IMAGES.barista, linkTo: '/products/oat-drink', aspectRatio: '21/10' },
  climate:  { title: 'OATLY HAS QUALIFIED AS CLIMATE SOLUTIONS COMPANY', tag: 'SUSTAINABILITY', imageSrc: IMAGES.table, linkTo: '/sustainability/climate-solutions-company', aspectRatio: 'fill' },
  dealers:  { title: 'CAFE OWNER? CLICK HERE', tag: 'OTHER', imageSrc: IMAGES.dealers, linkTo: '/contact', aspectRatio: '6/5' },
  bikers:   { title: 'SUPPORTING EF PRO BIKERS', tag: 'NEWS', imageSrc: IMAGES.vest, linkTo: '/things-we-do/ef-pro-cycling', aspectRatio: '1/1' },
  vault:    { title: 'THE MYSTERIES LOCKED INSIDE NORDIC SEED VAULTS', tag: 'NEWS', imageSrc: IMAGES.vault, linkTo: '/news', aspectRatio: '5/9' },
  oatlywho: { title: 'OATLY WHO', tag: 'SUSTAINABILITY', imageSrc: IMAGES.oatlywho, linkTo: '/oatly-who', aspectRatio: '1/1' },
};
