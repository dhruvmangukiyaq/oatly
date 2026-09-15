// ─── BACKEND ROUTES: products ───────────────────────────────────────────────
import { Router } from 'express';
import * as C from '../controllers/productsController.js';

const router = Router();

// NOTE: static paths first, param paths last.
router.get('/categories', C.listCategories);
router.get('/category-names', C.getCategoryNames);
router.get('/category/:slug', C.getCategory);
router.get('/item/:id', C.getProduct);
router.get('/', C.listProducts);

export default router;
