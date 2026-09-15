// Centralized Site Data & Copy Store for Oatly Clone

import { OATLY_CATALOG_ITEMS } from './oatlyCatalog.js';

export const siteMeta = {
  title: 'the Original Oat Drink Company | Oatly',
  description: 'A site filled with everything you could possibly think of, and also probably not think of, related to an oat drink company called Oatly.'
};

export const productCategories = [
  {
    id: 'cold-foam',
    slug: 'cold-foam',
    name: 'Cold Foam',
    tagline: 'Instant barista cloud foam magic straight from the can.',
    description: 'Press the nozzle and boom: a dreamy cloud of sweet oat cold foam floating effortlessly on top of your iced coffee, matcha, or hot cocoa.',
    color: 'bg-[#FF5C8D] text-white',
    badge: 'NEW FAVOURITE',
    items: [
      {
        id: 'cold-foam-vanilla',
        name: 'Whip-It-Up Cold Foam Vanilla',
        slug: 'whip-it-up-cold-foam-vanilla',
        category: 'Cold Foam',
        volume: '13.5 oz (382g)',
        climateFootprint: '0.62 kg CO2e / kg',
        tagline: 'Instant barista magic straight from the can.',
        description: 'Press the nozzle and boom: a dreamy cloud of vanilla-sweetened oat foam floating effortlessly on top of your cold sips.',
        badge: 'BEST SELLER',
        ingredients: ['Oatmilk (water, oats)', 'Coconut oil', 'Sugar', 'Natural vanilla flavor', 'Nitrous oxide propellant'],
        nutrition: { calories: '45 kcal', fat: '3.5g', carbs: '4g', fiber: '0g', protein: '0g', calcium: '50mg', vitaminD: '0mcg' }
      }
    ]
  },
  {
    id: 'soft-serve',
    slug: 'soft-serve',
    name: 'Soft Serve',
    tagline: 'Creamy dairy-free soft serve that makes cows jealous.',
    description: '100% plant-based soft serve with zero dairy milk involved. Swirled into cones across stadiums, boardwalks, and scoop shops.',
    color: 'bg-[#8CD7A9] text-oatly-black',
    badge: 'FAN FAVORITE',
    items: [
      {
        id: 'soft-serve-vanilla',
        name: 'Oatly Soft Serve Vanilla',
        slug: 'oatly-soft-serve-vanilla',
        category: 'Soft Serve',
        volume: 'Commercial Scoop',
        climateFootprint: '0.71 kg CO2e / kg',
        tagline: 'Classic vanilla soft serve swirl.',
        description: 'Silky, rich, and 100% dairy-free plant-based soft serve.',
        badge: 'POPULAR',
        ingredients: ['Oat base', 'Sugar', 'Coconut oil', 'Glucose syrup', 'Natural vanilla beans'],
        nutrition: { calories: '160 kcal', fat: '7g', carbs: '22g', fiber: '1g', protein: '1g', calcium: '80mg', vitaminD: '0mcg' }
      }
    ]
  },
  {
    id: 'spread',
    slug: 'spread',
    name: 'Spread',
    tagline: 'Schmear it like a bagel boss.',
    description: 'Cream cheese alternative crafted from oats. Tangy, spreadable, and magnificent on warm toasted bagels or in cheesecake baking.',
    color: 'bg-oatly-cream-dark text-oatly-black',
    badge: 'SAVORY',
    items: [
      {
        id: 'spread-plain',
        name: 'Oatly Creamy Spread Plain',
        slug: 'oatly-creamy-spread-plain',
        category: 'Spread',
        volume: '8 oz (225g)',
        climateFootprint: '0.58 kg CO2e / kg',
        tagline: 'Tangy and creamy bagel schmear.',
        description: 'Dairy-free cream cheese alternative made from cultured oats.',
        badge: 'SAVORY',
        ingredients: ['Oat base', 'Coconut oil', 'Potato starch', 'Salt', 'Lactic acid (non-dairy)'],
        nutrition: { calories: '70 kcal', fat: '7g', carbs: '3g', fiber: '0.5g', protein: '1g', calcium: '40mg', vitaminD: '0mcg' }
      }
    ]
  },
  {
    id: 'cooking',
    slug: 'cooking',
    name: 'Cooking',
    tagline: 'Heavy cream substitute for pasta sauces, soups, and desserts.',
    description: 'Whisks into stiff peaks for dessert topping or thickens savory carbonara and curry sauces without splitting under heat.',
    color: 'bg-[#FCEB50] text-oatly-black',
    badge: 'CHEF APPROVED',
    items: [
      {
        id: 'cooking-whip',
        name: 'Whippable Cooking Cream',
        slug: 'whippable-cooking-cream',
        category: 'Cooking',
        volume: '8.4 fl oz (250 ml)',
        climateFootprint: '0.55 kg CO2e / kg',
        tagline: 'Whisks into stiff peaks or thickens pasta sauce.',
        description: 'Plant-based cooking cream for baking, whipping, and savory cooking.',
        badge: 'CHEF APPROVED',
        ingredients: ['Oat base', 'Vegetable oils', 'Emulsifiers', 'Stabilizers'],
        nutrition: { calories: '150 kcal', fat: '15g', carbs: '4g', fiber: '1g', protein: '1g', calcium: '30mg', vitaminD: '0mcg' }
      }
    ]
  },
  {
    id: 'chilled-oat-drink',
    slug: 'chilled-oat-drink',
    name: 'Chilled Oat Drinks',
    tagline: 'Fresh from the grocery dairy aisle.',
    description: 'Keep it cold! Our chilled oat drinks are crafted for maximum freshness and silky texture.',
    color: 'bg-[#002766] text-white',
    badge: 'FRESH',
    items: [
      {
        id: 'oat-drink-barista',
        name: 'Oat Drink Barista Edition',
        slug: 'oat-drink-barista-edition',
        category: 'Chilled Oat Drinks',
        volume: '32 fl oz (946 ml)',
        climateFootprint: '0.49 kg CO2e / kg',
        tagline: 'Foams like a dream in coffee.',
        description: 'The global coffee shop favorite for latte microfoam.',
        badge: 'BEST SELLER',
        image: 'https://a.storyblok.com/f/107921/2720x1268/0589273691/originalb.webp',
        ingredients: ['Oat base', 'Rapeseed oil', 'Dipotassium phosphate', 'Calcium carbonate', 'Sea salt', 'Vitamins'],
        nutrition: { calories: '140 kcal', fat: '7g', carbs: '16g', fiber: '2g', protein: '3g', calcium: '350mg', vitaminD: '2.5mcg' }
      }
    ]
  },
  {
    id: 'oat-drink',
    slug: 'oat-drink',
    name: 'Oat Drink',
    tagline: 'The OG oat milk carton.',
    description: 'The iconic blue carton filled with rich, creamy oat milk made for cereal, coffee, and drinking straight.',
    color: 'bg-[#FCEB50] text-oatly-black',
    badge: 'CLASSIC',
    items: [
      {
        id: 'oat-drink-original',
        name: 'Oat Drink Original',
        slug: 'oat-drink-original',
        category: 'Oat Drink',
        volume: '64 fl oz (1.89 L)',
        climateFootprint: '0.44 kg CO2e / kg',
        tagline: 'The OG oat milk.',
        description: 'Crisp, delicious plant milk loaded with oat fiber.',
        badge: 'CLASSIC',
        ingredients: ['Oat base', 'Rapeseed oil', 'Dicalcium phosphate', 'Sea salt'],
        nutrition: { calories: '120 kcal', fat: '5g', carbs: '16g', fiber: '2g', protein: '3g', calcium: '350mg', vitaminD: '2.5mcg' }
      },
      {
        id: 'oat-drink-matcha-1l',
        name: 'Oat Drink Matcha Latte',
        slug: 'oat-drink-matcha-1l',
        category: 'Oat Drink',
        volume: '1 L',
        tagline: 'Matcha latte made with oats.',
        description: 'A creamy matcha latte oat drink in a 1L carton.',
        badge: 'NEW',
        image: 'https://a.storyblok.com/f/107921/1268x2720/377faa9127/matcha.webp'
      }
    ]
  },
  {
    id: 'oatgurt',
    slug: 'oatgurt',
    name: 'Oatgurt',
    tagline: 'Yogurt made from oats. Spoonably smooth.',
    description: 'Cultured plant-based yogurt with live active cultures and sweet fruit swirls.',
    color: 'bg-[#FF7E36] text-white',
    badge: 'BREAKFAST',
    items: [
      {
        id: 'oatgurt-strawberry',
        name: 'Oatgurt Strawberry Swirl',
        slug: 'oatgurt-strawberry-swirl',
        category: 'Oatgurt',
        volume: '24 oz (680g)',
        climateFootprint: '0.51 kg CO2e / kg',
        tagline: 'Spoonable oat yogurt with fruit swirl.',
        description: 'Tangy plant yogurt made with oats and real strawberries.',
        badge: 'POPULAR',
        ingredients: ['Oat base', 'Strawberries', 'Sugar', 'Corn starch', 'Live cultures'],
        nutrition: { calories: '130 kcal', fat: '4.5g', carbs: '20g', fiber: '2g', protein: '3g', calcium: '200mg', vitaminD: '2mcg' }
      }
    ]
  },
  {
    id: 'ice-cream',
    slug: 'ice-cream',
    name: 'Ice Cream',
    tagline: 'Decadent frozen oat dessert in pints.',
    description: 'Rich, fudgy, plant-based frozen pints made with Oatly oat cream.',
    color: 'bg-[#002766] text-white',
    badge: 'INDULGENT',
    items: [
      {
        id: 'ice-cream-fudge-brownie',
        name: 'Oat Frozen Dessert Chocolate Fudge',
        slug: 'oat-frozen-dessert-chocolate-fudge',
        category: 'Ice Cream',
        volume: '1 Pint (473 ml)',
        climateFootprint: '0.78 kg CO2e / kg',
        tagline: 'Decadent chocolate fudge oat ice cream.',
        description: 'Folded with Fairtrade cocoa and chewy chocolate brownie bits.',
        badge: 'INDULGENT',
        ingredients: ['Oat base', 'Coconut oil', 'Sugar', 'Cocoa powder', 'Fudge bits'],
        nutrition: { calories: '220 kcal', fat: '12g', carbs: '26g', fiber: '2g', protein: '2g', calcium: '100mg', vitaminD: '0mcg' }
      }
    ]
  }
];

