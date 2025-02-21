import { z } from 'zod';

export const LLMSetupSchema = z.object({
  llmProvider: z.string(),
  llmApiKey: z.string().min(1),
});
