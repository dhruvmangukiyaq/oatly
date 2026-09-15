// ─── BACKEND ROUTES: content ────────────────────────────────────────────────
import { Router } from 'express';
import * as C from '../controllers/contentController.js';

const router = Router();

router.get('/home', C.getHome);
router.get('/sustainability', C.getSustainability);
router.get('/sustainability/section/:key', C.getSustainabilitySection);
router.get('/plan', C.getPlan);
router.get('/nutrition', C.getNutrition);
router.get('/future-of-taste', C.getFutureOfTaste);
router.get('/meta', C.getMeta);

export default router;
