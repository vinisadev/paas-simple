import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extend Express's Request type definition
declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}