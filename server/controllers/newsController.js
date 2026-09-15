// ─── BACKEND CONTROLLER ─────────────────────────────────────────────────────
// News / stories: HTTP layer over newsModel.

import * as News from '../models/newsModel.js';

export function listAll(req, res) {
  res.json({ news: News.getAllNews(), stories: News.getAllStories() });
}

export function getBySlug(req, res) {
  const story = News.getStoryBySlug(req.params.slug);
  if (!story) return res.status(404).json({ error: 'Story not found' });
  res.json(story);
}
