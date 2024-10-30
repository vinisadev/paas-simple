import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';
import { User, UserPayload } from '../types/auth.types';

export class AuthService {
  private users: User[] = []; // This will be replaced with a database later

  async register(email: string, password: string): Promise<User> {
    // Check if user already exists
    if (this.users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);

    // Create new user
    const user: User = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(user);
    return user;
  }

  async login(email: string, password: string): Promise<string> {
    // Find user
    const user = this.users.find(u => u.email === email);
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
      email: user.email
    };

    return jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn
    });
  }
}