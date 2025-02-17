import { z } from 'zod';

export const GenerateTaskSchema = z.object({
  prompt: z.string(),
});
