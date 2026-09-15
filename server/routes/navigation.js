// ─── BACKEND ROUTES: navigation ─────────────────────────────────────────────
import { Router } from 'express';
import * as C from '../controllers/navigationController.js';

const router = Router();

router.get('/', C.listItems);

export default router;
