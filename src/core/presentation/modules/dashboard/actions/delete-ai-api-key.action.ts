'use server';

import { getInjection } from '#di/container';
import { actionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const DeleteAiApiKeyActionSchema = z.object({
  id: z.string(),
});

export const deleteAiApiKeyAction = actionClient.schema(DeleteAiApiKeyActionSchema).action(async ({ parsedInput }) => {
  try {
    const projectService = getInjection('ProjectService');
    await projectService.update({ id: parsedInput.id, aiApiKey: undefined });
    redirect(`/dashboard/projects/${parsedInput.id}/settings`);
  } catch (error) {
    throw error;
  }
});
