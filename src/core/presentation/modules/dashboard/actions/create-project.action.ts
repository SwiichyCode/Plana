'use server';

import { getInjection } from '#di/container';
import { authActionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CreateProjectActionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const createProjectAction = authActionClient
  .schema(CreateProjectActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const projectService = getInjection('ProjectService');

    try {
      await projectService.create({ ...parsedInput, ownerId: ctx.userId });
      redirect('/dashboard');
    } catch (error) {
      throw error;
    }
  });
