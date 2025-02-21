'use server';

import { getInjection } from '#di/container';
import { actionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const DeleteLLMConfigActionSchema = z.object({
  id: z.string(),
});

export const deleteLLMConfigAction = actionClient
  .schema(DeleteLLMConfigActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const projectService = getInjection('ProjectService');
      await projectService.update({ id: parsedInput.id, llmProvider: undefined, llmApiKey: undefined });
      redirect(`/dashboard/projects/${parsedInput.id}/settings`);
    } catch (error) {
      throw error;
    }
  });
