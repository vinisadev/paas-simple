import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';
import { UserPayload } from '../types/auth.types';
import { prisma } from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class AuthService {
  async register(email: string, password: string) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);

      // Create new user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Email already exists');
        }
      }
      throw error;
    }
  }

  async login(email: string, password: string): Promise<string> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn,
    });
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}