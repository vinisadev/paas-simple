import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: 'An internal server error occurred',
      ...(process.env.NODE_ENV === 'development' && { details: err.message })
    }
  });
};