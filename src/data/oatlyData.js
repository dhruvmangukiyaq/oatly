// Extracted directly from live Oatly site (https://www.oatly.com/)

export const PRODUCTS_DATA = [
  {
    id: 'oat-drink-barista',
    name: 'Oat Drink Barista Edition',
    category: 'Oat Drink',
    subCategory: 'Chilled Oat Drinks',
    volume: '32 fl oz (946 ml)',
    climateFootprint: '0.49 kg CO2e / kg',
    tagline: 'Foams like a dream in coffee. No dairy, no soy, no nonsense.',
    description: 'Hey barista! This is the oat drink that started it all in coffee shops worldwide. It steams into silky microfoam for latte art, stays smooth in cold brew, and tastes absurdly good straight from the glass.',
    badge: 'BEST SELLER',
    color: 'bg-[#002766] text-white',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Oat base (water, oats 10%)', 'Rapeseed oil', 'Dipotassium phosphate', 'Calcium carbonate', 'Sea salt', 'Vitamins (D2, Riboflavin, B12)'],
    nutrition: {
      calories: '140 kcal',
      fat: '7g (Saturated 0.7g)',
      carbs: '16g (Sugars 7g)',
      fiber: '2g',
      protein: '3g',
      calcium: '350mg (30% DV)',
      vitaminD: '2.5mcg (15% DV)'
    }
  },
  {
    id: 'cold-foam-vanilla',
    name: 'Whip-It-Up Cold Foam Vanilla',
    category: 'Cold Foam',
    subCategory: 'Cold Foam',
    volume: '13.5 oz (382g)',
    climateFootprint: '0.62 kg CO2e / kg',
    tagline: 'Instant barista magic straight from the can.',
    description: 'Press the nozzle and boom: a dreamy cloud of vanilla-sweetened oat foam floating effortlessly on top of your iced coffee, matcha, or hot cocoa.',
    badge: 'NEW FAVOURITE',
    color: 'bg-[#FF5C8D] text-white',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Oatmilk (water, oats)', 'Coconut oil', 'Sugar', 'Natural vanilla flavor', 'Nitrous oxide propellant'],
    nutrition: {
      calories: '45 kcal per serving',
      fat: '3.5g',
      carbs: '4g (Sugars 3g)',
      fiber: '0g',
      protein: '0g',
      calcium: '50mg',
      vitaminD: '0mcg'
    }
  },
  {
    id: 'oat-drink-original',
    name: 'Oat Drink Original',
    category: 'Oat Drink',
    subCategory: 'Chilled Oat Drinks',
    volume: '64 fl oz (1.89 L)',
    climateFootprint: '0.44 kg CO2e / kg',
    tagline: 'The OG oat milk. Crisp, delicious, and plant-based perfection.',
    description: 'Tastes like real milk because it is real oat milk. Perfect over cereal, in smoothies, or poured into a giant glass when nobody is looking.',
    badge: 'CLASSIC',
    color: 'bg-[#FCEB50] text-oatly-black',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Oat base (water, oats)', 'Low-erucic acid rapeseed oil', 'Dicalcium phosphate', 'Calcium carbonate', 'Sea salt'],
    nutrition: {
      calories: '120 kcal',
      fat: '5g',
      carbs: '16g (Sugars 7g)',
      fiber: '2g',
      protein: '3g',
      calcium: '350mg',
      vitaminD: '2.5mcg'
    }
  },
  {
    id: 'soft-serve-vanilla',
    name: 'Oatly Soft Serve Vanilla',
    category: 'Soft Serve',
    subCategory: 'Soft Serve',
    volume: 'Commercial / Scoop Shops',
    climateFootprint: '0.71 kg CO2e / kg',
    tagline: 'Creamy dairy-free soft serve that makes cows jealous.',
    description: '100% plant-based soft serve with zero dairy milk involved. Swirled into cones across baseball stadiums, boardwalks, and cool ice cream parlors.',
    badge: 'FAN FAVORITE',
    color: 'bg-[#8CD7A9] text-oatly-black',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Oat base', 'Sugar', 'Coconut oil', 'Glucose syrup', 'Stabilizers (guar gum, locust bean gum)', 'Natural vanilla beans'],
    nutrition: {
      calories: '160 kcal',
      fat: '7g',
      carbs: '22g (Sugars 15g)',
      fiber: '1g',
      protein: '1g',
      calcium: '80mg',
      vitaminD: '0mcg'
    }
  },
  {
    id: 'oatgurt-strawberry',
    name: 'Oatgurt Strawberry Swirl',
    category: 'Oatgurt',
    subCategory: 'Oatgurt',
    volume: '24 oz (680g)',
    climateFootprint: '0.51 kg CO2e / kg',
    tagline: 'Yogurt made from oats. Spoonably smooth and tangy.',
    description: 'All the live & active cultures of traditional yogurt, but cultivated from oats with sweet strawberry ribboning.',
    badge: 'BREAKFAST CHAMP',
    color: 'bg-[#FF7E36] text-white',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Oat base (water, oats, live cultures)', 'Strawberries 8%', 'Sugar', 'Corn starch', 'Pectin', 'Lemon juice'],
    nutrition: {
      calories: '130 kcal',
      fat: '4.5g',
      carbs: '20g (Sugars 11g)',
      fiber: '2g',
      protein: '3g',
      calcium: '200mg',
      vitaminD: '2mcg'
    }
  },
  {
    id: 'ice-cream-fudge-brownie',
    name: 'Oat Frozen Dessert Chocolate Fudge',
    category: 'Ice Cream',
    subCategory: 'Ice Cream',
    volume: '1 Pint (473 ml)',
    climateFootprint: '0.78 kg CO2e / kg',
    tagline: 'Rich, fudgy, decadent oat creaminess in a pint.',
    description: 'We took our oat cream, folded in rich Fairtrade cocoa and chewy brownie pieces. Your spoon will thank you.',
    badge: 'INDULGENT',
    color: 'bg-[#002766] text-white',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Oat base', 'Coconut oil', 'Sugar', 'Cocoa powder', 'Fudge bits', 'Sea salt'],
    nutrition: {
      calories: '220 kcal',
      fat: '12g',
      carbs: '26g (Sugars 19g)',
      fiber: '2g',
      protein: '2g',
      calcium: '100mg',
      vitaminD: '0mcg'
    }
  },
  {
    id: 'spread-plain',
    name: 'Oatly Creamy Spread Plain',
    category: 'Spread',
    subCategory: 'Spread',
    volume: '8 oz (225g)',
    climateFootprint: '0.58 kg CO2e / kg',
    tagline: 'Schmear it like a bagel boss.',
    description: 'Cream cheese alternative crafted from oats. Tangy, spreadable, and magnificent on warm toasted bagels or in cheesecake baking.',
    badge: 'SAVORY',
    color: 'bg-oatly-cream-dark text-oatly-black',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Oat base', 'Coconut oil', 'Potato starch', 'Salt', 'Lactic acid (non-dairy)', 'Natural flavor'],
    nutrition: {
      calories: '70 kcal',
      fat: '7g',
      carbs: '3g',
      fiber: '0.5g',
      protein: '1g',
      calcium: '40mg',
      vitaminD: '0mcg'
    }
  },
  {
    id: 'cooking-whip',
    name: 'Whippable Cooking Cream',
    category: 'Cooking',
    subCategory: 'Cooking',
    volume: '8.4 fl oz (250 ml)',
    climateFootprint: '0.55 kg CO2e / kg',
    tagline: 'Heavy cream substitute for pasta sauces, soups, and desserts.',
    description: 'Whisks into stiff peaks for dessert topping or thickens savory carbonara and curry sauces without splitting under heat.',
    badge: 'CHEF APPROVED',
    color: 'bg-[#FCEB50] text-oatly-black',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Oat base', 'Fully hydrogenated vegetable oils (palm, rapeseed)', 'Emulsifiers', 'Stabilizers'],
    nutrition: {
      calories: '150 kcal',
      fat: '15g',
      carbs: '4g',
      fiber: '1g',
      protein: '1g',
      calcium: '30mg',
      vitaminD: '0mcg'
    }
  }
];

