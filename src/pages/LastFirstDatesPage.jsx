import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import '../styles/LastFirstDates.css';

/* ==========================================================================
   LAST FIRST DATES WITH MAXENCE — copy-to-copy of
   oatly.com/things-we-do/stories/last-first-dates
   Cooking-show story: cover hero → trailer → recipe index → 6 recipe
   films with full ingredients. All copy + official artwork preserved.
   ========================================================================== */

const SB = 'https://a.storyblok.com/f/107921';
const YT = (id) => `https://www.youtube-nocookie.com/embed/${id}?rel=0`;

const IMG = {
  hero: `${SB}/1920x1080/88cba2b9a8/bg-maxence.png`,
  heroMobile: `${SB}/1196x1080/673ea573a0/bg-maxence-mob.png`,
  logo: `${SB}/568x396/a5fee216b3/lastfirstdates_logo.svg`,
  cherub1: `${SB}/738x532/9047c7cd3e/cherub_1.svg`,
  cherub3: `${SB}/343x224/d92cc2db79/cherub_3.svg`,
};

const TRAILER = 'O6ojdG_N1wo';

const MENU = [
  { group: 'Savoury', items: [
    { no: '01', name: 'Spicy Mushroom Tantanmen Ramen', href: '#spicy-mushroom-tantamen-ramen' },
    { no: '02', name: 'Kohlrabi Green Steak', href: '#kohlrabi-green-steak' },
  ]},
  { group: 'Sweet', items: [
    { no: '03', name: 'Crêpes Chocolat Chantilly', href: '#crepes-chocolat-chantilly' },
    { no: '04', name: 'île Flottante', href: '#ile-flottante' },
  ]},
  { group: 'Drinks', items: [
    { no: '05', name: 'Golden Milk', href: '#golden-milk' },
    { no: '06', name: 'Mexican Coffee', href: '#mexican-coffee' },
  ]},
];

/* Scroll-triggered entrance (no animation library — plain IntersectionObserver
   + CSS transition, so it always runs): cherub flies in from its side the
   first time it enters the viewport, scrolling down or up — then stays. */
function FlyCherub({ src, className, from = 'right' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <img
      ref={ref}
      src={src}
      alt=""
      aria-hidden="true"
      className={`${className} fly-cherub fly-cherub--${from}${seen ? ' is-seen' : ''}`}
    />
  );
}

