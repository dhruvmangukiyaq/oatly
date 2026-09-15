// ─── BACKEND MODEL ──────────────────────────────────────────────────────────
// Sustainability / Health / Homepage / Site-meta data access (pure functions).

import { SUSTAINABILITY_PLAN, NUTRITION_FACTS } from './data/oatlyData.js';
import { sustainabilityData, siteMeta } from './data/siteData.js';
import { FUTURE_OF_TASTE } from './data/futureOfTaste.js';
import { IMAGES, CARDS } from './data/homepage.js';

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

export function getFutureOfTaste() {
  return FUTURE_OF_TASTE;
}

export function getHomepageCards() {
  return CARDS;
}

export function getHomepageImages() {
  return IMAGES;
}
