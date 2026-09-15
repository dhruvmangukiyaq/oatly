// ─── BACKEND CONTROLLER ─────────────────────────────────────────────────────
// Content (sustainability / nutrition / homepage / meta / future-of-taste).

import * as Content from '../models/contentModel.js';

export function getSustainability(req, res) {
  res.json(Content.getSustainabilityData());
}

export function getSustainabilitySection(req, res) {
  const section = Content.getSustainabilitySection(req.params.key);
  if (!section) return res.status(404).json({ error: 'Section not found' });
  res.json(section);
}

export function getPlan(req, res) {
  res.json(Content.getSustainabilityPlan());
}

export function getNutrition(req, res) {
  res.json(Content.getNutritionFacts());
}

export function getMeta(req, res) {
  res.json(Content.getSiteMeta());
}

export function getFutureOfTaste(req, res) {
  res.json(Content.getFutureOfTaste());
}

export function getHome(req, res) {
  res.json({ images: Content.getHomepageImages(), cards: Content.getHomepageCards() });
}