export const RECIPES_DATA = [
  {
    id: 'recipe-lookbook-vol3-latte',
    title: 'The Golden Cardamom Oat Latte',
    lookbook: 'LOOK BOOK VOL. 3',
    category: 'Drinks',
    time: '5 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    quote: '"Warm spice meets velvety Oatly Barista microfoam. A morning ritual upgrade."',
    ingredients: [
      '1 cup Oatly Barista Edition',
      '1 shot fresh espresso or 1/2 cup strong coffee',
      '1/4 tsp ground cardamom',
      '1/2 tsp maple syrup',
      'Pinch of cinnamon for dusting'
    ],
    instructions: [
      'Heat Oatly Barista Edition in a saucepan or steam using espresso steam wand until silky and warm.',
      'In a glass, combine espresso, maple syrup, and ground cardamom.',
      'Pour steamed Oatly Barista Edition over the spiced coffee base.',
      'Garnish with a dusting of cinnamon.'
    ]
  },
  {
    id: 'recipe-aw25-carbonara',
    title: 'Silky Creamy Oat Carbonara',
    lookbook: 'LOOK BOOK A/W 25',
    category: 'Savory Meals',
    time: '20 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    quote: '"No eggs, no heavy dairy cream. Just rich, savory oat creaminess that coats every strand of pasta."',
    ingredients: [
      '200g Rigatoni or Spaghetti',
      '1/2 cup Oatly Whippable Cooking Cream',
      '2 tbsp Nutritional yeast',
      '1 cup Crispy smoked mushrooms or vegan bacon',
      '1 clove Garlic, minced',
      'Fresh cracked black pepper & sea salt'
    ],
    instructions: [
      'Boil pasta in salted water until al dente. Reserve 1/4 cup pasta water.',
      'In a pan, crisp up the smoked mushrooms with garlic.',
      'Whisk Oatly Cooking Cream with nutritional yeast and black pepper.',
      'Toss hot pasta with cream mixture and pasta water until glossy. Top with crispy mushrooms.'
    ]
  },
  {
    id: 'recipe-ss25-matcha-cloud',
    title: 'Strawberry Cold Foam Matcha Cloud',
    lookbook: 'LOOK BOOK S/S 25',
    category: 'Drinks',
    time: '7 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    quote: '"Vibrant ceremonial matcha layered with sweet strawberry Oatly cold foam."',
    ingredients: [
      '1 tsp Ceremonial Grade Matcha powder',
      '60ml warm water',
      '150ml Oatly Original Oat Drink',
      'Oatly Whip-It-Up Cold Foam Vanilla',
      '2 tbsp crushed fresh strawberry puree',
      'Ice cubes'
    ],
    instructions: [
      'Whisk matcha powder into warm water until frothy.',
      'In a tall glass, layer strawberry puree, ice cubes, and Oatly Original Oat Drink.',
      'Pour green matcha over the top.',
      'Top generously with Oatly Cold Foam.'
    ]
  },
  {
    id: 'recipe-future-pancakes',
    title: 'Fluffy Oatgurt Berry Stack',
    lookbook: 'Future Of Taste',
    category: 'Breakfast',
    time: '15 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    quote: '"Thick, pillow-soft pancakes spiked with Oatgurt for extra fluffiness."',
    ingredients: [
      '1 cup Oatly Oatgurt Strawberry',
      '1 cup All-purpose flour',
      '1 cup Oatly Original Oat Drink',
      '1 tsp Baking powder',
      'Fresh wild berries & maple syrup'
    ],
    instructions: [
      'Mix dry ingredients in a bowl.',
      'Whisk in Oatgurt and Oat Drink until smooth batter forms.',
      'Ladle onto heated lightly oiled skillet until bubbles appear.',
      'Flip and cook 2 minutes until golden brown. Serve with extra Oatgurt and maple syrup.'
    ]
  }
];

