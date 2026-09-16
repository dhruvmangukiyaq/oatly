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

// ─── REAL OATLY STORIES (scraped from oatly.com/things-we-do/stories) ────────
// Full stories catalog: real titles, slugs, published dates, featured images
// (a.storyblok.com) and verbatim excerpts. Bodies are condensed from the
// live articles' opening copy.
export const newsItems = [
  {
    id: 'how-do-you-say-f-a-r-m-in-canadian',
    slug: 'how-do-you-say-f-a-r-m-in-canadian',
    title: 'How Do You Say F.A.R.M. in Canadian?',
    type: 'Stories',
    date: 'November 27, 2025',
    readTime: '5 min read',
    excerpt: 'At Hanover Ridge Farms, the emphasis goes on soil health, biodiversity, and the livelihoods of its farmers.',
    content: 'When we talk about Oatly\u2019s F.A.R.M. program, we like to show our work. That might come in the form of big numbers and percentages on the sides of oat drink cartons or in publicly reminiscing about the years when we described ourselves as \u201ca sustainable company\u201d. It might also come straight from a farmer\u2019s mouth, which was precisely the case when we met Matt Wallington during our visit to Hanover Ridge Farms in Tisdale, Saskatchewan. Whenever we can get a farmer preaching soil health or fertilizer reduction out in the field, that\u2019s the message we want to amplify.',
    tag: 'FARMER STORIES',
    image: 'https://a.storyblok.com/f/107921/1019x679/cc0af9b463/hanover-ridge-farms-09418.png'
  },
  {
    id: 'oatly-runs-the-brooklyn-half-marathon',
    slug: 'oatly-runs-the-brooklyn-half-marathon',
    title: 'Oatly Runs a Half Marathon in Brooklyn',
    type: 'Stories',
    date: 'June 16, 2025',
    readTime: '4 min read',
    excerpt: 'Sort of. We spent most of our time blasting Big Dairy and citing climate-impact statistics. Only some running was involved.',
    content: 'Oatly sponsoring half marathons might seem a little strange. After all, we don\u2019t have oat drink-infused energy gels to give away (because they don\u2019t exist), and we\u2019re not in the habit of encouraging runners to spike their sports drinks with iced ube lattes. But sponsoring half marathons in response to Big Dairy sponsoring full marathons? And doing it because, in the United States, Oatly Original Oatmilk and Barista have nearly half the climate impact of comparable cow\u2019s milk? That would be a masterclass, and exactly the kind of thing we\u2019d do. So we ran one. Sort of.',
    tag: 'SPORTS & ENDURANCE',
    image: 'https://a.storyblok.com/f/107921/1080x720/c43a459b42/oatly_us_25_half_marathon_photos_mascots_original_hi5.png'
  },
  {
    id: 'last-first-dates',
    slug: 'last-first-dates',
    title: 'Last First Dates',
    type: 'Stories',
    date: 'April 11, 2025',
    readTime: '3 min read',
    excerpt: 'Maxence the French Chef lives in Copenhagen and is looking for love. That makes him a decent enough lead for our newest cooking show.',
    content: 'Maxence the French Chef lives in Copenhagen, cooks at an Italian restaurant, and is looking for love. That makes him a decent enough lead for our newest cooking show, during which the sort-of-charming, occasionally moody Max meets a rotating cast of hopeful daters. Each episode, a date and a plant-based recipe collide, and Max does his best to win a second date. The drinks are oat, the stakes are high, and the chemistry is entirely manufactured.',
    tag: 'CULTURE',
    image: 'https://a.storyblok.com/f/107921/1920x1080/88cba2b9a8/bg-maxence.png'
  },
  {
    id: 'tastes-like-miami',
    slug: 'tastes-like-miami',
    title: 'Tastes Like Miami',
    type: 'Stories',
    date: 'April 7, 2025',
    readTime: '3 min read',
    excerpt: 'To honor some of Miami\u2019s biggest legends, we made them coffee drinks out of the trunk of an old car. It went over surprisingly well.',
    content: 'WHAT DOES MIAMI TASTE LIKE? To find out, we parked a pastel-trunked old car on the streets of Little Havana and poured cafecito-inspired oat drinks for the neighborhood. Between domino games and Art Basel afterparties, Miami showed us that oat milk and cafecito were always meant to be.',
    tag: 'CULTURE',
    image: 'https://a.storyblok.com/f/107921/960x540/09f665b78a/nick_featured.png'
  },
  {
    id: 'bring-oatly-to-your-campus',
    slug: 'bring-oatly-to-your-campus',
    title: 'Bring Oatly to Your Campus',
    type: 'Stories',
    date: 'September 2, 2024',
    readTime: '4 min read',
    excerpt: 'Oatly salespeople are eager to bring oat stuff to university campuses. Invite them for a visit \u2014 the kids will love it.',
    content: 'With new fiscal quarters sneaking up on us every three months, we salespeople at Oatly believe it\u2019s time to expand our oat-based product line further into institutions of higher learning. We\u2019ve concluded, through no research of our own \u2013 more of a gut feeling \u2013 that Oatly\u2019s playful, inventive spirit aligns with that of a bright academic tossing a Frisbee on the quad (or scrolling the Tok from a dark dorm room). So: bring Oatly to your campus and see what happens.',
    tag: 'UNIVERSITY',
    image: 'https://a.storyblok.com/f/107921/1920x1281/dfc609b7fa/oatly-to-campus.jpg'
  },
  {
    id: 'oatly-crash-capitol-hill-ice-cream-party',
    slug: 'oatly-crash-capitol-hill-ice-cream-party',
    title: 'Enter the Dairy Deprogramming Zone',
    type: 'Stories',
    date: 'July 9, 2024',
    readTime: '5 min read',
    excerpt: 'Where harsh truths about Big Dairy come with a cup of Oatly Soft Serve.',
    content: 'Where harsh truths about Big Dairy come with a cup of Oatly Soft Serve. What\u2019s the reasonable amount of time it should take to deprogram hundreds of people who have been subjected to decades of dairy propaganda perpetrated by an industry that spends billions of dollars obscuring facts about its products\u2019 impact on the climate? We decided to find out \u2014 ice cream in hand.',
    tag: 'CULTURE',
    image: 'https://a.storyblok.com/f/107921/2000x1333/f33555bcf0/oatly-crash-the-capitol-hill-ice-cream-party.jpg'
  },
  {
    id: 'the-giant-oatly-carton',
    slug: 'the-giant-oatly-carton',
    title: 'The Giant Oatly Carton',
    type: 'Stories',
    date: 'January 18, 2024',
    readTime: '4 min read',
    excerpt: 'From Texas baseball stadium to high-school theater department, follow along as we give away an enormous marketing prop.',
    content: 'Some years back, Oatly partnered with a very popular baseball team from Texas. We\u2019d say which team, but we don\u2019t want to hog credit for their recent success (of which we deserve a great deal). American baseball was a little new to us at the time, and the giant structure we built to celebrate the partnership became a bit of an orphan after the season ended. That\u2019s when the Giant Oatly Carton found its true calling: a tour of high-school theater departments, tiny festivals, and anywhere else an enormous oat drink box could do some good.',
    tag: 'STUNTS',
    image: 'https://a.storyblok.com/f/107921/1920x1080/5542abf0b2/cartonleadimage.jpg'
  },
  {
    id: 'oatly-does-the-golden-spurtle',
    slug: 'oatly-does-the-golden-spurtle',
    title: 'Oatly Does the Golden Spurtle',
    type: 'Stories',
    date: 'December 6, 2023',
    readTime: '5 min read',
    excerpt: 'What do you do when you\u2019re Oatly and you discover that there\u2019s a World Porridge Making Championship in the Scottish Highlands? You show up.',
    content: 'This might come as a shock, but we don\u2019t know everything about oats here at Oatly. As it turns out, making oat drink all day is incredibly time-consuming, and the relentless oat-related news cycle can be very hard to keep up with. Still, we should\u2019ve known more about the World Porridge Making Championship that happens every year in Carrbridge, Scotland. Once we found out, there was only one reasonable response: pack the oats, book the flights, and show up for the Golden Spurtle.',
    tag: 'STUNTS',
    image: 'https://a.storyblok.com/f/107921/1600x900/55fd483479/oatlythegoldenspurtle_still_03.jpg'
  },
  {
    id: 'caroline-schiff-cooks-with-oatly',
    slug: 'caroline-schiff-cooks-with-oatly',
    title: 'Caroline Schiff Cooks with Oatly',
    type: 'Stories',
    date: 'November 6, 2023',
    readTime: '4 min read',
    excerpt: 'The New York pastry chef came up with three fall recipes that feature Oatly, and they\u2019re delicious. Trust us\u2014we tasted them.',
    content: 'Cooking with Oatly during the holiday season can be quite a festive and delightful time. But maybe you don\u2019t know just how festive and delightful it can be. So, we asked New York City pastry chef \u2013 and all-around fun human being \u2013 Caroline Schiff to come up with a few fall recipes built around Oatly. The result: Oatly Cream Cheese Apple Fritters and friends. Trust us \u2014 we tasted them.',
    tag: 'FOOD',
    image: 'https://a.storyblok.com/f/107921/1920x1080/4a12345474/caroline_01.png'
  },
  {
    id: 'the-oatly-dragster',
    slug: 'the-oatly-dragster',
    title: 'The Oatly Dragster',
    type: 'Stories',
    date: 'July 12, 2023',
    readTime: '4 min read',
    excerpt: 'When we learned an old dairy truck in Illinois had been mutated into a dragster, we asked a simple question: Will Oatly make it faster?',
    content: 'Now as fast as dairy \u2026 if not a little faster! Remember those idyllic scenes of a dairy truck ambling down your tree-lined street? The milkman in his crisp white uniform strolling to your front door to deliver milk in glass bottles? Then someone in Illinois strapped a race engine to an old dairy truck and called it a dragster. Naturally, we had one question: what would it take to make it oat-powered?',
    tag: 'STUNTS',
    image: 'https://a.storyblok.com/f/107921/1920x1080/c197629cef/dragster-featured-1080.jpg'
  },
  {
    id: 'the-farm',
    slug: 'the-farm',
    title: 'The Future Agriculture Renovation Movement',
    type: 'Stories',
    date: 'May 10, 2023',
    readTime: '5 min read',
    excerpt: 'More than just a clever acronym, the F.A.R.M. is a global initiative that works with farmers toward solutions in regenerative agriculture.',
    content: 'Welcome, loyal oat drinkers (and everyone else). More than just a clever acronym, the F.A.R.M. (Future Agriculture Renovation Movement) is Oatly\u2019s global initiative that works directly with farmers to develop regenerative agricultural solutions \u2013 crop rotation, reduced synthetic fertilizer, and soil that keeps more carbon where it belongs. Because the best oat drink in the world is only as good as the oats that go into it.',
    tag: 'FARMER STORIES',
    image: 'https://a.storyblok.com/f/107921/800x450/56d673f655/farm-featured-v2.png'
  },
  {
    id: 'the-mysteries-locked-inside-nordic-seed-vaults',
    slug: 'the-mysteries-locked-inside-nordic-seed-vaults',
    title: 'The Mysteries Locked Inside Nordic Seed Vaults',
    type: 'Stories',
    date: 'April 17, 2023',
    readTime: '6 min read',
    excerpt: 'Oatly wants to uncover what those mysteries say about oats. So does the Nordic Genetic Resource Center. Can you guess what happens next?',
    content: 'A long time ago (about 15 years), in a galaxy far, far away (Norway), a brutalist concrete vault was born from a mountain. In its depths lie the spare keys to our global food supply: seeds. Lots and lots of seeds \u2013 millions of them. The Svalbard Global Seed Vault in Longyearbyen evokes awe and bewilderment from both its visitors and anyone who can type \u201cdoomsday seed vault\u201d into an image search. A fortress of biodiversity, the vault offers an insurance policy against global disaster \u2013 and, for Oatly and the Nordic Genetic Resource Center, a chance to trace the ancestry of the oats we love.',
    tag: 'SUSTAINABILITY',
    image: 'https://a.storyblok.com/f/107921/2048x1372/c0e97cc6ca/nordgen-seedvaultexterior1.jpg'
  },
  {
    id: "dairy-free-at-the-berlinale",
    slug: "dairy-free-at-the-berlinale",
    path: "stories/dairy-free-at-the-berlinale",
    title: "Dairy-Free at the Berlinale",
    type: "Stories",
    date: "March 15, 2023",
    readTime: "3 min read",
    excerpt: "When a big international film festival takes away dairy milk, how do its attendees react? By not really noticing, it turns out.",
    content: "The Berlinale is one of the most recognizable film festivals in the world. So, imagine my surprise when I visit the red carpet and don’t see a single famous person drinking a frosty glass of milk. I’m more confused when I realize no one is sneaking spoonfuls of yogurt either, or snacking on slices of stracciatella--two totally normal things movie stars do at highly publicized film events.\n\nI suspect something is going on here, and I need to get to the bottom of it.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1920x1080/428fdbc938/dairy-free-berlinale-featured.jpg"
  },
  {
    id: "everything-you-want-to-know-about-oatlys-secret-lab-in-philadelphia",
    slug: "everything-you-want-to-know-about-oatlys-secret-lab-in-philadelphia",
    path: "stories/everything-you-want-to-know-about-oatlys-secret-lab-in-philadelphia",
    title: "Everything You Want to Know About Oatly’s Secret Lab in Philadelphia",
    type: "Stories",
    date: "February 9, 2023",
    readTime: "11 min read",
    excerpt: "Except what I can’t tell you.",
    content: "Philadelphia is known for a lot of things--pronouncing “water\" as “wooder” chief among them--but culinary innovation is not a claim to fame. Exhibit A: One of the city’s most celebrated residents is a man who made national news last year for eating a whole rotisserie chicken every day for 40 straight days.\n\nSo, it comes as a surprise to learn that Philly (it’s short for Philadelphia, everyone) is home to an “innovation lab” that develops plant-based food and drink products. My discovery occurs thanks to an Oatly marketing team, which offers me a nominal fee to learn more, as long as I sign a non-disclosure agreement (better known as an NDA in the business of being top secret.)",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1920x1277/017b0adab8/philly-innovation-lab-hero.jpg"
  },
  {
    id: "lunch-with-al",
    slug: "lunch-with-al",
    path: "stories/lunch-with-al",
    title: "Lunch With Al",
    type: "Stories",
    date: "January 27, 2023",
    readTime: "5 min read",
    excerpt: "He’s been eating Jewish deli for more than 80 years. We asked him to try vegan corned beef. This is what happened.",
    content: "Al Weinberg is 89 years old. Over the course of those 89 years, Al has eaten a lot of Jewish deli food.\n\nAnd with maturity comes wisdom. Al is also wise. But Al’s wisdom had not prepared him for the trend of vegan delis and butchers popping up all over the place (Seitan’s Helper in Brooklyn, Faux Butcher in Nottingham, just to name a couple). How do I know? Easy. He had no clue there was a deli reimagining traditional Jewish fare right in his Chicago backyard.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1440x1000/e228be95c1/lunch-with-al-hero.jpg"
  },
  {
    id: "long-ago-horses-were-tractors-and-oats-were-gas",
    slug: "long-ago-horses-were-tractors-and-oats-were-gas",
    path: "stories/long-ago-horses-were-tractors-and-oats-were-gas",
    title: "Long Ago, Horses Were Tractors and Oats Were Gas",
    type: "Stories",
    date: "January 13, 2023",
    readTime: "5 min read",
    excerpt: "It’s about American farming in the early 20th century. Read on, it’ll make sense soon.",
    content: "Let’s say you are an oat. Or better yet, a handful of oats. It’s the 1920s, and things are going well in the country where you grew up: the United States. World War I is in the rearview mirror, the Great Depression is somewhere up ahead. The decade is roaring.\n\nYour life is short--that’s the drawback--but it’s meaningful. You’ve grown up from seed. You’ve been scythed, dried, threshed, and winnowed, and now destiny approaches ... You’re about to be swallowed by a horse. One part of you will be ejected in a familiar form out the other end of the animal. Another will be altered into something more spectacular than a pile of horse sh*t. You’ll become energy, the stuff the horse uses all day working in the field. What a calling!",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1600x900/9b071ccf64/when-oats-were-gas-featured.jpg"
  },
  {
    id: "what-we-learned-at-cop-27-and-what-we-didnt",
    slug: "what-we-learned-at-cop-27-and-what-we-didnt",
    path: "stories/what-we-learned-at-cop-27-and-what-we-didnt",
    title: "What We Learned at COP 27 (and What We Didn’t)",
    type: "Stories",
    date: "January 10, 2023",
    readTime: "9 min read",
    excerpt: "The food system finally played a key role, but our esteemed Oatly correspondent was left wanting more.",
    content: "In November, Oatly attended the United Nations Climate Change Conference for the second time. Some might consider that the start of a streak until they realize this was Climate COP number 27 and the first one dates way back to 1995 (when we were but a wee oat-drink brand).\n\nThe core of COP consists of intricate climate negotiations, but for those who may not know, there are also dozens of pavilions that host panel discussions and debates between representatives of national delegations, trade organizations, and coalitions. It’s a little like a trade show of climate-change philosophies and commitments.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1920x1280/dd00cfc2c0/learned-cop27-entrance.jpg"
  },
  {
    id: "when-an-oat-latte-is-illegal",
    slug: "when-an-oat-latte-is-illegal",
    path: "stories/when-an-oat-latte-is-illegal",
    title: "When an Oat Latte Is Illegal",
    type: "Stories",
    date: "November 28, 2022",
    readTime: "6 min read",
    excerpt: "A barista just had to smuggle oat drink into a coffee competition. It shouldn't be this way.",
    content: "An act of protest can look like anything: pea soup on a painting, a hand superglued to a basketball court...or bottles of oat drink smuggled into a coffee competition.\n\nThe last one was Mikolaj Pociecha’s move at the German Barista Championships in Frankfurt earlier this fall. The head roaster and head of quality control at SUEDHANG Kaffee in Tübingen, Mikolaj (or Mik for short) took issue with a competition rule put in place by the Specialty Coffee Association (SCA), the nonprofit trade association that presents a number of international coffee events. The rule is as follows: cow’s milk only.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1600x900/fbf6cfd980/oat-latte-illegal-featured.png"
  },
  {
    id: "design-by-bulent",
    slug: "design-by-bulent",
    path: "stories/design-by-bulent",
    title: "Design By Bulent",
    type: "Stories",
    date: "November 23, 2022",
    readTime: "2 min read",
    excerpt: "Meet Bulent Aslan, the London deli owner and genius designer, creating art out of Oatly cartons.",
    content: "The Grand Designs of Bulent Aslan’s Camia Deli\n\nBulent Aslan may not be a name you hear listed among the world’s top interior designers, but in the very, very niche world of “Top Interior Designers Who Use Oatly Cartons As Wallpaper”, he is frequently cited as a global visionary. So of course we shamelessly invited ourselves into his London deli, Camia, and brought a camera operator, a producer, a director, a production assistant, and dozens of release forms.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1920x1080/4b256a1027/featured-image-deli.jpg"
  },
  {
    id: "boatly",
    slug: "boatly",
    path: "stories/boatly",
    title: "The U.S.S. Boatly",
    type: "Stories",
    date: "November 23, 2022",
    readTime: "2 min read",
    excerpt: "In the summer of 2022, a Colorado man named Nate had a vision: A boat made out of Oatly cartons. This is his story.",
    content: "A story about a boat. A story about goodbyes.\n\nThe greatest engineering minds of the past half century have catapulted humankind into unthinkable new worlds: space exploration, artificial intelligence, quantum computing. But some of those brilliant engineering minds have taken different, arguably more impressive paths…",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1920x1080/f7dd49b4d0/featured-image-boatly.jpg"
  },
  {
    id: "berte-qvarn",
    slug: "berte-qvarn",
    path: "stories/berte-qvarn",
    title: "You Asked for It, We Listened. Here Are Photos of an Oat Mill in Sweden.",
    type: "Stories",
    date: "November 17, 2022",
    readTime: "4 min read",
    excerpt: "Please don’t say we never gave you anything.",
    content: "At Oatly, we love engaging with our community of oat drinkers. And we think we’re pretty reliable about hearing (and even deeply internalizing) your comments. A lot of them are great. Some of them are not so great. A small percentage of them tell us to go f*ck ourselves. But this is the business we’ve chosen.\n\nWe also recognize when there’s an elephant in the room. And in every LinkedIn reply, every Instagram comment, we sense an undercurrent of curiosity about one thing in particular. And the time has come to address it: Yes, we’re finally going to show you what the inside of an oat mill in Sweden looks like.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1920x1080/7231a58ad9/berte-qvarn-featured.jpg"
  },
  {
    id: "state-of-denial",
    slug: "state-of-denial",
    path: "stories/state-of-denial",
    title: "State of Denial",
    type: "Stories",
    date: "November 16, 2022",
    readTime: "6 min read",
    excerpt: "In the ’80s and ’90s, U.S. states overwhelmingly anointed milk as their beverage of choice—even when it didn’t make any sense.",
    content: "In the event that someone demands you name an official symbol of your state—which, FYI, is a strong sign you’re in a doomed conversation—here’s a quick tip: Say your state beverage is milk. You have a nearly 50 percent chance of being right. Decent odds.\n\nIt’s true: Of the 30 states that happen to have official state beverages, 20 of them have chosen milk. For Wisconsin, aka America’s Dairyland (says so right there on the license plate), this makes at least practical sense. For states not particularly well known for their large population of dairy cows, like Louisiana or North Carolina, the logic is more…mysterious.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1600x900/b5a89908ce/state-of-denial-featured.png"
  },
  {
    id: "least-relevant-comments",
    slug: "least-relevant-comments",
    path: "stories/least-relevant-comments",
    title: "Least Relevant Comments",
    type: "Stories",
    date: "November 16, 2022",
    readTime: "4 min read",
    excerpt: "Descend deep into social media commentary about meat alternatives at chain restaurants. Find hell.",
    content: "Since the dawn of time, people have made their marks using whatever resources they had. From the stone etchings of the ancient Romans to the silk tapestries of the Tang Dynasty, cultural artifacts tell the stories of those who made them.\n\nConsider, in turn, the humble Facebook or Instagram comments section. In more ways than one, these are our etchings, our tapestries. Thousands of years from now, as researchers put together the story of our time, they’ll look at a comment on a restaurant chain’s Facebook page decrying a vegan sausage patty and wonder how this all came to be.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1600x900/9b0497b15e/least-relevant-comments-featured.png"
  },
  {
    id: "does-this-scot-know-oats-best",
    slug: "does-this-scot-know-oats-best",
    path: "stories/does-this-scot-know-oats-best",
    title: "Does This Scot Know Oats Best?",
    type: "Stories",
    date: "November 16, 2022",
    readTime: "7 min read",
    excerpt: "Probably. Coinneach MacLeod fell for the humble oat because of its versatility in Scottish cuisine—and because it can spin a good yarn.",
    content: "In 2021, Coinneach MacLeod came very close to winning the Golden Spurtle, the world’s premier porridge-making championship. The competition—which, the Scottish baker and author explains, “probably isn’t as well known as the Super Bowl, but it’s a pretty big deal”—takes place every autumn in the Scottish village of Carrbridge.\n\nIt’s not just for culinary wizards, either. Past champions have included an astrophysicist and a renal specialist, as well as one honest-to-god cereal celebrity: Bob Moore, aka the Bob’s Red Mill guy. The crowded field, combined with the idyllic setting of the Scottish Highlands in autumn, only contributed to MacLeod’s distress.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1600x900/8394033cf0/scot-oats-featured.png"
  },
  {
    id: "shove-your-vegan-burgers-up-your-arse",
    slug: "shove-your-vegan-burgers-up-your-arse",
    path: "stories/shove-your-vegan-burgers-up-your-arse",
    title: "“Shove Your Vegan Burgers Up Your Arse”",
    type: "Stories",
    date: "November 16, 2022",
    readTime: "9 min read",
    excerpt: "And other words of wisdom from my trip to a Forest Green Rovers football game.",
    content: "It’s a crisp, sunny Saturday in late September, and I’m wrapped snug in a puffer jacket watching footballers in bright kits scurry around a pitch. They hurl complaints at the ref between taking corners. Fans shout commands like “Pressure!” and “Sort it out!” to no avail. The smell of chips wafts through the stadium as everyone braces themselves for a nail-biter—or a boring 0-0 draw. Either way, it’s a familiar experience. As a lifelong Arsenal supporter, I’ve spent my fair share of Saturday afternoons with my dad living the highs and lows (and low lows) of football fandom. I’ve just never been commissioned by an oat drink company to soak in the scene before—so, that’s a new wrinkle.\n\nWhich makes today a little different on a couple of levels. (Why would I be here otherwise?!) First, as mentioned, the oat drink company bit...strange. Second, I’m at New Lawn Stadium in Stroud—which is perched atop a hill in England’s Gloucestershire countryside—watching the world’s very first vegan, carbon-neutral football club play a football game.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1600x900/f6a4899f46/forest-green-featured.png"
  },
  {
    id: "otley",
    slug: "otley",
    path: "stories/otley",
    title: "Oatly in Otley",
    type: "Stories",
    date: "August 25, 2022",
    readTime: "2 min read",
    excerpt: "We love Oatly. They love Otley. We met at the 211th Otley Farm Show in West Yorkshire, England. Things got confusing.",
    content: "A charming and confusing journey to West Yorkshire\n\nThe Annual Otley Show, held in Otley, a charming market town in West Yorkshire, is a historic event dating back to 1796 and is believed to be the longest-running single-day agricultural event in the UK.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/3840x2160/f2fd843b19/oatly-in-otley.jpg"
  },
  {
    id: "teareport",
    slug: "teareport",
    path: "stories/teareport",
    title: "The Tea Report",
    type: "Stories",
    date: "June 17, 2022",
    readTime: "5 min read",
    excerpt: "We heard that OATLY might taste like Satans diarrhea in tea. So we went to investigate this further by asking the tea experts themselves- the British public.",
    content: "ALL THE NEWS THAT’S FIT TO DRINK\n\nA journey into British tea culture and the quest to answer one simple question: Is Oatly sh*t in tea?",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1200x630/534d4b806d/featured-image.jpg"
  },
  {
    id: "oatly-lake",
    slug: "oatly-lake",
    path: "stories/oatly-lake",
    title: "Oatly Lake",
    type: "Stories",
    date: "January 13, 2022",
    readTime: "7 min read",
    excerpt: "In the heart of Northern Michigan, hidden in a dense cedar forest in the small town of Mesick, lies a little-known body of water called Oatly Lake.",
    content: "A Swedish oat drink company finds an obscure lake in Michigan that shares its name. What happens when they finally decide to go there?\n\nIn the heart of the American Midwest, 30 miles east of Lake Michigan, there’s a town called Mesick. And in this Michigan town of 366 residents is a lake hidden in a dense cedar forest. The name of this lake just happens to be Oatly Lake. And for those who reached this web page by complete accident while in the throes of a deep internet wormhole, Oatly happens to be the name of our company. You’re currently on our website.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2048x1152/6cc7e71327/temp-featured-image-oatly-lake.jpg"
  },
  {
    id: "project-fearless",
    slug: "project-fearless",
    path: "stories/je-ne-sais-quoi/project-fearless",
    title: "Project Fearless",
    type: "Stories",
    date: "January 3, 2022",
    readTime: "7 min read",
    excerpt: "After burning out in her advertising career, Mérida Miller decided it was time for a change. She founded Project Fearless (PF) in 2019, an after-school program in Amsterdam dedicated to empowering girls through skateboarding, boxing, science, and “artivism.”",
    content: "“Why weren’t we taught this at a young age? Why didn’t we grow up thinking, ’If I fail, okay. I’m going to go do it again.’”\n\nAfter burning out in her career, Mérida Miller decided it was time for a change. Her search for a more meaningful day-to-day led her to found Project Fearless (PF) in 2019, an after-school program in Amsterdam dedicated to empowering girls through skateboarding, boxing, science, and “artivism.” Today, 91 girls (or those who identify as female) aged 9 to 14 take part in PF every week.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2500x1406/cedb1deb58/jnsq-award-project-fearless.jpg"
  },
  {
    id: "hey-barista",
    slug: "hey-barista",
    path: "stories/hey-barista",
    title: "Hey Barista",
    type: "Stories",
    date: "November 9, 2021",
    readTime: "3 min read",
    excerpt: "The coffee world is home to the most interesting people we know. Hey Barista is a place built for those people’s opinions, musings, art, ideas and randomness.",
    content: "An online magazine from the global coffee community\n\nIn this wild and unpredictable world, there are only a handful of universal truths we can be sure of. One of them, if you’ll allow an oat drink company to get philosophical for a moment, is this…",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1140x642/a5bc5eebdb/hey-barista-hero-featured.jpg"
  },
  {
    id: "black-queer-travel-guide",
    slug: "black-queer-travel-guide",
    path: "stories/je-ne-sais-quoi/black-queer-travel-guide",
    title: "Black queer travel guide",
    type: "Stories",
    date: "October 1, 2021",
    readTime: "6 min read",
    excerpt: "The world is your oyster: travel guides prove it. They show that beautiful and exotic destinations across the world are accessible to all. But who are they catering for, really?",
    content: "“SELFISHLY, THIS IS SOMETHING I’VE ALWAYS WANTED. TO MEET MEMBERS OF MY EXTENDED BLACK QUEER COMMUNITY, GET A GLIMPSE AND THEREBY FEEL AT HOME - EVEN IF IT’S JUST FOR A WEEK.”\n\nThe world is your oyster: travel guides prove it. They show that beautiful and exotic destinations across the world are accessible to all. But who are they catering for, really? For Black Queer travelers, some destinations are off the map. There are places where they’re not welcome, it might be unsafe, or their sexuality and relationship are criminalised. And that’s where it all began for Paula Akpan, Founder of The Black Queer Travel Guide.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/5dacf49e7b/jnsq_bqtg_edits-9.jpg"
  },
  {
    id: "project-hiu",
    slug: "project-hiu",
    path: "stories/je-ne-sais-quoi/project-hiu",
    title: "Project hiu",
    type: "Stories",
    date: "May 2, 2021",
    readTime: "9 min read",
    excerpt: "Madison Stewart, also known as Shark Girl, has come out of the water for her toughest challenge ever: changing the shark fin industry by empowering fishermen.",
    content: "Madison Stewart, also known as Shark Girl, has come out of the water for her toughest challenge ever: changing the shark fin industry by empowering fishermen.\n\n“Shark Girl” might sound like the name of a somewhat corny superhero, but for those who know Madison Stewart, it’s not an exaggeration. She began swimming with sharks when she was 12, started petitions and wrote letters to decision-makers regarding the illegal shark fishing trade when she was 14 and starred in her first documentary at age 18.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/d3262c1448/project-hiu-header.jpg"
  },
  {
    id: "tiny-pop-up-munich",
    slug: "tiny-pop-up-munich",
    path: "stories/je-ne-sais-quoi/tiny-pop-up-munich",
    title: "Tiny pop up Munich",
    type: "Stories",
    date: "April 2, 2021",
    readTime: "5 min read",
    excerpt: "A sustainability expert and his friends built a tiny house as an answer to a big question: How can we make our living more sustainable?",
    content: "A sustainability expert and his friends built a tiny house as an answer to a big question: How can we make our living more sustainable?\n\nBoris Lebedev has three jobs. One of them is giving lectures on sustainability at the local university. The second one is landscaping—which usually happens after his lectures—and involves climbing trees to trim where the machines can’t reach.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/fc286b402e/tiny-pop-up-munich.jpg"
  },
  {
    id: "james-cahill-bruno-lacey-climate-change-the-game",
    slug: "james-cahill-bruno-lacey-climate-change-the-game",
    path: "stories/je-ne-sais-quoi/james-cahill-bruno-lacey-climate-change-the-game",
    title: "Climate change game",
    type: "Stories",
    date: "March 2, 2021",
    readTime: "7 min read",
    excerpt: "A shared interest in fighting climate change and an appreciation for dark humor served as the inspiration for a common project: Climate Change the Game.",
    content: "“This world is going to shit. What are we going to do to help?”\n\nJames Cahill and Bruno Lacey met through mutual friends in London, and quickly discovered two things in common: a shared interest in fighting climate change and an appreciation for dark humor. Those shared interests served as the inspiration for their newest project: Climate Change the Game.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/290f68fe53/james-cahill-header.jpg"
  },
  {
    id: "for-purpose-jobs",
    slug: "for-purpose-jobs",
    path: "stories/je-ne-sais-quoi/for-purpose-jobs",
    title: "For purpose jobs",
    type: "Stories",
    date: "February 2, 2021",
    readTime: "5 min read",
    excerpt: "Olivia Spaethe felt her career was missing a connection to the issues she cared about most: social and environmental activism. The solution? For Purpose Jobs.",
    content: "“YOU DON'T NEED TO BE A SCIENTIST OR AN ENGINEER OR A CONSULTANT TO BE A PART OF ENVIRONMENTAL OR SOCIAL CHANGE.”\n\nAfter searching for a job that would make the world a better place and pay the bills, Olivia Spaethe founded For Purpose Jobs. The jobs platform is fostering a growing community of people who are hungry for change.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/69b6987bef/olivia-spaethe-header.jpg"
  },
  {
    id: "akuko",
    slug: "akuko",
    path: "stories/je-ne-sais-quoi/akuko",
    title: "AKUKO",
    type: "Stories",
    date: "January 2, 2021",
    readTime: "5 min read",
    excerpt: "After spending the majority of his life outside the continent he was born in, Arinze started Akuko, a company celebrating African culture through socks.",
    content: "“SINCE MY SOCKS ARE ALREADY A CONVERSATION STARTER, WHY NOT USE IT AS A MOMENT OF ENLIGHTENMENT?”\n\nAfter spending the majority of his life outside the continent he was born in, Arinze Emegoakor started Akuko, a company celebrating Nigerian and African culture through socks.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/e36eff248e/arinze-emegoakor-header.jpg"
  },
  {
    id: "the-activist-grannies-helsinki",
    slug: "the-activist-grannies-helsinki",
    path: "stories/je-ne-sais-quoi/the-activist-grannies-helsinki",
    title: "The activist grannies, Helsinki",
    type: "Stories",
    date: "December 2, 2020",
    readTime: "5 min read",
    excerpt: "After these four grandmothers retired, they started new careers in climate activism. Now they’re known all over Finland as the Activist Grannies.",
    content: "“When I retired I still wanted to use my knowledge, skills and network. At the same time, there was this growing discussion about the climate and a frustration that nothing was happening”\n\nAfter these four grandmothers retired, they started new careers in climate activism. Now they’re known all over Finland as the Activist Grannies.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/ba4a8e65ec/activist-grannies-header.jpg"
  },
  {
    id: "nordic-ocean-watch-norway",
    slug: "nordic-ocean-watch-norway",
    path: "stories/je-ne-sais-quoi/nordic-ocean-watch-norway",
    title: "Nordic ocean watch",
    type: "Stories",
    date: "October 2, 2020",
    readTime: "6 min read",
    excerpt: "Simen Knudsen is the founder of Nordic Ocean Watch, a non-profit organizaiton that’s giving people a tangible and inspiring entry into thinking big about cleaning up the planet by hand-picking small pieces of plastic out of the ocean.",
    content: "CLEANING BEACHES LIKE THEY’RE BRUSHING THEIR TEETH: NORDIC OCEAN WATCH\n\nSurfer Simen Knudsen couldn’t help but notice all the pollution on his ”playground” aka, the Norwegian Coastline. And in 2013, he decided to do something about it by teaming up with fellow surfer, Vilma Havas, to create a community dedicated to cleaning up the massive amounts of trash brought to the Nordics by the Gulf Stream. And just like that, Nordic Ocean Watch was born. Simen humbly describes this community he founded as surfing and paddling combined with beach cleaning, but Nordic Ocean Watch has become a bit of a movement",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/775x436/a54250adaa/ocean-watch.jpg"
  },
  {
    id: "kimberly-renee-food-love",
    slug: "kimberly-renee-food-love",
    path: "stories/je-ne-sais-quoi/kimberly-renee-food-love",
    title: "Food love",
    type: "Stories",
    date: "October 2, 2020",
    readTime: "6 min read",
    excerpt: "When coronavirus hit the US, Kimberly asked herself, ”How can I help?” The answer: Food Love, a project delivering free, plant-based foods to people in need.",
    content: "When Coronavirus hit the US, Kimberly Renee asked herself, “What can I do to help?\"\n\nIt didn't take long for the self-taught, plant-based chef to answer that question in a big way. She put her media and marketing consultancy Might Be Vegan to work by kicking off a powerful campaign called Food Love, which delivers free, plant-based foods to people in need. Kimberly launched the campaign on her own at the end of April. The following month, she successfully recruited several partner meal delivery brands and 17 volunteers, who then teamed up with thousands of social workers across the US to direct meals to suitable recipients in the contiguous 48 states and Washington, DC.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/363x227/08a345dd98/kimberly-renee.png"
  },
  {
    id: "turn-and-flow-london",
    slug: "turn-and-flow-london",
    path: "stories/je-ne-sais-quoi/turn-and-flow-london",
    title: "Turn and flow, London",
    type: "Stories",
    date: "August 2, 2020",
    readTime: "7 min read",
    excerpt: "This is Kimberley Dobney and Ciara Shine of Turn and Flow, a start-up that’s developing a recycling system for organic menstrual care products.",
    content: "“YOUR PERIOD IS YOUR PERIOD, THERE’S NOTHING YOU CAN DO ABOUT IT. SO WE’D LIKE TO BRING PEOPLE TOGETHER AND SHIFT PERSPECTIVES A LITTLE BIT.”\n\nKimberley Dobney and Ciara Shine of Turn and Flow are doing something truly amazing for both equality and for the planet. This is a start-up that’s developing a recycling system for organic menstrual care products. Their goal is to turn the products into useful things like renewable energy, instead of landfill. Simple, right? Of course not. Back in February, we spent some time with Kimberley and Ciara at their apartment in London to find out more about the work they are doing. Here is some of that conversation:",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/363x227/454c91eb64/turn-flow.png"
  },
  {
    id: "soap-for-a-cause-spokane-washington",
    slug: "soap-for-a-cause-spokane-washington",
    path: "stories/je-ne-sais-quoi/soap-for-a-cause-spokane-washington",
    title: "Soap for a cause",
    type: "Stories",
    date: "June 2, 2020",
    readTime: "5 min read",
    excerpt: "Donovan Smith, 17, started making soap for the homeless when he was just 11 yo, and has been supporting homeless shelters with his homemade soaps ever since.",
    content: "”I know how it feels to be homeless, and at the end of the day I just do what I can. ”\n\nDonovan Smith, 17, is a pretty extraordinary person. He started making soap for the homeless when he was just 11 years old, and has been supporting homeless shelters with his homemade soaps ever since.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/363x227/9a21a52243/soap-cause.png"
  },
  {
    id: "labyrinth-kindermuseum-berlin",
    slug: "labyrinth-kindermuseum-berlin",
    path: "stories/je-ne-sais-quoi/labyrinth-kindermuseum-berlin",
    title: "Labyrinth Kindermuseum Berlin",
    type: "Stories",
    date: "March 2, 2020",
    readTime: "7 min read",
    excerpt: "Labyrinth Kindermuseum is a place that encourages change by teaching kids about important issues like the climate crisis, in fun and engaging ways.",
    content: "EMPOWERING KIDS TO SEE THEMSELVES TAKING THE LEAD IN THE CLIMATE CRISIS: LABYRINTH KINDERMUSEUM\n\nUrsula Pischel is pretty great. She has been working to make Labyrinth Kindermuseum a place that encourages change by teaching kids about important issues like the climate crisis, in fun and engaging ways. We recently got a chance to meet Ursula at this wonderful museum in Berlin’s Wedding district and hear more about her passion for opening kids’ minds to all that they can do in the world. Here is some of that conversation:",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/5d3ed7d20c/kinderjnsq-29.jpg"
  },
  {
    id: "grim",
    slug: "grim",
    path: "stories/je-ne-sais-quoi/grim",
    title: "Grim",
    type: "Stories",
    date: "February 2, 2020",
    readTime: "8 min read",
    excerpt: "Is there a food subscription start-up that fights food waste by creating a market for farmers to sell quality produce that supermarkets won’t buy? Yes! Grim!",
    content: "“IN THE EU, 54 MILLION TONS OF PRODUCE IS WASTED EVERY YEAR BEFORE IT EVEN LEAVES THE FARM. THAT’S 20-40% OF TOTAL PRODUCE BEING DISCARDED JUST BECAUSE OF MINOR VISUAL IMPERFECTIONS.”\n\nThis is Petra Kaukua and Carolin Schiemer, founders of GRIM, a food subscription start-up that fights food waste by creating a market for farmers to sell quality produce that supermarkets won’t buy.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2550x1667/fbf6682d48/grim-header.jpg"
  },
  {
    id: "hart-club",
    slug: "hart-club",
    path: "stories/je-ne-sais-quoi/hart-club",
    title: "Hart Club",
    type: "Stories",
    date: "January 2, 2020",
    readTime: "9 min read",
    excerpt: "Hart Club inclusively represents neurodivergent artists so that they can make and exhibit work as a means of building confidence, community and wellbeing.",
    content: "“PEOPLE ARE TRYING TO FIND WAYS TO FEEL A SENSE OF COMMUNITY AND TO DO SOMETHING THAT COMES FROM A PLACE OF LOVE RATHER THAN BEING DRIVEN FROM A PLACE OF DOING IT BECAUSE YOU NEED TO GET A CERTAIN AMOUNT OF MONEY.”\n\nThis is founder Helen Ralli and collaborator Oliver Clarke of Hart Club, a South East London gallery championing neurodiversity within the Arts. To be more specific, Hart Club inclusively represents neurodivergent artists so that they can make and exhibit work as a means of building confidence, community and wellbeing. And yes, it’s as amazing as it sounds. We recently got the opportunity to talk with Helen and Oliver while touring the Hart Club gallery and studio, and here’s some of that conversation:",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2500x1667/263c5df9a4/hart-club-header.jpg"
  },
  {
    id: "harris-edelman-ombligo-usa",
    slug: "harris-edelman-ombligo-usa",
    path: "stories/je-ne-sais-quoi/harris-edelman-ombligo-usa",
    title: "Harris Edelman - Ombligo",
    type: "Stories",
    date: "December 2, 2019",
    readTime: "7 min read",
    excerpt: "Ombligo helps other companies reduce their electronic waste through sustainable IT asset management, refurbishment and recycling. That’s what we call a win-win!",
    content: "This is Harris Edelman, founder and CEO of Ombligo, a New York City-based computer hardware company that helps other companies reduce their electronic waste through sustainable IT asset management, refurbishment and recycling. We recently sat down with Harris in his Brooklyn offices to discuss running a small business that promotes a circular economy. Here’s some of that conversation:\n\nHarris: I wanted to work at a company that lived and breathed what it believed. The challenge I had was that I couldn’t find one, so I created one. Ombligo was formed to maximize value and minimize risk (for example, environmental and data security risk) from used and out-of-service IT hardware. Ombligo means “belly button” in Spanish. Why belly button? We assign human characteristics to most computer parts. The central processing unit (CPU) is the brain, monitors have arms, and keyboards have feet—but there is no belly button because computers are made, not born. So we are the belly buttons, testing and refurbishing these computers.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2500x1667/77f9a08c76/harris-edelman-header.jpeg"
  },
  {
    id: "depcb",
    slug: "depcb",
    path: "stories/je-ne-sais-quoi/depcb",
    title: "DePCB",
    type: "Stories",
    date: "November 2, 2019",
    readTime: "7 min read",
    excerpt: "DePCB is a group of students in Gothenburg who are conducting a research project with the goal to break down the environmentally toxic substance PCB.",
    content: "“if our project can help find a good, cheap solution to removing PCB, we'll be helping to solve a major challenge.”\n\nTilia Selldén and Tim Eckerström, are members of DePCB which is a group of eight students from Chalmers University of Technology and University of Gothenburg who are conducting a research project in the field of synthetic biology which involves the use of baker’s yeast and enzymes to break down the environmentally toxic substance PCB. If you followed all of that, you might want to check out DePCB as they compete at the upcoming International Genetically Engineered Machine competition in Boston. And even if you didn’t follow all of that, you may still want to check out this interview we did with Tilia and Tim:",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2500x1667/eecd66bf06/depcb-header.jpg"
  },
  {
    id: "turning-tables",
    slug: "turning-tables",
    path: "stories/je-ne-sais-quoi/turning-tables",
    title: "Turning tables",
    type: "Stories",
    date: "October 2, 2019",
    readTime: "8 min read",
    excerpt: "A non-profit organization that encourages young people by offering a platform to express themselves through film and music. Yes, it is as amazing as it sounds.",
    content: "“Being more accepting and forgiving than many other institutions gives us access to kids who don’t usually get to participate in these kinds of spaces.”\n\nThis is Anna Schori and Mark Ephraim, of Turning Tables Sweden, a non-profit organization that builds creative spaces to encourage marginalized young people by offering a platform to express themselves through film and music. Yes, it is as amazing as it sounds. So we recently spent time with Anna and Mark in their Turning Tables caravan studio which is designed with one goal in mind — to build a community, neighborhood by neighborhood, all across Sweden. Here is some of that conversation.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1700x1134/ef71a26b0d/turning-tables-header.jpg"
  },
  {
    id: "wildlife-biologist",
    slug: "wildlife-biologist",
    path: "stories/je-ne-sais-quoi/wildlife-biologist",
    title: "Wildlife biologist",
    type: "Stories",
    date: "September 1, 2019",
    readTime: "8 min read",
    excerpt: "For over 20 years, Melanie has been dedicated to providing research that protects wildlife—no wonder we are amazed by her commitment to making a difference.",
    content: "“All of a sudden, I’m holding a golden eagle that’s almost as big as I am, and I’m using all my strength to hold it.”\n\nThis is Melanie Madden, a wildlife biologist and golden eagle conservationist in San Diego, California. Every day for over 20 years, Melanie has been dedicated to providing research that protects wildlife. She is our Je Ne Se Quois of the Month because we are amazed by her commitment to making a difference for the planet and the animals who live here. We recently got to go out in the field with her and talk golden eagles, science and punk rock, and here is some of that conversation.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1600x1067/c28e9195af/wildlife-biologist-header.jpg"
  },
  {
    id: "hej-hej-mats",
    slug: "hej-hej-mats",
    path: "stories/je-ne-sais-quoi/hej-hej-mats",
    title: "Hej hej mats",
    type: "Stories",
    date: "August 2, 2019",
    readTime: "7 min read",
    excerpt: "This is Anna and Sophie, co-founders of a really forward-thinking company called hejhej-mats. It’s a sustainability brand in Germany that makes “closed loop” yoga mats. Their goal is to reduce the amount of waste on the planet and promote more responsible consumption.",
    content: "“WE TRY TO MAKE EVERY DECISION AND SOLVE EVERY PROBLEM AS SUSTAINABLY AS POSSIBLE, WHILE THINKING ABOUT HOW TO GET SOMETHING POSITIVE OUT OF THE SITUATION.”\n\nThis is Anna and Sophie, co-founders of a really forward-thinking company called hejhej-mats. It’s a sustainability brand in Germany that makes “closed loop” yoga mats. Their goal is to reduce the amount of waste on the planet and promote more responsible consumption — sounds good to us. So we recently spent time with Sophie and Anna in Nuremberg where their mats are made and shipped, and here is some of that conversation.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2500x1667/64aa840731/hej-hej-mats-header.jpg"
  },
  {
    id: "adapt",
    slug: "adapt",
    path: "stories/je-ne-sais-quoi/adapt",
    title: "Adapt",
    type: "Stories",
    date: "July 4, 2019",
    readTime: "7 min read",
    excerpt: "Josie Tucker and Richard Ashton, the founders of Adapt, use design, humor and contemporary culture to communicate climate crisis issues in a solutions-based way.",
    content: "“CLIMATE CHANGE IS A REALLY SERIOUS SUBJECT BUT YOU DON’T HAVE TO BE SERIOUS ABOUT IT — YOU CAN STILL ACT POSITIVELY AND HAVE A GOOD TIME DOING IT.”\n\nThis is Josie Tucker and Richard Ashton, founders of what we think is an amazing environmental organization called Adapt. They use design, humor and contemporary culture to communicate climate crisis issues in a solutions-based way. We recently spent time with Josie and Richard at their offices in London, and here is some of that conversation.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2500x1667/5b2205814b/adapt-hero.jpg"
  },
  {
    id: "sunt-banana-bread",
    slug: "sunt-banana-bread",
    path: "stories/je-ne-sais-quoi/sunt-banana-bread",
    title: "Sunt banana bread",
    type: "Stories",
    date: "June 2, 2019",
    readTime: "7 min read",
    excerpt: "Laura is the founder of Sunt Banana Bread, a food sustainability brand in Amsterdam that Laura is just getting off the ground. Her goal? To end banana waste.",
    content: "“I HOPE TO SAVE THE 75 BILLION BANANAS THAT ARE THROWN AWAY EACH YEAR. NO MORE BANANA WASTE!”\n\nThis is Laura Hoogland, founder of what we think is an amazing little company called Sunt Banana Bread. It’s a food sustainability brand in Amsterdam that Laura is just getting off the ground. Her goal? To end banana waste. We recently spent time with Laura at her banana bar and at the bakery where her banana breads are made in Tholen, and here is some of that conversation.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/1140x760/7722799862/sunt-banana-bread-header.jpg"
  },
  {
    id: "bee-protector",
    slug: "bee-protector",
    path: "stories/je-ne-sais-quoi/bee-protector",
    title: "Bee protector",
    type: "Stories",
    date: "May 2, 2019",
    readTime: "7 min read",
    excerpt: "Michael and Carlos created and continue to build on their own piece of land – complete with a meadow that’s dedicated to providing a protected habitat for bees.",
    content: "“I BELIEVE OUR PROJECT IS IMPORTANT BECAUSE NATURE NEEDS HELP AND WE CAN EITHER SAFEGUARD IT OR WE CAN END IT. IT’S UP TO US.”\n\nThis is Michael Barone and Carlos Barone Cortés, creators of what we think is an important project for the planet. It’s a bio project, to be more specific, which they’ve created and continue to build and maintain on their own piece of land in Småland, Sweden – complete with a meadow that’s dedicated to providing a protected and thriving habitat for bees. We recently spent time with Carlos and Michael and here is some of that conversation.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2500x1667/9d18e35e34/bee-protectors-header.jpg"
  },
  {
    id: "hopeful-traders",
    slug: "hopeful-traders",
    path: "stories/je-ne-sais-quoi/hopeful-traders",
    title: "Hopeful traders",
    type: "Stories",
    date: "April 2, 2019",
    readTime: "7 min read",
    excerpt: "This is Charlie Wright, founder of what we think is an amazing organization called Hopeful Traders. It’s a social arts project and ethical clothing brand based in London that collaborates with artists affected by homelessness and mental illness to raise money for...",
    content: "This is Charlie Wright, founder of what we think is an amazing organization called Hopeful Traders. It’s a social arts project and ethical clothing brand based in London that collaborates with artists affected by homelessness and mental illness to raise money for charities chosen by those artists. We recently spent time with Charlie at his offices in London and here is some of that conversation.\n\nCharlie: So, initially I was just disillusioned in the job that I was doing which was working in sound for TV ads and stuff. I wasn’t really having a good time and I had this money that I had inherited and had always been really aware of how lucky I’d been, and the family I’d been born into, both financially and supportively. I always liked the idea of sharing the opportunities that I had. The more I looked into it, the people who need help (or however you want to say it) they’re not so interested in getting a hand-out. People really want opportunity, especially when it comes to artists and creatives. They want an opportunity to show their work.",
    tag: "STORIES",
    image: "https://a.storyblok.com/f/107921/2500x1666/5e9f9f853e/hopeful-traders-header.jpg"
  },
];

