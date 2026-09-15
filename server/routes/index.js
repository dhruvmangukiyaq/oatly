// ─── BACKEND ROUTES INDEX ───────────────────────────────────────────────────
// Mounts every resource router under /api (see server.js).

import { Router } from 'express';
import products from './products.js';
import recipes from './recipes.js';
import news from './news.js';
import navigation from './navigation.js';
import content from './content.js';
import search from './search.js';

const router = Router();

router.use('/products', products);
router.use('/recipes', recipes);
router.use('/news', news);
router.use('/navigation', navigation);
router.use('/content', content);
router.use('/search', search);

router.get('/health', (req, res) => res.json({ ok: true }));

export default router;
