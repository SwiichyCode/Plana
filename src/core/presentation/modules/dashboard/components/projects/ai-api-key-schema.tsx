import { z } from 'zod';

export const AiApiKeySchema = z.object({
  aiApiKey: z.string().min(1),
});
