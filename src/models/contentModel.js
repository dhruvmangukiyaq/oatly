// ─── MODEL (MVC) ────────────────────────────────────────────────────────────
// Pure JavaScript data-access layer for Sustainability + Health + Homepage.

import { SUSTAINABILITY_PLAN, NUTRITION_FACTS } from '../data/oatlyData.js';
import { sustainabilityData, siteMeta } from '../data/siteData.js';
import { IMAGES, CARDS } from './homepage.js';

export function getSustainabilityPlan() {
  return SUSTAINABILITY_PLAN;
}

export function getSustainabilityData() {
  return sustainabilityData;
}

export function getSustainabilitySection(key) {
  return sustainabilityData.sections[key] || null;
}

export function getNutritionFacts() {
  return NUTRITION_FACTS;
}

export function getSiteMeta() {
  return siteMeta;
}

export function getHomepageCards() {
  return CARDS;
}

export function getHomepageImages() {
  return IMAGES;
}

const ContentModel = {
  getSustainabilityPlan,
  getSustainabilityData,
  getSustainabilitySection,
  getNutritionFacts,
  getSiteMeta,
  getHomepageCards,
  getHomepageImages,
};

export default ContentModel;
