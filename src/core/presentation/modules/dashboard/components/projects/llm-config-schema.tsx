import { z } from 'zod';

export const LLMConfigSchema = z.object({
  llmProvider: z.string(),
  llmModel: z.string(),
  llmApiKey: z.string().min(1),
});
