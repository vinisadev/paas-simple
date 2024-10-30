import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { containerRoutes } from './container.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/containers', containerRoutes);

export { router as routes };
