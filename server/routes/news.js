// ─── BACKEND ROUTES: news ───────────────────────────────────────────────────
import { Router } from 'express';
import * as C from '../controllers/newsController.js';

const router = Router();

router.get('/', C.listAll);
router.get('/:slug', C.getBySlug);

export default router;