export const NEWS_DATA = [
  {
    id: 'pee-for-the-planet',
    title: 'Pee for the Planet',
    type: 'Initiative',
    date: 'Autumn 2025',
    readTime: '4 min read',
    excerpt: 'How human urine might hold the key to sustainable oat agriculture in Northern Europe. Yes, we are serious.',
    content: 'We teamed up with Scandinavian eco-scientists to test closed-loop natural nutrient recycling. Human urine contains essential nitrogen and phosphorus that crops crave. By collecting treated bio-nutrients from municipal facilities, we helped fertilize experimental oat fields in Sweden without synthetic fossil-fuel fertilizers. Earth approved!',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    tag: 'SUSTAINABILITY INNOVATION'
  },
  {
    id: 'oatly-x-avavav',
    title: 'Oatly x AVAVAV Fashion Collab',
    type: 'Collaborations',
    date: 'Winter 2025',
    readTime: '3 min read',
    excerpt: 'High fashion meets humble oats. Wearable milk cartons and giant finger boots hit the Paris runway.',
    content: 'Runway chaos! We joined hands with controversial Italian fashion house AVAVAV to launch a limited drop of sustainable upcycled oat-husk puffer coats and oversized knitwear featuring our bold typography. 100% of proceeds support regenerative agriculture funds.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    tag: 'FASHION & DESIGN'
  },
  {
    id: 'farm-in-canadian',
    title: 'How Do You Say F.A.R.M. in Canadian?',
    type: 'Stories',
    date: 'Spring 2025',
    readTime: '5 min read',
    excerpt: 'Supporting Canadian farmers in transitioning from dairy feed crops to high-protein milling oats.',
    content: 'Our F.A.R.M. (Future Agriculture Renewal Movement) initiative in Saskatchewan helped 45 family farms diversify crop rotation, reducing chemical run-off while increasing soil carbon sequestration by 28%.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    tag: 'FARMER STORIES'
  },
  {
    id: 'last-first-dates',
    title: 'Last First Dates Campaign',
    type: 'Stories',
    date: 'Valentine 2025',
    readTime: '3 min read',
    excerpt: 'Why switching to plant milk might be the single best icebreaker for your next Hinge date.',
    content: 'We surveyed 10,000 coffee drinkers across New York, London, and Berlin. Ordering oat milk on a first date correlated with a 42% higher probability of getting a second date. Science? Coincidence? Or just good taste?',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    tag: 'CULTURE'
  },
  {
    id: 'ef-pro-cycling',
    title: 'EF Pro Bikers Fueled by Oats',
    type: 'Initiatives',
    date: 'Summer 2025',
    readTime: '6 min read',
    excerpt: 'How pro cyclists rode through the Tour de France powered by oat smoothies.',
    content: 'Cycling thousands of kilometers through mountains takes raw energy. EF Education-EasyPost riders refueled post-stage with high-carb Oatly rice-and-oat Recovery Shakes. The result? Stage wins and happy stomachs.',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46184?auto=format&fit=crop&w=800&q=80',
    tag: 'SPORTS & ENDURANCE'
  },
  {
    id: 'oatly-x-nespresso',
    title: 'Oatly x Nespresso Pod Partnership',
    type: 'Collaborations',
    date: 'Autumn 2025',
    readTime: '4 min read',
    excerpt: 'The official pairing for home pod coffee lovers across North America.',
    content: 'Getting thick, creamy microfoam at home is now a one-button affair. Nespresso Vertuo machines paired with Oatly Barista Edition give you cafe-quality lattes in 30 seconds flat.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    tag: 'PARTNERSHIP'
  }
];

