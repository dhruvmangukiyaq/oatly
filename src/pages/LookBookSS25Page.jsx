import React from 'react';
import LookBookCollection from '../components/LookBookCollection';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Mirrors oatly.com/recipes/look-book-spring-summer-2025: blue theme tag,
// serif title, intro line, horizontal hero artwork, 18 recipe cards.
// Collection arrives from the Model (async Express API).
import RecipeModel from '../models/recipeModel.js';
import { useApiData } from '../hooks/useApiData.js';

export default function LookBookSS25Page() {
  // MODEL (async API — page renders once the collection arrives)
  const collection = useApiData(() => RecipeModel.getSs25Collection(), []);
  if (!collection) return null;

  return (
    <LookBookCollection
      breadcrumb="LOOK BOOK S/S 25 | OATLY"
      tag="Look book S/S 25"
      tagClass="lb3-tag--blue"
      title="Look book Spring/Summer 2025"
      intro="When you're an oat drink company trying to see the future of coffee, it helps to have 60 ex-baristas and drinks specialists on the payroll spending their days hanging out at the coolest cafés and talking with the coolest baristas and drinks people in every corner of the planet. From matcha to cold brew and a few unidentifiable infusions in-between, there isn't much we haven't seen, sipped or raised an eyebrow at. Right now, the galaxy of coffee is exploding into a universe of taste experiences, and no, we're not talking about pumpkin spice latte… So what might be next? Thought you'd never ask."
      heroImage="https://assets.oatly.com/asset/6bbc3692-048b-4195-959b-f5adf8855a7f/w1080/WEB-Lookbook-SS25-Horizontal.png"
      heroAlt="The Oatly Look book"
      collection={collection}
      detailBase="/recipes/look-book-spring-summer-2025"
      seoTitle="Spring / Summer 2025 Look Book Recipes | Oatly"
      seoDescription="From matcha cold brew to Salty Banana Split and Tea x Coffee: 19 drink recipes made with Oatly."
      pathname="/recipes/look-book-spring-summer-2025"
    />
  );
}
