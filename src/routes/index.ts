import express, { Router, Request, Response } from 'express';
import { Role } from '@prisma/client';
import { authRoutes } from './auth.routes';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Protected routes with different role requirements
router.get(
  '/protected',
  authenticateToken,
  (req: Request, res: Response): void => {
    res.json({
      message: 'This is a protected route',
      user: req.user
    });
  }
);

router.get(
  '/admin',
  authenticateToken,
  requireRole([Role.ADMIN]),
  (req: Request, res: Response): void => {
    res.json({
      message: 'Welcome to the admin panel',
      user: req.user
    });
  }
);

router.get(
  '/developer',
  authenticateToken,
  requireRole([Role.DEVELOPER, Role.ADMIN]),
  (req: Request, res: Response): void => {
    res.json({
      message: 'Welcome to the developer console',
      user: req.user
    });
  }
);

export { router as routes };