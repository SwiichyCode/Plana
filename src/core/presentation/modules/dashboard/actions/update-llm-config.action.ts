'use server';

import { getInjection } from '#di/container';
import { LLMProviderHandler, SupportedLLMProvider } from '@/core/infrastructure/adapters/llm/llm-provider-handler';
import { authActionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const UpdateLLMConfigActionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  llmProvider: z.string(),
  llmApiKey: z.string(),
});

export const updateLLMConfigAction = authActionClient
  .schema(UpdateLLMConfigActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const projectService = getInjection('ProjectService');
      // TODO: Contact current LLM provider to verify API key
      // TODO: Create Abstraction for LLM providers

      const LLMHandler = new LLMProviderHandler();
      const isValidApiKey = await LLMHandler.validateApiKey(
        parsedInput.llmProvider as SupportedLLMProvider,
        parsedInput.llmApiKey,
      );

      if (!isValidApiKey) throw new Error('Invalid API key');

      await projectService.update({
        id: parsedInput.id,
        llmProvider: parsedInput.llmProvider,
        llmApiKey: parsedInput.llmApiKey,
      });
      redirect(`/dashboard/projects/${parsedInput.id}/settings`);
    } catch (error) {
      throw error;
    }
  });
