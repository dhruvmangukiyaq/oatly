import React from 'react';
import SEO from '../components/SEO';
import ResponsiveImage from '../components/ResponsiveImage';
import '../styles/PeeForPlanet.css';

// ─── VIEW ───────────────────────────────────────────────────────────────────
// Dedicated Pee for the Planet page — mirrors
// oatly.com/things-we-do/initiatives/pee-for-the-planet top to bottom:
// hero logo + tagline → sponsor logos → Pee-O-Meter → a problem (3 facts) →
// a solution (3 steps) → win-win → results (4 matches) → full article.
// Illustrations are official Oatly Storyblok artwork; copy is verbatim.

const SB = 'https://a.storyblok.com/f/107921';

const ASSETS = {
  logo: `${SB}/1352x1651/2f513682c7/main-logo.svg`,
  tagline: `${SB}/450x184/384130dd1f/your-pee.svg`,
  sponsors: `${SB}/1342x95/c95bef0999/sponsorlogos.svg`,
  meter: `${SB}/682x50/405e3b332e/en_meter.svg`,
  ex1: `${SB}/363x253/35b931a3cb/ex_1-en.svg`,
  ex2: `${SB}/377x205/25fc8c0e0c/ex_2.svg`,
  ex3: `${SB}/361x247/53d814f771/ex_3-en.svg`,
  ex4: `${SB}/362x410/3da94e17cd/ex_4.svg`,
  ex5: `${SB}/364x372/16053cfc31/ex_5.svg`,
  ex6: `${SB}/361x313/919021c008/ex_6.svg`,
  goal: `${SB}/664x418/2e2aad3ee0/goal.svg`,
  match1: `${SB}/486x265/75e9ae9852/match-1-en.svg`,
  match2: `${SB}/486x265/b67958659c/match-2-en.svg`,
  match3: `${SB}/486x265/cb94680156/match-3-en.svg`,
  match4: `${SB}/486x265/47c0317f33/match-4-en.svg`,
};

const PROBLEM = [
  {
    img: ASSETS.ex1,
    alt: 'Illustration of speech bubble with the text "1.3 billions tonnes of CO₂e"',
    text: 'Each year, the fertilizer industry releases more than 1.3 billion tonnes of CO₂e globally. That’s 23% more than the entire aviation industry!',
  },
  {
    img: ASSETS.ex2,
    alt: 'Illustration of a tractor on fields',
    text: 'Production of synthetic fertiliser relies heavily on fossil fuels, creating major challenges for farmers as oil production declines.',
  },
  {
    img: ASSETS.ex3,
    alt: 'Illustration of a cannister with "Urine" written on it',
    text: 'At the same time, we flush away an amazing resource that contains essentially the same nutrients as synthetic fertilizer: urine.',
  },
];

const SOLUTION = [
  {
    img: ASSETS.ex4,
    alt: 'Illustration of a man peeing waving his hand',
    text: 'Oatly, Malmö FF, Sanitation 360, Malmö Stad and VA Syd collect urine from supporters at Eleda Stadium.',
  },
  {
    img: ASSETS.ex5,
    alt: 'Illustration of small white pellets',
    text: 'The urine is dried and together with by-products from Oatly’s oat drink production, transformed into fertilizer pellets with a lower environmental impact.',
  },
  {
    img: ASSETS.ex6,
    alt: 'Illustration of a globe with hand wrapped around it',
    text: 'The pellets are tested for fertilizing everything from oat fields to football pitches.',
  },
];

const MATCHES = [
  { img: ASSETS.match1, alt: 'MFF vs. VSK' },
  { img: ASSETS.match2, alt: 'MFF vs. HBK' },
  { img: ASSETS.match3, alt: 'Malmö FF vs IFK Göteborg' },
  { img: ASSETS.match4, alt: 'Malmö FF vs IF Elfsborg' },
];

