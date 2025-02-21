'use server';

import { getInjection } from '#di/container';
import { authActionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const UpdateAiApiKeyActionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  llmProvider: z.string(),
  llmApiKey: z.string(),
});

export const updateAiApiKeyAction = authActionClient
  .schema(UpdateAiApiKeyActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const projectService = getInjection('ProjectService');
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
