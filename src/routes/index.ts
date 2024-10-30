import { Router } from 'express';

const router = Router();

// Define routes here
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Simple PaaS API' });
});

export { router as routes };