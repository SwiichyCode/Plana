import { auth } from '@clerk/nextjs/server';
import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session.userId) {
    throw new Error('Session not found!');
  }

  return next({ ctx: { userId: session.userId } });
});