export const newsItems = [
  {
    id: 'pee-for-the-planet',
    slug: 'pee-for-the-planet',
    title: 'Pee for the Planet',
    type: 'Initiative',
    date: 'Autumn 2025',
    readTime: '4 min read',
    excerpt: 'How human urine might hold the key to sustainable oat agriculture in Northern Europe.',
    content: 'We teamed up with Scandinavian eco-scientists to test closed-loop natural nutrient recycling. Human urine contains essential nitrogen and phosphorus that crops crave. By collecting treated bio-nutrients from municipal facilities, we helped fertilize experimental oat fields in Sweden without synthetic fossil-fuel fertilizers. Earth approved!',
    tag: 'SUSTAINABILITY INNOVATION',
    image: 'https://a.storyblok.com/f/107921/1600x1067/3841b30322/oatly_se_2026_pee-for-the-planet_001-large.jpg'
  },
  {
    id: 'oatly-x-avavav',
    slug: 'oatly-x-avavav',
    title: 'Oatly x AVAVAV Fashion Collab',
    type: 'Collaborations',
    date: 'Winter 2025',
    readTime: '3 min read',
    excerpt: 'High fashion meets humble oats. Wearable milk cartons and giant finger boots hit the Paris runway.',
    content: 'Runway chaos! We joined hands with controversial Italian fashion house AVAVAV to launch a limited drop of sustainable upcycled oat-husk puffer coats and oversized knitwear featuring our bold typography. 100% of proceeds support regenerative agriculture funds.',
    tag: 'FASHION & DESIGN',
    image: 'https://i.vimeocdn.com/video/2129387717-5373f7f6b1f73233ee56ffa89e19167307dc37d9812287dbf49a5949a0f227fa-d_1280x720?region=us'
  },
  {
    id: 'how-do-you-say-f-a-r-m-in-canadian',
    slug: 'how-do-you-say-f-a-r-m-in-canadian',
    title: 'How Do You Say F.A.R.M. in Canadian?',
    type: 'Stories',
    date: 'Spring 2025',
    readTime: '5 min read',
    excerpt: 'Supporting Canadian farmers in transitioning from dairy feed crops to high-protein milling oats.',
    content: 'Our F.A.R.M. (Future Agriculture Renewal Movement) initiative in Saskatchewan helped 45 family farms diversify crop rotation, reducing chemical run-off while increasing soil carbon sequestration by 28%.',
    tag: 'FARMER STORIES'
  },
  {
    id: 'last-first-dates',
    slug: 'last-first-dates',
    title: 'Last First Dates Campaign',
    type: 'Stories',
    date: 'Valentine 2025',
    readTime: '3 min read',
    excerpt: 'Why switching to plant milk might be the single best icebreaker for your next Hinge date.',
    content: 'We surveyed 10,000 coffee drinkers across New York, London, and Berlin. Ordering oat milk on a first date correlated with a 42% higher probability of getting a second date. Science? Coincidence? Or just good taste?',
    tag: 'CULTURE'
  },
  {
    id: 'ef-pro-cycling',
    slug: 'ef-pro-cycling',
    title: 'EF Pro Bikers Fueled by Oats',
    type: 'Initiatives',
    date: 'Summer 2025',
    readTime: '6 min read',
    excerpt: 'How pro cyclists rode through the Tour de France powered by oat smoothies.',
    content: 'Cycling thousands of kilometers through mountains takes raw energy. EF Education-EasyPost riders refueled post-stage with high-carb Oatly rice-and-oat Recovery Shakes. The result? Stage wins and happy stomachs.',
    tag: 'SPORTS & ENDURANCE',
    image: 'https://a.storyblok.com/f/107921/1268x1268/dbd765abdf/efprobikers.webp'
  },
  {
    id: 'nespresso',
    slug: 'nespresso',
    title: 'Oatly x Nespresso Pod Partnership',
    type: 'Collaborations',
    date: 'Autumn 2025',
    readTime: '4 min read',
    excerpt: 'The official pairing for home pod coffee lovers across North America.',
    content: 'Getting thick, creamy microfoam at home is now a one-button affair. Nespresso Vertuo machines paired with Oatly Barista Edition give you cafe-quality lattes in 30 seconds flat.',
    tag: 'PARTNERSHIP'
  },
  {
    id: 'tastes-like-miami',
    slug: 'tastes-like-miami',
    title: 'Tastes like Miami',
    type: 'Stories',
    date: 'Winter 2025',
    readTime: '3 min read',
    excerpt: 'Cafecito culture meets oats at Art Basel — a love letter to Miami.',
    content: 'We parked a pastel cafecito cart in Little Havana and poured thousands of cortaditos made with Oatly Barista Edition. Between domino games and Art Basel afterparties, Miami showed us that oat milk and cafecito were always meant to be.',
    tag: 'CULTURE'
  }
];

