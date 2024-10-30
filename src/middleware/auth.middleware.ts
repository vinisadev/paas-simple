import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';
import { UserPayload } from '../types/auth.types';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Authentication token required' });
      return;
    }

    const payload = jwt.verify(token, authConfig.jwtSecret) as UserPayload;
    
    // Verify user exists in database
    await authService.getUserById(payload.id);
    
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).json({ error: error.message });
    } else {
      res.status(403).json({ error: 'Invalid or expired token' });
    }
    return;
  }
};