import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderMedia from '../components/PlaceholderMedia';
import FlatCard from '../components/FlatCard';
import SEO from '../components/SEO';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';

// Banner composite (drinks collage + LOOK BOOK text baked in, desktop hero).
const BANNER_IMAGE = 'https://assets.oatly.com/asset/68098b18-2a51-4a2f-a61a-66767f296c80/w1080/WEB-Oatly_Lookbook_refill_Desktop_new.png';

// Real A/W 25 collection order, verbatim from oatly.com __NEXT_DATA__.
const recipes = [
  { title: 'Apricot & Thyme Matcha', image: 'https://assets.oatly.com/asset/51f5add1-1e9f-444b-947f-6be625cac297/w1080/WEB_Apricot-Thyme-Matcha.png' },
  { title: 'Mango Sticky Rice Slushie', image: 'https://assets.oatly.com/asset/63e8b991-8d2a-42d6-881d-5d589c243dc6/w1080/WEB_Mango-Sticky-Rice-Slushie.png' },
  { title: 'Strawberry & Almond Shrub', image: 'https://assets.oatly.com/asset/ac251548-6916-470f-9990-b35d63d504ca/w1080/WEB_Strawberry-Almond-Shrub.png' },
  { title: 'Lime & leaf chai', image: 'https://assets.oatly.com/asset/4c62747c-1588-4d3a-a720-a14cf5bb6a81/w1080/WEB_Lime-Leaf-Chai.png' },
  { title: 'Rose Cardamom Coffee Cloud', image: 'https://assets.oatly.com/asset/a587a327-4e9b-46b0-9f07-ce103e0e0117/w1080/WEB_Rose-Cardamom-Coffee-Cloud.png' },
  { title: 'Guava & coconut shaken Espresso', image: 'https://assets.oatly.com/asset/15de5e5e-26cd-49b5-9480-1e8de9e122c7/w1080/WEB_Guava-Coconut-Shaken-Espresso.png' },
  { title: 'Cantaloupe Matcha', image: 'https://assets.oatly.com/asset/f3ec4e86-b69f-432a-ab70-ee45ee1541f8/w1080/WEB_Cantaloupe-Matcha.png' },
  { title: 'Peach sago tea', image: 'https://assets.oatly.com/asset/65fec90d-8481-4ade-9b3f-e1326dc563b6/w1080/WEB_Peach-tea-Sago-Pearls.png' },
  { title: 'Banana French toast brûlée', image: 'https://assets.oatly.com/asset/3712154d-9236-4c2f-a228-bb4c18fee8de/w1080/WEB_Banana-French-Toast-Bru-le-e.png' },
  { title: 'Ginger nut chai', image: 'https://assets.oatly.com/asset/59ee4b32-2237-4102-85f7-eab00512c9de/w1080/WEB_Ginger_Nut_Chai.png' },
  { title: 'Pear & cardamom thai tea', image: 'https://assets.oatly.com/asset/bd4102ac-3e79-4616-ac98-4ed4ff18d7b3/w1080/WEB_Pear_Cardamomme_Thai_Tea.png' },
  { title: 'Mulled cranberry matcha latte', image: 'https://assets.oatly.com/asset/9f44242d-9feb-4b3f-aeb3-e49d5a98a8c5/w1080/WEB_Mulled_Cranberry_Wine_Matcha.png' },
  { title: 'Gochujang hot chocolate', image: 'https://assets.oatly.com/asset/48463374-aed1-49da-b272-ec589fa7d1a9/w1080/WEB_Gochujang_Hot_Choc.png' },
  { title: 'Ye olde Oatly', image: 'https://assets.oatly.com/asset/1d63a96d-2f43-40a3-ac07-e177e34f3dc7/w1080/WEB_Ye_Olde_Oatly.png' },
  { title: 'Cinnamon roll smoothie', image: 'https://assets.oatly.com/asset/7ab8ab6c-63a2-495e-a97e-1d5aea49b9f2/w1080/WEB_Cinnamon_Roll_Smoothie.png' },
  { title: 'Smoked rosemary hot choc', image: 'https://assets.oatly.com/asset/ea036171-b166-4d2b-9fb1-7b4591a03cf3/w1080/WEB_Smoked_Rosemary_Hot_Choc.png' },
  { title: 'Double tea', image: 'https://assets.oatly.com/asset/7788d9ad-febb-47a3-86fa-f26292783a32/w1080/WEB_Double_Tea_EMEA.png' },
  { title: 'Apple pie chai', image: 'https://assets.oatly.com/asset/5bf5c28e-aeeb-48c6-8d58-4b3d86eb90ce/w1080/WEB_Apple_Pie_Chai.png' },
  { title: 'Malted spiced choco', image: 'https://assets.oatly.com/asset/05198d4a-57a2-456d-b431-31c91c2530bc/w1080/WEB_Malted_Spiced-Chocolate.png' },
  { title: 'Yuzu white choc mocha', image: 'https://assets.oatly.com/asset/36e72ee0-1474-4001-aaa9-3d96e89f4ff2/w1080/WEB_Yuzu_White_Choc_Mocha.png' },
  { title: 'Sticky toffee Irish coffee', image: 'https://assets.oatly.com/asset/9c510736-ef10-4592-98d7-d83b9f9c43a9/w1080/WEB_Sticky_Toffee_Irish_Coffee.png' },
  { title: 'Carrot cake matcha latte', image: 'https://assets.oatly.com/asset/7f684d81-eef4-4d2b-812a-ef77b1ade945/w1080/WEB_Carrot_Cake_Matcha_Latte.png' },
  { title: 'Chia pudding matcha latte', image: 'https://assets.oatly.com/asset/9700dbf0-3696-45fd-8166-0a76720cf07c/w1080/WEB_Yummy_Tummy_Matcha.png' },
  { title: 'Sweet tahini hojicha latte', image: 'https://assets.oatly.com/asset/89d39929-3209-4b7d-b4c1-e788955a3a93/w1080/WEB_Sweet_Tahini_Hojicha.png' },
  { title: 'Pumpkin 2.0', image: 'https://assets.oatly.com/asset/c1bf67a9-f0fa-4fce-9dad-d3455c18dc68/w1080/WEB_Pumpikn_2-0.png' },
  { title: 'BLACK SESAME HOJICHA EINSPÄNNER', image: 'https://assets.oatly.com/asset/cf71e05c-6686-45a7-9306-63c848009323/w1080/WEB_Black_Sesame_Eispanner_Hojicha.png' },
  { title: 'SALTED ‘EGG’ CUSTARD LATTE', image: 'https://assets.oatly.com/asset/e30dab06-7d0e-4aa8-97cb-84700521f2f4/w1080/WEB_Salted_Egg_Custard_Latte.png' },
];

