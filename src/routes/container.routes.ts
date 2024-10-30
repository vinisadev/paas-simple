import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';
import { ContainerController } from '../controllers/container.controller';

const router = Router();
const containerController = new ContainerController();

// Apply authentication and role middleware to all container routes
router.use(authenticateToken);
router.use(requireRole([Role.DEVELOPER, Role.ADMIN]));

// Container management routes
router.post('/', containerController.createContainer);
router.get('/', containerController.listContainers);
router.get('/:id', containerController.getContainer);
router.get('/:id/logs', containerController.getContainerLogs);
router.post('/:id/start', containerController.startContainer);
router.post('/:id/stop', containerController.stopContainer);
router.delete('/:id', containerController.deleteContainer);

export { router as containerRoutes };