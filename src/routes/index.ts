import express, { Router, Request, Response } from 'express';
import { authRoutes } from './auth.routes';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Protected routes
router.get(
  '/protected',
  express.json(),
  authenticateToken,
  (req: Request, res: Response) => {
    res.json({
      message: 'This is a protected route',
      user: req.user
    });
  }
);

export { router as routes };