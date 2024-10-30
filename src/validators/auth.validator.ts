import { z } from 'zod';
import { Role } from '@prisma/client';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: z.enum([Role.USER, Role.ADMIN, Role.DEVELOPER]).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});