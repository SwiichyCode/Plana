import { auth } from '@clerk/nextjs/server';
import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from 'next-safe-action';

export class MyCustomError extends Error {} // eslint-disable-line @typescript-eslint/no-unused-vars

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    // Log to console.
    console.error('Action error:', e.message);

    // In this case, we can use the 'MyCustomError` class to unmask errors
    // and return them with their actual messages to the client.
    if (e instanceof MyCustomError) {
      return e.message;
    }

    // Every other error that occurs will be masked with the default message.
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session.userId) {
    throw new Error('Session not found!');
  }

  return next({ ctx: { userId: session.userId } });
});
