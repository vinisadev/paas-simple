import { z } from 'zod';

export const createContainerSchema = z.object({
  name: z.string().min(1).max(100),
  image: z.string().min(1),
  port: z.number().min(1024).max(65535).optional(),
  env: z.record(z.string(), z.string()).optional()
});