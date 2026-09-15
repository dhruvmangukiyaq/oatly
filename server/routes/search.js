// ─── BACKEND ROUTES: search ─────────────────────────────────────────────────
import { Router } from 'express';
import * as C from '../controllers/searchController.js';

const router = Router();

// GET /api/search?q=barista → { products, recipes, news, popular }
router.get('/', C.search);

export default router;
