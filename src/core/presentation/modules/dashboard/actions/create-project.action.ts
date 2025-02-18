'use server';

import { getInjection } from '#di/container';
import { authActionClient } from '@/libs/next-safe-action.config';
import { redirect } from 'next/navigation';

import { CreateProjectSchema } from '../components/projects/create-project-schema';

export const createProjectAction = authActionClient.schema(CreateProjectSchema).action(async ({ parsedInput, ctx }) => {
  const projectService = getInjection('ProjectService');

  try {
    await projectService.create({ ...parsedInput, ownerId: ctx.userId });
    redirect('/dashboard');
  } catch (error) {
    throw error;
  }
});
