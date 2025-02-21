'use server';

import { getInjection } from '#di/container';
import { SupportedLLMProvider } from '@/core/infrastructure/adapters/llm/llm-provider-handler';
import { authActionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const UpdateLLMConfigActionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  projectDescriptionContext: z.string().optional(),
  llmProvider: z.string(),
  llmModel: z.string(),
  llmApiKey: z.string(),
});

export const updateLLMConfigAction = authActionClient
  .schema(UpdateLLMConfigActionSchema)
  .action(async ({ parsedInput }) => {
    const updateProjectUseCase = getInjection('UpdateProjectUseCase');
    try {
      await updateProjectUseCase.execute({
        id: parsedInput.id,
        llmProvider: parsedInput.llmProvider as SupportedLLMProvider,
        llmModel: parsedInput.llmModel,
        llmApiKey: parsedInput.llmApiKey,
      });

      redirect(`/dashboard/projects/${parsedInput.id}/settings`);
    } catch (error) {
      throw error;
    }
  });
