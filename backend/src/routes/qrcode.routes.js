import { Router } from 'express';
import { authenticateJwt } from '../middlewares/authentication.middleware.js';

const router = Router();

router.get('/', authenticateJwt, obtenerQRCode);
router.post('/generate', authenticateJwt, generarQRCode);

export default router;