// ─── REAL OATLY INITIATIVES (scraped from oatly.com/things-we-do/initiatives) ─
// The full initiatives catalog as indexed on the live site: real slugs,
// titles, first-published dates, storyblok featured images and verbatim
// excerpts. Bodies are condensed from the live articles' opening copy.
export const initiativesData = [
  {
    id: 'aftertaste',
    slug: 'aftertaste',
    title: 'Aftertaste',
    type: 'Initiatives',
    date: 'June 12, 2026',
    readTime: '4 min read',
    excerpt:
      'Part forum, part drink extravaganza\u2014we brought together the best in the biz to talk about what\u2019s next in beverage.',
    content:
      'Aftertaste is our forum-turned-drink-extravaganza where the best in the beverage business gets together to talk about what\u2019s next. Part panel, part tasting, and entirely plant-based, it\u2019s our way of staying hungry \u2014 and genuinely curious \u2014 about the future of drinking.',
    tag: 'INITIATIVES',
    image: 'https://a.storyblok.com/f/107921/1920x1080/dd74e75f8e/aftertaste_website_intro_card.jpg'
  },
  {
    id: 'pee-for-the-planet',
    slug: 'pee-for-the-planet',
    title: 'Pee for the Planet',
    type: 'Initiatives',
    date: 'May 18, 2026',
    readTime: '4 min read',
    excerpt:
      'Oatly, Malm\u00f6 FF, SLU and Sanitation360 are testing whether human urine can replace fossil-based fertilizer. Meet the Pee for the Planet research project.',
    content:
      'Oatly, Swedish football club Malm\u00f6 FF, the Swedish University of Agricultural Sciences (SLU) and the sanitation company Sanitation360 are testing whether human urine can replace fossil-based fertilizers in oat cultivation. Bio-based nutrients are collected at large venues, treated, and spread on the fields that grow our oats \u2014 proof that what goes around grows around.',
    tag: 'SUSTAINABILITY INNOVATION',
    image: 'https://a.storyblok.com/f/107921/1920x1080/7857b665e8/p4tp.png'
  },
  {
    id: 'oatly-x-avavav',
    slug: 'oatly-x-avavav',
    title: 'OATLY x AVAVAV',
    type: 'Initiatives',
    date: 'March 4, 2026',
    readTime: '3 min read',
    excerpt:
      'Oatly partners with avant-garde fashion brand AVAVAV to bring bold flavor to the runway, serving signature oat-based drinks at Milan Fashion Week.',
    content:
      'Oatly partners with the avant-garde Italian fashion house AVAVAV to bring a little flavor to the runway. Signature oat-based drinks were served up during Milan Fashion Week \u2014 because if oats can hang backstage at fashion week, they can do anything.',
    tag: 'FASHION & DESIGN',
    image: 'https://a.storyblok.com/f/107921/2715x1528/47ac2c4b52/oatly-x-avavav.webp'
  },
  {
    id: 'future-of-taste',
    slug: 'future-of-taste',
    title: 'A Report on the Future of Taste',
    type: 'Initiatives',
    date: 'October 8, 2025',
    readTime: '5 min read',
    excerpt:
      'Predicting what\u2019s next in beverage culture. Flavours, numbers, trends (and guesses).',
    content:
      'What will we be drinking in five years? Our Report on the Future of Taste gathers flavour scientists, trend watchers and a few brave guessers to predict what\u2019s next in beverage culture \u2014 flavours, numbers, trends, and the occasional wild guess.',
    tag: 'REPORTS',
    image: 'https://a.storyblok.com/f/107921/1920x1080/247a194cfa/tastereportshare.png'
  },
  {
    id: 'ef-pro-cycling',
    slug: 'ef-pro-cycling',
    title: 'EF PRO BIKERS',
    type: 'Initiatives',
    date: 'October 29, 2024',
    readTime: '6 min read',
    excerpt:
      'Together with EF Pro Bikers, Oatly is slowly learning about endurance nutrition and the bonding properties of denim vests.',
    content:
      'Cycling thousands of kilometres through mountains takes raw energy. Together with EF Pro Bikers, Oatly is slowly (and happily) learning about endurance nutrition \u2014 and the bonding properties of denim vests.',
    tag: 'SPORTS & ENDURANCE',
    image: 'https://a.storyblok.com/f/107921/3000x2001/af56a497b6/ef-biker-woman.jpg'
  },
  {
    id: 'the-sca-outdated-rule',
    slug: 'the-sca-outdated-rule',
    title: 'The SCA outdated rule',
    type: 'Initiatives',
    date: 'September 21, 2022',
    readTime: '4 min read',
    excerpt:
      'The SCA continues to insist that in its World Barista Championship competition baristas must use cow\u2019s milk when preparing drinks. This makes us wonder: what year is it?',
    content:
      'The Specialty Coffee Association continues to insist that in its World Barista Championship, baristas must use cow\u2019s milk when preparing drinks. This makes us wonder \u2014 what year is it? If the rules of the world\u2019s biggest coffee competition still exclude plant-based drinks, maybe they\u2019re due for a modernisation.',
    tag: 'COFFEE',
    image: 'https://a.storyblok.com/f/107921/1920x1080/df6c6f20a0/sca_featured-image.jpg'
  },
  {
    id: 'babelsberg',
    slug: 'babelsberg',
    title: 'Babelsberg',
    type: 'Initiatives',
    date: 'September 13, 2022',
    readTime: '5 min read',
    excerpt:
      'What happens when pro-footballers switch to a plant-based diet? We teamed up with some real scientists, some proper institutions and German football club, SV Babelsberg 03, for an 8-week pilot study.',
    content:
      'What happens when pro-footballers switch to a plant-based diet? We teamed up with real scientists, proper institutions and German football club SV Babelsberg 03 for an 8-week pilot study. Spoiler: the players thrived \u2014 and the science made a strong case for plants in the team canteen.',
    tag: 'SPORTS & ENDURANCE',
    image: 'https://a.storyblok.com/f/107921/1200x630/416ae19956/babelsbergfeatured.jpg'
  },
  {
    id: 'turning-oat-residue-into-renewable-energy',
    slug: 'turning-oat-residue-into-renewable-energy',
    title: 'How to turn leftover oat waste into renewable electricity',
    type: 'Initiatives',
    date: 'May 30, 2022',
    readTime: '4 min read',
    excerpt:
      'Oatly is recycling leftover oat waste into renewable electricity in New Jersey.',
    content:
      'Our production facility in New Jersey takes the leftover oat husks and wastewater from making oat drink and feeds them into an on-site digestor, turning them into biogas and renewable electricity. Less waste, more watts.',
    tag: 'SUSTAINABILITY INNOVATION',
    image: 'https://a.storyblok.com/f/107921/1280x720/973dad415c/biodigester_169.jpg'
  },
  {
    id: 'schoolmilk',
    slug: 'schoolmilk',
    title: 'Normalize it! Isn\u2019t it time to let plant-based drinks into schools?',
    type: 'Initiatives',
    date: 'May 30, 2022',
    readTime: '4 min read',
    excerpt:
      'A campaign to let plant-based drinks into schools on the same terms as cows\u2019 milk.',
    content:
      'Kids deserve a choice. We\u2019ve been pushing to normalize plant-based drinks in schools \u2014 served on the same terms as cows\u2019 milk \u2014 so the next generation grows up knowing that climate-friendly options are just a lunch tray away.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/1920x1080/008d5e4b2c/normalize-it-thumb.jpg'
  },
  {
    id: 'silent-barista',
    slug: 'silent-barista',
    title: 'Silent Barista',
    type: 'Initiatives',
    date: 'December 2, 2021',
    readTime: '5 min read',
    excerpt:
      'One oat drink company\u2019s quest to train a new and inclusive class of Chinese baristas.',
    content:
      'The Silent Barista project trains a new, more inclusive generation of Chinese baristas \u2014 hearing-impaired graduates who can run a doorbuster of a coffee cart with total precision. It\u2019s about skills, dignity, and really good oat lattes.',
    tag: 'PEOPLE',
    image: 'https://a.storyblok.com/f/107921/2500x1406/09bcad3dd3/the-silent-barista-project-cover.jpg'
  },
  {
    id: 'the-race-to-grow-the-world-s-greatest-oat',
    slug: 'the-race-to-grow-the-world-s-greatest-oat',
    title: 'The race to grow the world\u2019s greatest oat',
    type: 'Initiatives',
    date: 'November 9, 2021',
    readTime: '5 min read',
    excerpt:
      'It\u2019s not rocket science... it\u2019s better. Rocket scientists get a lot of credit. But don\u2019t be fooled by their over-the-top launch celebrations or their fancy mission control rooms.',
    content:
      'It\u2019s not rocket science \u2014 it\u2019s better. Rocket scientists get a lot of credit, but don\u2019t be fooled by their fancy mission control rooms. Our oat breeders at Lund University research fields are growing experimental oat varieties to find the greatest oat of all: higher yields, less fertilizer, more flavor.',
    tag: 'AGRICULTURE',
    image: 'https://a.storyblok.com/f/107921/1920x1080/c6926fa060/lund-research-center-11-final.png'
  },
  {
    id: 'farmer-seeking-farmer',
    slug: 'farmer-seeking-farmer',
    title: 'Farmer seeking farmer',
    type: 'Initiatives',
    date: 'July 2, 2021',
    readTime: '4 min read',
    excerpt:
      'How can we feed more people using the same earth? Farmer Adam Arnesson and his colleagues decided to answer the question.',
    content:
      'How can we feed more people using the same earth? Farmer Adam Arnesson and his colleagues set out to answer exactly that question \u2014 pairing up with neighbors who\u2019d never tried growing oats, sharing methods, and showing that smarter farming starts with farmers teaching farmers.',
    tag: 'FARMER STORIES',
    image: 'https://a.storyblok.com/f/107921/1741x979/33ed0b906d/farmerseekingfarmers-featured-image.jpg'
  },
  {
    id: 'stop-plant-based-censorship',
    slug: 'stop-plant-based-censorship',
    title: 'Stop Plant Based Censorship',
    type: 'Initiatives',
    date: 'May 1, 2021',
    readTime: '4 min read',
    excerpt:
      'Can people mistake oat drink for being milk, really? We decided to find out \u2014 and to let the EU know the result. If they listened? Yes!',
    content:
      'Can people really mistake oat drink for milk? We decided to test it \u2014 and let the EU know the result. When plant-based alternatives lost the right to use neutral terms like \u201cbeverage\u201d on labels, we fought back with actual consumer research. And yes \u2014 they listened.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/4075x2293/44e4e7a8a8/are-you-stupid-featured-image-16x9.png'
  },
  {
    id: 'hey-food-industry',
    slug: 'hey-food-industry',
    title: 'Hey Food Industry',
    type: 'Initiatives',
    date: 'May 1, 2019',
    readTime: '4 min read',
    excerpt:
      'If you request that the whole food industry starts showing their products\u2019 climate impact, you should start by doing it yourself, right?',
    content:
      'If you\u2019re going to ask the entire food industry to print the climate impact of their products on the label, you should start by doing it yourself. So we did \u2014 printing CO2e numbers on our cartons and inviting everyone else to follow.',
    tag: 'TRANSPARENCY',
    image: 'https://a.storyblok.com/f/107921/1200x675/1f59d486e4/oatly-hey-food-industry-thumb.jpg'
  },
  {
    id: 'resurrecting-oats-in-the-us',
    slug: 'resurrecting-oats-in-the-us',
    title: 'Resurrecting Oats in the US',
    type: 'Initiatives',
    date: 'August 1, 2018',
    readTime: '5 min read',
    excerpt:
      'And how a daring group of corn and soy farmers are bringing back the Midwest\u2019s soil with an old idea.',
    content:
      'A daring group of corn and soy farmers are bringing back the Midwest\u2019s soil with an old idea: oats. By reintroducing oats into their crop rotation, they\u2019re reviving soil health, cutting synthetic fertilizer, and resurrecting a crop that once anchored the American heartland.',
    tag: 'AGRICULTURE',
    image: 'https://a.storyblok.com/f/107921/1142x642/320151323e/resurecting-oats-in-the-us.jpg'
  }
];