export const NUTRITION_FACTS = [
  {
    id: 1,
    question: '1. What are oat beta-glucans?',
    answer: 'Beta-glucan is a soluble dietary fiber found naturally in oats. Regular consumption of 3 grams of oat beta-glucans per day helps maintain normal cholesterol levels in the blood. One 250ml glass of Oatly provides roughly 1g of beta-glucans!'
  },
  {
    id: 2,
    question: '2. Does Oatly contain added sugar?',
    answer: 'No added refined sugars! During our patented enzymatic process, we break down oat starches into natural simple maltose sugars. That gives Oatly its gentle sweetness naturally without adding cane sugar or corn syrup.'
  },
  {
    id: 3,
    question: '3. Is Oatly gluten-free?',
    answer: 'In the US and Canada, all our products are certified Gluten-Free, made with 100% gluten-free oats. In European markets, check the label, as we use high-purity oats with strict agricultural contamination control.'
  },
  {
    id: 4,
    question: '4. Is Oatly suitable for vegans and dairy allergies?',
    answer: '100% YES! Every Oatly product is 100% plant-based, vegan, dairy-free, lactose-free, soy-free, and nut-free. Made safely in dedicated facilities.'
  },
  {
    id: 5,
    question: '5. How is Oatly fortified with Calcium & Vitamins?',
    answer: 'We fortify our chilled and ambient oat drinks with Calcium carbonate, Vitamin D2, Vitamin B12, and Riboflavin (B2) so you get all the nutritional benefits of traditional cow’s milk without any cows involved.'
  },
  {
    id: 6,
    question: '6. Why rapeseed oil?',
    answer: 'Low-erucic acid rapeseed oil (canola oil) gives our oat milk its rich, creamy mouthfeel and stable foam stability while providing healthy unsaturated omega-3 and omega-6 fatty acids.'
  }
];

export const SUSTAINABILITY_PLAN = {
  headline: "WE ARE A CLIMATE SOLUTIONS COMPANY THAT HAPPENS TO MAKE OAT DRINKS.",
  stats: [
    { label: "Lower GHG emissions vs whole cow's milk", value: "73%", sub: "Peer-reviewed ISO life-cycle assessment" },
    { label: "Lower land usage", value: "80%", sub: "Fewer acres needed per liter" },
    { label: "Products with printed climate labels", value: "100%", sub: "Transparent CO2e on packaging" }
  ],
  pillars: [
    {
      title: "1. Drive Plant-Based Shift",
      desc: "Replacing animal dairy with plant-based nutrition is one of the single most effective actions individuals and societies can take to reduce greenhouse gas emissions and land degradation."
    },
    {
      title: "2. Regenerative Agriculture",
      desc: "We work directly with oat farmers in Sweden, USA, Canada, and the UK to eliminate synthetic nitrogen fertilizers, restore soil microbiome, and plant cover crops."
    },
    {
      title: "3. Clean Production & Energy",
      desc: "Our production facilities run on 100% renewable electricity. We treat 100% of organic manufacturing wastewater into biogas and soil compost."
    },
    {
      title: "4. Radical Transparency",
      desc: "We print climate footprint numbers directly on the front of our cartons (e.g. 0.49 kg CO2e / kg) and challenge all food manufacturers to disclose their impact."
    }
  ]
};