function Ing({ groups }) {
  return (
    <div className="lfd-recipe__block">
      <h4>Ingredients</h4>
      {groups.map((g, i) => (
        <div key={i}>
          {g.h && <p className="lfd-recipe__sub">{g.h}</p>}
          <ul>
            {g.items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{ __html: it }} />)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Recipe({ id, no, group, title, video, serves, prep, extra, desc, ingredients, equipment, steps }) {
  return (
    <section className="lfd-recipe" id={id} aria-label={title}>
      <p className="lfd-recipe__kicker">{group}</p>
      <div className="lfd-recipe__grid">
        <div className="lfd-recipe__video">
          <iframe src={YT(video)} title={`${title} — Last First Dates with Maxence`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
        </div>
        <div>
          <h3><span>{no}</span> {title}</h3>
          <dl className="lfd-meta">
            <div><dt>Serves</dt><dd>{serves}</dd></div>
            <div><dt>Prep time</dt><dd>{prep}</dd></div>
            <div><dt>{extra[0]}</dt><dd>{extra[1]}</dd></div>
          </dl>
          <p className="lfd-recipe__desc">{desc}</p>
        </div>
      </div>
      <div className="lfd-recipe__detail">
        <Ing groups={ingredients} />
        <div className="lfd-recipe__block">
          <h4>Equipment</h4>
          <ul>{equipment.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
        <div className="lfd-recipe__block">
          <h4>Directions</h4>
          <ol>
            {steps.map((s, i) => (
              <li key={i}>
                {s.t && <strong>{s.t} </strong>}
                <span dangerouslySetInnerHTML={{ __html: s.d }} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function LastFirstDatesPage() {
  return (
    <div className="lfd">
      <SEO
        title="Last First Dates with Maxence | Oatly"
        description="Maxence the French Chef meets a rotating cast of dates and cooks them delicious meals made with Oatly. Watch the cooking show and get the recipes."
        pathname="/things-we-do/stories/last-first-dates"
      />

      {/* ═══ COVER HERO ═══ */}
      <header className="lfd-hero">
        <picture>
          <source media="(max-width: 700px)" srcSet={IMG.heroMobile} />
          <img src={IMG.hero} alt="Maxence in a blue sweater standing in a kitchen with plants and flowers" className="lfd-hero__bg" />
        </picture>
        <img src={IMG.logo} alt="Last First Dates with Maxence" className="lfd-hero__logo" />
        <p className="lfd-hero__intro">
          Maxence the French Chef lives in Copenhagen, cooks at an Italian restaurant, and is looking for love.
          That makes him a decent enough lead for our newest cooking show, during which the sort-of-charming,
          occasionally moody Max meets a rotating cast of &ldquo;dates&rdquo;—we use that term loosely—and cooks
          them delicious meals made with Oatly. It gets slightly awkward at times.
        </p>
      </header>

      {/* ═══ TRAILER ═══ */}
      <section className="lfd-trailer" aria-label="Trailer">
        <iframe src={YT(TRAILER)} title="Last First Dates with Maxence — trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      </section>

      {/* ═══ RECIPE INDEX ═══ */}
      <nav className="lfd-menu" aria-label="Recipes">
        {MENU.map((g) => (
          <div key={g.group} className="lfd-menu__group">
            <h2>{g.group}</h2>
            {g.items.map((it) => (
              <a key={it.href} href={it.href} className="lfd-menu__row">
                <span className="lfd-menu__no">{it.no}</span>
                <span className="lfd-menu__name">{it.name}</span>
                <span className="lfd-menu__view">View</span>
              </a>
            ))}
          </div>
        ))}
        <FlyCherub src={IMG.cherub1} className="lfd-cherub" from="right" />
      </nav>

      {/* ═══ 01 RAMEN ═══ */}
      <Recipe
        id="spicy-mushroom-tantamen-ramen" no="01" group="Savoury"
        title="Spicy Mushroom Tantanmen Ramen" video="6JslwXtFvAU"
        serves="2" prep="20 min" extra={['Cook time', '30 min']}
        desc="This Tantanmen Ramen includes a rich, spicy broth made with Oatly Barista, complemented by a fragrant mushroom and ginger duxelles, pan-fried king oyster mushrooms, and fresh coriander."
        ingredients={[
          { h: 'Ramen Broth', items: [
            '<strong>20g</strong> crispy, spicy chili sauce',
            '<strong>20g</strong> sweet white miso paste',
            '<strong>20g</strong> sesame oil',
            '<strong>40g</strong> soy sauce',
            '<strong>700g</strong> Oatly Barista',
          ]},
          { h: 'Mushroom and Ginger Duxelles', items: [
            '<strong>100g</strong> shiitake or brown cap mushrooms, finely diced',
            '<strong>1 small</strong> shallot, peeled and finely chopped',
            '<strong>1 tsp</strong> fresh ginger, finely chopped',
            '<strong>1</strong> garlic clove, finely chopped',
            '<strong>1 tbsp</strong> neutral oil (e.g. vegetable oil)',
            'Sea salt and pepper, to taste',
          ]},
          { h: 'King Oyster Mushrooms', items: [
            '<strong>2 large</strong> king oyster mushrooms, cut in half lengthways and cross-hatched',
            '<strong>1 tbsp</strong> neutral oil (e.g. vegetable oil)',
            'Sea salt and pepper, to taste',
          ]},
          { h: 'Noodles and Garnishes', items: [
            '<strong>200g</strong> ramen noodles',
            '<strong>100g</strong> broccolini, trimmed, blanched in salted boiling water, shocked in iced water, drained',
            '<strong>50g</strong> big handful bean sprouts, washed',
            'Small bunch of fresh coriander, leaves picked',
            'Sea salt and pepper, to taste',
          ]},
        ]}
        equipment={[
          'Medium saucepan to boil the oat milk (for the Tantanmen Broth)',
          'Large mixing bowl (for the Tantanmen Broth)',
          'Whisk',
          'Large frying pan (for Duxelles & King Oyster mushrooms)',
          'Pot for boiling noodles',
          'Strainer or noodle basket',
          '2 x Ramen soup bowls',
          'Chopsticks and soup spoons for serving',
        ]}
        steps={[
          { t: 'Cooking the Mushroom and Ginger Duxelles & King Oyster Mushrooms.',
            d: 'Heat neutral oil in a medium skillet over medium heat. Sauté the shallot for 2 to 3 minutes until translucent. Add the ginger and garlic and cook for another minute. Add the finely diced mushrooms, season with sea salt, and cook until they release their moisture and become golden, about 8 to 10 minutes. Season with freshly ground black pepper. Set aside. In a large frying pan, season the scored side of the king oyster mushrooms with sea salt and pepper. Pan fry scored side down for 5 to 6 minutes until golden and crispy. Flip and cook for another 2 minutes. Set aside.' },
          { t: 'Make the Broth.',
            d: 'In a mixing bowl, whisk together chili sauce, miso paste, sesame oil, and soy sauce until smooth. In the medium saucepan, bring the Oatly Barista to a boil and remove from heat. Little by little, whisk the hot Oatly Barista into the paste mixture until fully combined and smooth.' },
          { t: 'Assemble the Ramen Bowls.',
            d: 'Return your broth to a full boil so it is piping hot and ladle into your ramen bowls. Cook your noodles until al dente, strain and divide evenly between two bowls. Top each bowl with the mushroom and ginger duxelles, pan-fried king oyster mushrooms, blanched broccolini, and fresh coriander leaves. Serve straight away.' },
        ]}
      />

      {/* ═══ 02 KOHLRABI ═══ */}
      <Recipe
        id="kohlrabi-green-steak" no="02" group="Savoury"
        title="Kohlrabi Green Steak" video="nSMMGJy7KgY"
        serves="2" prep="15 min" extra={['Cook time', '45 min']}
        desc="Adapting a traditional French fondant technique, this recipe uses pre-steaming to shorten cooking time and enhance texture. It transforms the little-known Kohlrabi from a sweet, crisp vegetable into one with a buttery, meaty texture."
        ingredients={[{ h: '', items: [
          '<strong>300g</strong> medium kohlrabi washed, peeled, and sliced into two equally thick steaks (reserve peelings for sauce)',
          '<strong>30g</strong> plant butter',
          '<strong>30g</strong> flat-leaf parsley',
          '<strong>30g</strong> celery leaves',
          '<strong>200ml</strong> Oatly Barista',
          '<strong>2</strong> celery stalks, washed, stripped from the leaves (reserve leaves for the sauce)',
          '<strong>80g</strong> kale leaves (30g for herb sauce, 50g for garnish) stripped from stalks',
          'Olive oil',
          'Sea salt and pepper, to taste',
        ]}]}
        equipment={[
          'Medium saucepan for the sauce',
          'Saucepan to hold the bamboo steamer',
          '2 medium frying pans (1 for Kohlrabi & 1 for celery and kale)',
          'Small blender or immersion blender',
          'Serving bowl plates x 4',
          'Parchment paper (for cartouche for caramelised Kohlrabi steak)',
          'Tongs',
        ]}
        steps={[
          { t: 'Cook the Kohlrabi.',
            d: 'Pre-steam the kohlrabi steaks in a bamboo steamer for 10 minutes. Transfer to a pre-heated, fan-assisted oven or air fryer at 180°C. Add plant butter and 60ml of water to cook kohlrabi like a fondant. Cook until tender and lightly caramelised, basting occasionally.' },
          { t: 'Prepare the Leaf Sauce.',
            d: 'Bring the Oatly Barista to a simmer with the reserved kohlrabi peelings, celery leaves, and parsley. Cook until softened. Strain into a small blender and blend into a smooth sauce. Taste and adjust the seasoning with salt and pepper.' },
          { t: 'Pan Fry the Kale and Celery.',
            d: 'In a medium frying pan on medium heat, cook the kale and celery with a drizzle of olive oil and a sprinkle of salt for 8 to 12 minutes, until the celery is tender and the kale is green with a crunch and lightly caramelised.' },
          { t: 'Serving.',
            d: 'Place the caramelised kohlrabi steak at the center of the plate. Spoon the blended leaf sauce over the kohlrabi. Arrange the celery and kale around the steak and serve.' },
        ]}
      />

      {/* ═══ 03 CREPES ═══ */}
      <Recipe
        id="crepes-chocolat-chantilly" no="03" group="Sweet"
        title="Crêpes Chocolat Chantilly" video="1DmpIxHSGnE"
        serves="2" prep="15 min (1h resting)" extra={['Rest time', '10 min']}
        desc="The plant-based riff on classic crêpes features light and tender pancakes with a chantilly cream and rich melted chocolate."
        ingredients={[
          { h: 'Crêpes Batter', items: [
            '<strong>125ml</strong> Oatly oat drink',
            '<strong>40g</strong> flour',
            '<strong>10g</strong> corn starch',
            '<strong>12g</strong> sugar',
            '<strong>12g</strong> neutral oil (e.g. vegetable oil)',
            '<strong>1 splash</strong> of rum (optional)',
          ]},
          { h: 'Chantilly Cream', items: [
            '<strong>100ml</strong> Oatly Whippable Creamy Oat',
            '<strong>10g</strong> icing sugar (or to taste)',
            '<strong>½ tsp</strong> vanilla extract',
          ]},
          { h: 'Chocolate Sauce', items: [
            '<strong>50g</strong> dark chocolate (70% or vegan-certified)',
            '<strong>25ml</strong> Oatly oat drink',
          ]},
        ]}
        equipment={[
          'Mixing bowls', 'Whisk', 'Crepe pan or non-stick frying pan',
          'Ladle or measuring cup', 'Spatula',
          'Electric hand mixer or stand mixer (for the chantilly)', 'Small saucepan',
        ]}
        steps={[
          { t: 'Prepare the Crêpes Batter.',
            d: 'Whisk together the flour, corn starch, and sugar. Gradually pour in the Oatly oat drink, whisking continuously to avoid lumps. Add the oil and rum (if using) and whisk until smooth. Cover and rest in the fridge for 1 hour.' },
          { t: 'Cook the Crêpes.',
            d: 'Heat a nonstick crêpe pan over medium heat and lightly grease. Ladle batter, swirling to a thin layer. Cook 1 to 2 minutes until edges lift, flip and cook 30 seconds more. Repeat and stack.' },
          { t: 'Make the Chantilly Cream.',
            d: 'In a cold bowl, whip the Whippable Creamy Oat, icing sugar, and vanilla until soft peaks form. Refrigerate until serving.' },
          { t: 'Prepare the Chocolate Sauce.',
            d: 'In a small saucepan over low heat, combine dark chocolate and oat drink. Stir until melted, smooth and glossy.' },
          { t: 'Assemble the Dish.',
            d: 'Fold or roll the crêpes, top with chantilly cream and drizzle with warm chocolate sauce.' },
        ]}
      />

      {/* ═══ 04 ILE FLOTTANTE ═══ */}
      <Recipe
        id="ile-flottante" no="04" group="Sweet"
        title="île Flottante" video="aurYghk4zjk"
        serves="2" prep="15 min" extra={['Cook time', '10 min (4-24h cooling)']}
        desc="A delicate oat-based version of the classic Île Flottante: meringue poached in Oatly Barista and infused with vanilla, served with creamy Oatly Vanilla Custard."
        ingredients={[
          { h: 'Meringue', items: [
            '<strong>2</strong> eggs (egg whites only)',
            '<strong>2 tbsp</strong> caster sugar',
            'Seeds of 1 vanilla pod',
            '<strong>300g</strong> Oatly Vanilla Custard',
            '<strong>300ml</strong> Oatly Barista, used for poaching',
          ]},
          { h: 'Caramel', items: [
            '<strong>120g</strong> caster sugar',
            '<strong>100ml</strong> water',
            '<strong>100ml</strong> Oatly oat drink to finish',
          ]},
        ]}
        equipment={[
          'Medium saucepan', 'Whisk or electric whisking machine', 'Fine sieve',
          'Mixing bowl', 'Small saucepan for caramel', 'Spatula',
          'Micro-scale (for precise measurement)', 'Serving bowls / Glasses',
          'Ring moulds to set the meringue',
        ]}
        steps={[
          { t: 'Make the Meringue.',
            d: 'Beat the egg whites, adding sugar slowly, until thick and glossy — do not over-beat. Heat Oatly Barista in a wide pan until steaming, not boiling. Poach heaped teaspoons of meringue for 3 to 4 minutes until set. Remove and cool on a plate.' },
          { t: 'Make the Caramel.',
            d: 'Melt caster sugar slowly without stirring, from blond to golden, until the first plume of smoke. Stop the cooking with water (careful, it may splatter), add the Oatly oat drink and cook until it coats the back of a spoon. Cool slightly.' },
          { t: 'Assemble the Île Flottante.',
            d: 'Pour chilled Oatly Vanilla Custard into a plate or glass, top with meringues and spoon over the caramel.' },
        ]}
      />

      <div className="lfd-drinks-head">
        <FlyCherub src={IMG.cherub3} className="lfd-cherub" from="left" />
        <h2>Drinks</h2>
      </div>

      {/* ═══ 05 GOLDEN MILK ═══ */}
      <Recipe
        id="golden-milk" no="05" group="Drinks"
        title="Golden Milk" video="_dDpBObFizM"
        serves="2" prep="5 min" extra={['Cook time', '—']}
        desc="A warming, vibrant drink made with turmeric and Oatly Barista. The recipe uses a small blender to create a light, airy texture in the creamy and frothy delight."
        ingredients={[{ h: '', items: [
          '<strong>1 tbsp</strong> turmeric',
          '<strong>1 tbsp</strong> cinnamon',
          '<strong>1 tbsp</strong> vanilla sugar',
          '<strong>1 tbsp</strong> cardamon',
          'Oatly Barista', 'Honey', 'Ginger', 'Salt', 'Pepper',
        ]}]}
        equipment={['Small blender', 'Fine mesh strainer (optional)', 'Measuring spoons', 'Tall serving glasses']}
        steps={[{ t: '', d: 'In a small blender, combine dry ingredients. Heat the Oatly Barista milk, honey and the dry mix. Pour into two tall glasses. Serve hot.' }]}
      />

      {/* ═══ 06 MEXICAN COFFEE ═══ */}
      <Recipe
        id="mexican-coffee" no="06" group="Drinks"
        title="Mexican Coffee" video="RMBimKs6OKY"
        serves="2" prep="5 min" extra={['Cook time', '—']}
        desc="The cousin of the Irish coffee but stronger."
        ingredients={[{ h: '', items: [
          '<strong>1 vol</strong> Tequila',
          '<strong>2 vol</strong> Coffee liqueur',
          'Oatly Whippable Creamy Oat',
          'Sugar / sugar syrup',
          '<strong>10 shots</strong> of freshly brewed coffee',
        ]}]}
        equipment={['Shaker', 'Measuring spoons', 'Tall serving glasses']}
        steps={[{ t: '', d: 'Add the tequila, liqueur, sugar syrup, and chilled coffee to your shaker. Add ice and shake it cold! Strain into a bottom-filled highball glass. Add the whipped Oatly on top. Serve!' }]}
      />

      <section className="lfd-more">
        <a href="/things-we-do"><span>Read more</span><strong>Things we do →</strong></a>
      </section>
    </div>
  );
}
