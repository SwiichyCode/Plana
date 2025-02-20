'use server';

import { getInjection } from '#di/container';
import { authActionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const UpdateAiApiKeyActionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  aiApiKey: z.string(),
});

export const updateAiApiKeyAction = authActionClient
  .schema(UpdateAiApiKeyActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const projectService = getInjection('ProjectService');
      await projectService.update({ id: parsedInput.id, aiApiKey: parsedInput.aiApiKey });
      redirect(`/dashboard/projects/${parsedInput.id}/settings`);
    } catch (error) {
      throw error;
    }
  });
