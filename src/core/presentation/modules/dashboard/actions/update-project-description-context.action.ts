'use server';

import { getInjection } from '#di/container';
import { MyCustomError, authActionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const UpdateProjectDescriptionContextActionSchema = z.object({
  id: z.string(),
  projectDescriptionContext: z.string(),
});

export const updateProjectDescriptionContextAction = authActionClient
  .schema(UpdateProjectDescriptionContextActionSchema)
  .action(async ({ parsedInput }) => {
    const projectService = getInjection('ProjectService');
    try {
      await projectService.updateDescriptionContext(parsedInput.id, parsedInput.projectDescriptionContext);
      redirect(`/dashboard/projects/${parsedInput.id}/settings`);
    } catch (error) {
      if (error instanceof Error) throw new MyCustomError(error.message);
    }
  });