export default function LookBookAW25Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      <SEO
        title="Look Book A/W 25 | Oatly Recipes"
        description="Cozy autumn and winter sips crafted with Oatly Barista Edition."
        pathname="/recipes/look-book-autumn-winter-2025"
      />

      <Link to="/recipes" className="btn-oatly-secondary text-xs py-2.5 px-5 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> ALL LOOK BOOKS
      </Link>

      <div className="bg-oatly-blue text-white border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl space-y-4">
        <span className="badge-sticker bg-oatly-yellow text-oatly-black">AUTUMN / WINTER 2025</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase font-display">LOOK BOOK A/W 25</h1>
        <p className="text-base md:text-lg opacity-90 max-w-2xl">
          Cozy sips, toasted spices, and rich chocolate comfort for chilly days.
        </p>
      </div>

      <FlatCard
        title="THE OATLY LOOK BOOK AUTUMN/WINTER 2025"
        tag="TASTEBUDS"
        imageSrc={BANNER_IMAGE}
        linkTo="/recipes/look-book-autumn-winter-2025"
        aspectRatio="1080/285"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        {recipes.map((r, idx) => (
          <div key={idx} className="bg-white border-4 border-oatly-black shadow-brutal p-5 space-y-4 flex flex-col justify-between h-full">
            <div>
              {r.image ? (
                <div className="relative w-full overflow-hidden bg-oatly-cream" style={{ aspectRatio: '1/1' }}>
                  <img
                    src={r.image}
                    alt={r.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <PlaceholderMedia aspectRatio="1:1" label={r.title} icon="☕" bgClass="bg-oatly-cream" />
              )}
              <div className="flex items-center justify-between text-xs font-mono font-bold text-oatly-blue mt-3">
                <span>LOOK BOOK A/W 25</span>
                {r.time && <span>{r.time}</span>}
              </div>
              <h3 className="text-xl font-black uppercase font-display mt-1 truncate" title={r.title}>{r.title}</h3>
              {r.desc && <p className="text-xs text-gray-700 font-sans mt-2 line-clamp-2">{r.desc}</p>}
            </div>
            <button onClick={() => alert(`Recipe details for ${r.title}`)} className="btn-oatly text-xs py-2 min-h-[44px]">
              VIEW FORMULA
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
