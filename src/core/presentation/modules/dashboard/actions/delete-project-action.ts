'use server';

import { getInjection } from '#di/container';
import { authActionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const DeleteProjectActionSchema = z.object({
  projectId: z.string(),
});

export const deleteProjectAction = authActionClient
  .schema(DeleteProjectActionSchema)
  .action(async ({ parsedInput }) => {
    const projectService = getInjection('ProjectService');

    try {
      await projectService.delete(parsedInput.projectId);
      redirect('/dashboard');
    } catch (error) {
      throw error;
    }
  });
