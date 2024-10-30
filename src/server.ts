import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { routes } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check endpoint
app.get('/health', (req: Request, res: Response ) => {
  res.status(200).json({ status: 'healthy' });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

export default app;