// ─── REAL OATLY BRAINWASHING (scraped from oatly.com/things-we-do/brainwashing) ─
// The live brainwashing catalog: real slugs, titles, first-published dates,
// storyblok featured images and verbatim excerpts. Bodies are condensed from
// the live articles' opening copy.
export const brainwashingData = [
  {
    id: 'nespresso',
    slug: 'nespresso',
    title: 'Oatly x Nespresso',
    type: 'Brainwashing',
    date: 'May 5, 2026',
    readTime: '4 min read',
    excerpt:
      'Try the new Nespresso Oatly Barista Edition Coffee Capsules! Made for oat drink lovers, with rich, biscuity notes, they pair perfectly with Oatly\u2019s oat drink. Exclusively for Nespresso Vertuo machines. Limited edition!',
    content:
      'Try the new Nespresso Oatly Barista Edition Coffee Capsules! Made for oat drink lovers, with rich, biscuity notes, they pair perfectly with Oatly\u2019s oat drink. Exclusively for Nespresso Vertuo machines \u2014 and limited edition.',
    tag: 'PARTNERSHIP',
    image: 'https://a.storyblok.com/f/107921/1920x1080/e8b406df81/shareimage-nespressosummer.png'
  },
  {
    id: 'blind-test',
    slug: 'blind-test',
    title: 'How to do the Blind Taste Test!',
    type: 'Brainwashing',
    date: 'November 1, 2024',
    readTime: '4 min read',
    excerpt: 'In a blind test, 53% prefer Oatly to cow\u2019s milk in coffee.',
    content:
      'In a blind test, 53% prefer Oatly to cow\u2019s milk in coffee. We set up a no-whammies taste experiment and let people decide for themselves which one they\u2019d rather pour in their cup \u2014 the results were hard to argue with.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/3200x1800/4ad7a11a8f/grade_ref_still_6421-kopiera_2-min.jpg'
  },
  {
    id: 'malibu',
    slug: 'malibu',
    title: 'Malibu',
    type: 'Brainwashing',
    date: 'July 11, 2024',
    readTime: '3 min read',
    excerpt:
      'Oatly and Malibu \u2014 the collaboration no one asked for. Find out here where to try Pi\u00f1a Oatlada, our new Pi\u00f1a Colada flavored Soft Serve this summer.',
    content:
      'Oatly and Malibu \u2014 the collaboration no one asked for. This summer we brought out Pi\u00f1a Oatlada, a Pi\u00f1a Colada flavored Soft Serve, and set it loose on the world. Find out where to try it while it lasts.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/1924x1134/4e3e2530e5/headerimage2.png'
  },
  {
    id: 'oatgurt-tour-2024',
    slug: 'oatgurt-tour-2024',
    title: 'Oatgurt Tour 2024',
    type: 'Brainwashing',
    date: 'April 2, 2024',
    readTime: '4 min read',
    excerpt:
      'WE THINK THE BEST WAY TO KNOW IF YOU LIKE THE NEW OATGURT IS TO TRY IT AND BECAUSE YOU CAN\u2019T SEND YOUR MOUTH TO US, YOU HAVE TO TAKE YOUR MOUTH TO THE OATGURT!',
    content:
      'WE THINK THE BEST WAY TO KNOW IF YOU LIKE THE NEW OATGURT IS TO TRY IT. AND BECAUSE YOU CAN\u2019T SEND YOUR MOUTH TO US, YOU HAVE TO TAKE YOUR MOUTH TO THE OATGURT. The Oatgurt Tour hit the streets so people could meet the new oat gurt before it hit the shelves.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/1200x675/8cd1f3f2b9/oatly-oatgurt_tour-thumb.png'
  },
  {
    id: 'wisconsin-supper-club-swaps-dairy-with-oatly',
    slug: 'wisconsin-supper-club-swaps-dairy-with-oatly',
    title: 'A Wisconsin Supper Club Swaps Dairy With Oatly',
    type: 'Brainwashing',
    date: 'November 16, 2023',
    readTime: '5 min read',
    excerpt:
      'We visited The Duck Inn Supper Club in America\u2019s Dairy State and made Oatly grasshoppers and creme br\u00fbl\u00e9es. Surprisingly, no chaos ensued and we made it out alive.',
    content:
      'We visited The Duck Inn Supper Club in America\u2019s Dairy State and made Oatly grasshoppers and creme br\u00fbl\u00e9es with the kitchen crew. Surprisingly, no chaos ensued \u2014 and we made it out alive.',
    tag: 'WILL IT SWAP',
    image: 'https://a.storyblok.com/f/107921/8082x5388/feeec3369a/oatlyduckinn_086.jpg'
  },
  {
    id: 'louisiana-diner-swaps-dairy-with-oatly',
    slug: 'louisiana-diner-swaps-dairy-with-oatly',
    title: 'We Swapped Dairy for Oatly at a Diner in Louisiana',
    type: 'Brainwashing',
    date: 'May 18, 2023',
    readTime: '5 min read',
    excerpt:
      'We convinced a Louisiana diner to swap dairy with Oatly in their most popular dishes. Almost everyone enjoyed the Oatly jambalaya and crawfish fettuccine, except for a few individuals who asked to be removed from the video.',
    content:
      'We convinced a Louisiana diner to swap dairy with Oatly in their most popular dishes. Almost everyone enjoyed the Oatly jambalaya and crawfish fettuccine \u2014 except for a few individuals who asked to be removed from the video.',
    tag: 'WILL IT SWAP',
    image: 'https://a.storyblok.com/f/107921/1920x1080/8df224ce27/yt_thumbnail_diner.jpg'
  },
  {
    id: 'will-it-swap',
    slug: 'will-it-swap',
    title: 'Will It Swap',
    type: 'Brainwashing',
    date: 'September 26, 2022',
    readTime: '4 min read',
    excerpt:
      'The best cooking show about people replacing dairy with oat products on the Internet. Stream season one now!',
    content:
      'The best cooking show about people replacing dairy with oat products on the Internet. We roll classic dishes \u2014 from diner favorites to fine dining \u2014 and find out whether oat will swap. Stream season one now!',
    tag: 'WILL IT SWAP',
    image: 'https://a.storyblok.com/f/107921/1920x1080/2b3d16e8f3/featured-image-wis.jpg'
  },
  {
    id: 'milk-myths',
    slug: 'milk-myths',
    title: 'Milk myths',
    type: 'Brainwashing',
    date: 'July 2, 2021',
    readTime: '4 min read',
    excerpt:
      'Is everything you have learnt about cow\u2019s milk true? Since Finland has the world\u2019s highest milk consumption, it was about time to find out.',
    content:
      'Is everything you\u2019ve learnt about cow\u2019s milk true? Since Finland has the world\u2019s highest milk consumption, it was about time to find out \u2014 so we put the biggest milk myths to the test.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/x/b31c78c108/milk-myths-feature-image-2.svg'
  },
  {
    id: 'help-dad',
    slug: 'help-dad',
    title: 'Help dad',
    type: 'Brainwashing',
    date: 'March 1, 2021',
    readTime: '4 min read',
    excerpt:
      'Dads are the best, except when it comes to eating and drinking sustainably, in which case, dads are the worst. But there is help!',
    content:
      'Dads are the best \u2014 except when it comes to eating and drinking sustainably, in which case, dads are the worst. But there is help! A friendly guide for turning your father into a modern man for the planet.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/896x504/69ccdc72db/help_dad_featured.jpg'
  },
  {
    id: 'odds',
    slug: 'odds',
    title: 'Oatly Department of distraction services',
    type: 'Brainwashing',
    date: 'March 17, 2020',
    readTime: '5 min read',
    excerpt:
      'When COVID struck the world in 2019, our creative department, known as the Oatly Department of Mind Control, momentarily lost all interest in trying to sell you our oat drink. Instead, we focused the few skills we actually possess on the birth of the ODDS.',
    content:
      'When COVID struck the world, our creative department \u2014 known as the Oatly Department of Mind Control \u2014 momentarily lost all interest in trying to sell you our oat drink. Instead, we focused the few skills we actually possess on the birth of the O.D.D.S.: the Oatly Department of Distraction Services.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/600x338/03df5814c7/odds.png'
  },
  {
    id: 'ditch-milk',
    slug: 'ditch-milk',
    title: 'Ditch Milk',
    type: 'Brainwashing',
    date: 'March 1, 2019',
    readTime: '4 min read',
    excerpt:
      'If there were reactions when we asked people to stop doing something we\u2019ve been doing for the past 6000 years? You get one guess.',
    content:
      'Were there reactions when we asked people to stop doing something we\u2019ve been doing for the past 6000 years? You get one guess. Ditch Milk was our not-so-subtle campaign to rethink the world\u2019s default milk choice.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/1200x675/6e210d6846/oatly-ditch-milk-thumb.png'
  },
  {
    id: 'google-milk',
    slug: 'google-milk',
    title: 'Google Milk',
    type: 'Brainwashing',
    date: 'May 1, 2016',
    readTime: '3 min read',
    excerpt:
      'What if you\u2019re banned by court from comparing oat drink and cow\u2019s milk? Well, you can always have people find out the truth for themselves.',
    content:
      'What if you\u2019re banned by court from comparing oat drink and cows\u2019 milk? Well, you can always have people find out the truth for themselves. Google Milk asked consumers to do their own homework before they poured.',
    tag: 'CAMPAIGNS',
    image: 'https://a.storyblok.com/f/107921/1658x933/308b4ac48c/googla-mjolk.jpg'
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
