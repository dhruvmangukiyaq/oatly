// ─── BACKEND ROUTES: recipes ────────────────────────────────────────────────
import { Router } from 'express';
import * as C from '../controllers/recipesController.js';

const router = Router();

router.get('/vol3', C.getVol3);
router.get('/aw25', C.getAw25);
router.get('/ss25', C.getSs25);
router.get('/featured', C.getFeatured);
router.get('/slug/:slug', C.getBySlug);

export default router;