export const sustainabilityData = {
  headline: "WE ARE A CLIMATE SOLUTIONS COMPANY THAT HAPPENS TO MAKE OAT DRINKS.",
  subtext: "Replacing animal dairy with plant-based nutrition is one of the single most effective actions individuals can take for our planet.",
  stats: [
    { label: "Lower GHG emissions vs whole cow's milk", value: "73%", sub: "Peer-reviewed ISO life-cycle assessment" },
    { label: "Lower land usage", value: "80%", sub: "Fewer acres needed per liter" },
    { label: "Products with printed climate labels", value: "100%", sub: "Transparent CO2e on packaging" }
  ],
  sections: {
    who: {
      title: "OATLY WHO?",
      slug: "oatly-who",
      copy: "Oatly was founded in the 1990s by Swedish food scientist Rickard Öste at Lund University. Using patented liquid oat enzyme technology, Öste developed a way to convert fiber-rich oats into a delicious, nutritious liquid food without requiring animal farming. Today, Oatly is available in over 20 countries worldwide."
    },
    plan: {
      title: "OATLY'S SUSTAINABILITY PLAN",
      slug: "sustainability-plan",
      pillars: [
        { title: "1. Drive Plant-Based Shift", desc: "Shifting global food consumption away from land-intensive animal agriculture." },
        { title: "2. Regenerative Agriculture", desc: "Collaborating directly with oat farmers to eliminate synthetic nitrogen fertilizers." },
        { title: "3. Clean Production & Energy", desc: "100% renewable electricity and biogas wastewater recycling across all plants." },
        { title: "4. Radical Transparency", desc: "Printing CO2e climate footprints directly on front-of-pack labels." }
      ]
    },
    footprint: {
      title: "PRODUCT CLIMATE FOOTPRINT",
      slug: "climate-footprint-product-label",
      copy: "We print climate footprint numbers directly on the front of our cartons (e.g. 0.49 kg CO2e / kg) and challenge all food manufacturers to disclose their environmental impact transparently."
    },
    solutions: {
      title: "WE'RE A CLIMATE SOLUTIONS COMPANY",
      slug: "climate-solutions-company",
      copy: "Oatly exists to make it easy for people to eat and drink what is good for them and the planet, without sacrificing taste or fun."
    }
  }
};

// ─── Real catalog override ──────────────────────────────────────────────────
// Swap each category's hand-written `items` with the real Oatly catalog
// (names + official packshots from oatly.com/products, see oatlyCatalog.js).
// Category metadata above (tagline, color, badge) is untouched — only the
// item lists are replaced, so every consumer (listing pages, modal) gets the
// real products with zero further changes.
productCategories.forEach((cat) => {
  if (OATLY_CATALOG_ITEMS[cat.slug]) cat.items = OATLY_CATALOG_ITEMS[cat.slug];
});
