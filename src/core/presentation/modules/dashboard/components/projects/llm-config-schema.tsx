import { z } from 'zod';

export const LLMConfigSchema = z.object({
  llmProvider: z.string(),
  llmApiKey: z.string().min(1),
});