export default function PeeForPlanetPage() {
  return (
    <div className="pee">
      <SEO
        title="Pee for the Planet: Human Urine as Fertilizer"
        description="Oatly, Malmö FF, SLU and Sanitation360 are testing whether human urine can replace fossil-based fertilizer. Meet the Pee for the Planet research project."
        pathname="/things-we-do/initiatives/pee-for-the-planet"
      />
      <div className="pee__inner">
        {/* Hero: toilet-paper banner logo + tagline */}
        <img src={ASSETS.logo} alt='A toilet paper roll formed into a banner like scarf with the text "Pee for the Planet"' className="pee-logo" />
        <img src={ASSETS.tagline} alt="Your pee. The fertilizer of the future." className="pee-tagline" />
        <p className="pee-funded">
          A research project funded by Formas, initiated by Oatly, Malmö FF, Sanitation 360
          and SLU, in collaboration with City of Malmö and VA Syd.
        </p>
        <img src={ASSETS.sponsors} alt="Vasyd, Sanitation 360, Malmö FF, Oatly, Malmö Stad, SLU, Formas" className="pee-sponsors" loading="lazy" />

        {/* Pee-O-Meter */}
        <div className="pee-meter">
          <p className="pee-meter__label">Pee-O-Meter, 198/10 000l</p>
          <a href="#results" className="pee-meter__link">
            <ResponsiveImage src={ASSETS.meter} alt="Pee-o-meter 651/1000l - View results" />
          </a>
        </div>

        {/* A problem: 3 illustrated facts */}
        <h2 className="pee-section">a problem</h2>
        <div className="pee-steps">
          {PROBLEM.map((item) => (
            <div key={item.img} className="pee-step">
              <ResponsiveImage src={item.img} alt={item.alt} className="pee-step__img" />
              <p className="pee-step__text">{item.text}</p>
            </div>
          ))}
        </div>

        {/* A solution: 3 steps */}
        <h2 className="pee-section">A solution</h2>
        <div className="pee-steps">
          {SOLUTION.map((item) => (
            <div key={item.img} className="pee-step">
              <ResponsiveImage src={item.img} alt={item.alt} className="pee-step__img" />
              <p className="pee-step__text">{item.text}</p>
            </div>
          ))}
        </div>

        {/* A total win-win! */}
        <h2 className="pee-section">A total win-win!</h2>
        <p className="pee-body">
          If everything goes according to plan, together we can show the world how nutrient
          rich and valuable ordinary urine can be as a circular fertilizer resource. We can
          reduce our dependence on synthetic fertilizer and become more self-sufficient. And
          we can reduce eutrophication... in our lakes, seas, and waterways.
        </p>
        <p className="pee-body">How smart is that?</p>
        <img src={ASSETS.goal} alt="An illustration of a leg kicking a football into a goal." className="pee-goal" loading="lazy" />

        {/* Results */}
        <h2 className="pee-section" id="results">Results</h2>
        <div className="pee-matches">
          {MATCHES.map((m) => (
            <ResponsiveImage key={m.img} src={m.img} alt={m.alt} className="pee-match" />
          ))}
        </div>

        {/* Feature article */}
        <h2 className="pee-article-title">Piss-pellets for plant health</h2>
        <h3 className="pee-article-sub">
          How a football club, their supporters, and an oat-drink company in Sweden got
          involved in a science project about your bathroom break.
        </h3>

        <h3 className="pee-h">The world is dependent on inorganic fertilizers that aren’t good for the planet.</h3>
        <p className="pee-body">
          Nitrogen is a key nutrient in synthetic and organic fertilizers that plants need to
          grow, build proteins and yield healthy crops. The global industry for synthetic
          nitrogen fertilizers emits more than 1.13 billion tonnes of CO₂e every year* or
          around 2,1% of total global emissions and roughly 11% of global agricultural
          emissions.
        </p>
        <p className="pee-body">
          By comparison, that&apos;s 23% higher than the emissions from the entire aviation
          sector.... What&apos;s needed is a never-ending alternative source of nitrogen to
          replace synthetic and inorganic fertilizers, and do you know what is high in
          nitrogen? Well, it&apos;s that golden waste stream your body emits when you need to
          release pressure a few times a day! You and every other human on this soil-rich
          earth of ours. But here&apos;s the thing, urine shouldn&apos;t be viewed as bodily
          waste; it&apos;s a bodily resource! Using urine as a resource is a soil-healthy golden
          opportunity for people, plants and the planet if done in the right way.
        </p>

        <h3 className="pee-h">We&apos;re not taking the piss, human urine is a resource!</h3>
        <p className="pee-body">
          While everyone would probably join in on a global thank you to all wastewater
          treatment plants, modern society wouldn&apos;t feel as modern without them;
          they&apos;re also a source of over-fertilization in our oceans. Well, actually,
          it&apos;s all of us using the bathroom, but thankfully, this is one of the more
          addressable sources of nutrient pollution, since we&apos;re flushing away this
          amazing resource and excellent organic fertilizer with essentially the same
          nutrient content as synthetic fertilizer.
        </p>
        <p className="pee-body">
          If the world could find a way to recycle our own urine, we could reduce pressure
          not only on our bladders but also on the wastewater treatment plants, causing less
          nutrient pollution in the sea, and healthy plant growth at the same time. And this
          is what a two-year science project in Sweden will take a look at.
        </p>

        <h3 className="pee-h">Now, urine for some science.</h3>
        <p className="pee-body">
          Oatly is part of the science project Pee for the Planet, a two-year research
          project in Sweden, funded by <a href="https://formas.se/">Formas</a>, where{' '}
          <a href="https://www.slu.se/">SLU</a> together with Oatly,{' '}
          <a href="https://sanitation360.se/">Sanitation 360</a> and the best football club
          in the world, <a href="https://www.mff.se/">Malmö FF</a>, are investigating whether
          human urine can become a circular and safe alternative to fossil-based fertilizers.
          In theory, urine can replace up to 30% of the fertilizers used in Sweden, and the
          project tests how this resource can be collected, treated and used in a practical way.
        </p>
        <p className="pee-body">
          Staying within the planet&apos;s boundaries requires more than sustainable food
          products – it requires a changed food system. Fertilizer is one of the most
          fossil-dependent inputs in agriculture today, which is why more research on local
          and circular solutions like urine is needed. If successful, a scaled up version in
          the long term could help create a food system that provides increased stability for
          farmers, reduces emissions and contributes to a more secure food supply.
        </p>
        <p className="pee-body">
          Soil fertilizing needs to be addressed on two levels. First, we need to reduce
          fertilizer dependence by improving soil health and using new technology that
          provides greater precision in application. Second, we need to invest in a shift that
          can reduce dependence on imported inorganic fertilizer to local and circular
          solutions for the fertilizer that is still needed.
        </p>
        <p className="pee-body">
          For us as a food company, this is about reducing unnecessary dependencies in the
          food system and showing how circular solutions can strengthen food security and our
          long-term ability to produce food and competitiveness.
        </p>

        <h3 className="pee-h">Everyone&apos;s number one at Eleda Stadium!</h3>
        <p className="pee-body">
          A football arena with thousands of drinking supporters is the perfect microcosm to
          act as a pilot site for large-scale public contribution of urine. As luck would have
          it, the Swedish football team Malmö FF is as focused on sustainability as it is on
          being the world&apos;s greatest soccer team, and MFF didn&apos;t hesitate for a
          second to install the urinals and toilets needed for the project at their home
          stadium. At Eleda stadium, we can test the technology, hygiene, logistics and
          acceptance of recycling pee (peecycling) in practice. If it works there, we believe
          it can work in almost any other social environment.
        </p>

        <h3 className="pee-h">Male urine, female urine, non-binary urine — every drop counts</h3>
        <p className="pee-body">
          During the football season 2026 in Sweden (Allsvenskan) we&apos;re collecting pee
          from football supporters at Eleda Stadion. No behaviour change is required from
          supporters; they simply go to the bathroom as usual. During collection, a
          food-grade stabilizer is added to keep it safe and capture the nutrients,
          especially nitrogen, which would otherwise escape into the air and cause strong
          smells. The setup at Eleda Stadion is 11 urinals and a unisex bathroom with a
          regular toilet inside the arena, plus four mobile unisex urinals near the entrance
          outside. For this pilot project, the goal is to collect 1000 liters of urine,
          enough to test the technique and operational systems at a larger scale.
        </p>

        <h3 className="pee-h">Urine: from human waste to pellet fertilizer</h3>
        <p className="pee-body">
          Using human urine as a fertilizer option is not a new method for plant growth.
          Organic fertilizers have been used for centuries, long before industrial farming,
          relying on natural materials like plant matter, compost, and animal manure to
          nourish plant growth. There are records suggesting that urine was used as an
          effective organic fertilizer back in ancient China as well as ancient Rome.
        </p>
        <p className="pee-body">
          Today, <a href="https://sanitation360.se/">Sanitation360</a> have taken the
          technique for collecting and stabilizing urine, developed by{' '}
          <a href="https://www.slu.se/">SLU</a> (Swedish University of Agricultural
          Sciences), and spent many years driving the scientific development of how to
          safely recirculate plant nutrients from urine back to the agricultural field.
        </p>
        <p className="pee-body">
          The collected urine from Eleda is then dried in closed containers, blended with
          by-products from Oatly&apos;s oat drink production and turned into pellets called
          Granurin – a urine fertilizer that behaves more like the granular fertilizer
          farmers are already used to handling. The Granurin pellets release nutrients
          slowly, reduce environmental impact compared to synthetic alternatives, and can be
          used for a variety of crops and vegetables in plant rows, flower beds, oat fields,
          and football pitches.
        </p>
        <p className="pee-body">
          Compared to the diffuse runoff from animal agriculture, which is genuinely hard to
          control field by field, these toilet systems are centralized and engineerable.
          Recycling urine before it ever hits the wastewater treatment plant means fewer
          excess nutrients flowing into rivers, lakes, and the Baltic. It means less nitrogen
          and phosphorus ending up where they cause harm, and more ending up where they
          actually help.
        </p>
        <p className="pee-body">
          Oatly aims to explore the possibility of developing food products made from oats
          cultivated by <a href="https://www.slu.se/">SLU</a>, using the Granurin pellets at
          a test farm in Sweden. Full circle collaboration. The project is also supported by{' '}
          <a href="https://malmo.se/">The City of Malmö</a> and{' '}
          <a href="https://www.vasyd.se/">VA Syd</a>, one of Sweden&apos;s largest waste and
          wastewater organisations, who contribute expertise in municipal water and
          wastewater services and provide opportunities for further upscaling.
        </p>

        <h3 className="pee-h">Why not let urine be a liquid fertilizer?</h3>
        <p className="pee-body">
          Plenty of home growers are already using urine in the garden straight from the
          source, spiking their watering can and showering the soil organisms in the hope of
          some root growth. They apply it directly to compost piles, compost bins, raised
          beds, or rows of sweet corn and other vegetables. So why bother with the pellets?
          A few reasons.
        </p>
        <p className="pee-body">
          <strong>Scale.</strong> Collecting urine from tens of thousands of football
          supporters and storing it as a liquid would require enormous tanks, complicated
          logistics, and a transportation footprint that would eat into the environmental
          gains. Drying it concentrates the nutrients and makes the end product easier to
          handle, store, and ship.
        </p>
        <p className="pee-body">
          <strong>Hygiene and safety.</strong> While human urine is generally considered
          low-risk, processing it into a stable pellet (which includes heat treatment)
          further reduces any concerns and makes the product more useful for commercial
          agriculture, where standards are (rightly) strict.
        </p>
        <p className="pee-body">
          <strong>Familiarity.</strong> Farmers know how to spread granular fertilizers. They
          already have the equipment, the timing, the muscle memory, and storage space.
          Pellets fit into existing workflows without asking anyone to redesign their season,
          that might not be the case for liquid urine.
        </p>
        <p className="pee-body">
          <strong>Concentration of nutrients.</strong> When urine is in its raw liquid form,
          the three primary macronutrients essential for plant growth, Nitrogen, Phosphorus,
          and Potassium (Kalium), are so diluted that you have to spread very large amounts
          to achieve enough. The concentrated Granurin pellet is more effective and has
          levels Nitrogen, Phosphorus and Potassium similar to inorganic fertilizer.
        </p>

        <h3 className="pee-h">From football season to growing season with an organic fertilizer</h3>
        <p className="pee-body">
          When the football season is over and we&apos;ve collected enough of
          supporter-fueled pee, it&apos;s time to move the research towards the fields.
          SLU&apos;s field trials will initially focus on analyzing the nutrient composition
          of Granurin, specifically its content of nitrogen, phosphorus, and potassium. The
          team of researchers will assess the stability and consistency of these nutrient
          levels, establishing a foundation for future agronomic evaluations.
        </p>
        <p className="pee-body">
          Granurin offers several important benefits that make it highly relevant for these
          trials. Nutritionally, it stands out among organic fertilizers due to its high
          nitrogen content (around 15%...), allowing it to better meet the performance
          requirements of modern agriculture. Its nutrients are soluble in water and readily
          available for plant uptake, meaning its function is similar to mineral fertilizers
          in terms of efficiency and yield potential.
        </p>
        <p className="pee-body">
          In addition, Granurin contributes to circular nutrient systems by recycling human
          urine, which has documented climate and environmental benefits compared to
          conventional fertilizer production. Together, these qualities position Granurin as
          a high-quality, sustainable alternative within organic farming systems.
        </p>

        <h3 className="pee-h">A nutrient-rich earth without the ick factor</h3>
        <p className="pee-body">
          There already exist many organic fertilizers, like manure, recycled residues, and
          wool pellets but they&apos;re far from enough. The reason for focusing on pellets
          made from pee combined with other organic material, like our oat residue, is that
          pee is safe to use as fertilizer and easy to treat and clean from residues of
          strong medicines for instance. Unlike human faeces, pee is more cost-effective to
          handle, requires less advanced technique because faeces contain higher levels of
          heavy metals and pathogens. Also, the dry, odourless, hygienic pellets have no ick
          factor, which makes the farmer&apos;s everyday life a little easier.
        </p>

        <h3 className="pee-h">Why Oatly cares about urine plants fertilizers</h3>
        <p className="pee-body">
          At its core, it&apos;s about transforming and rethinking the food system.
          Oatly&apos;s ambition is to help shift the food system toward a more just,
          nutritious, and abundant system that operates within planetary boundaries. That
          includes supporting an agricultural shift to regenerative, low-impact,
          plant-centric production. One example of this is Oatlys FARM program, which
          incentivizes practices that increase soil health and have environmental and
          financial benefits to land and farmers. Part of this programme is supporting
          farmers in reducing the fertilizer they use. Read more on the progress of our FARM
          program in our{' '}
          <a href="https://investors.oatly.com/static-files/ff1da040-3e10-4792-9bd0-16ddb2ef6147">
            Sustainability Update 2025
          </a>
          !
        </p>

        <h3 className="pee-h">It truly is a piss project</h3>
        <p className="pee-body">
          The experiment is conducted in Malmö, Sweden, because it&apos;s the hometown of
          Oatly and all the actors are Swedish organisations. Sweden is also a country
          highly dependent on imported, energy-consuming, chemical fertilizers and would
          benefit greatly from a solution like this project proposes. It&apos;s a path
          toward stronger food security, reduced eutrophication in the Baltic, and a more
          resilient agricultural system that builds soil organic matter rather than
          depleting it. A circular system where the nutrients in our food come back around
          to grow more food, instead of being treated as a problem to flush away.
        </p>
        <p className="pee-body">
          In conclusion, Pee For the Planet is a true piss project, and we wouldn&apos;t
          want it any other way.
        </p>
      </div>
    </div>
  );
}
