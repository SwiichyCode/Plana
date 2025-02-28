'use server';

import { authActionClient } from '@/libs/next-safe-action.config';

export const handleUserChatbotWithStreamingAction = authActionClient.action(async ({ parsedInput }) => {});
