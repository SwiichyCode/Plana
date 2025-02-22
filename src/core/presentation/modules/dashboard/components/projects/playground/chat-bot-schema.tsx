import { z } from 'zod';

export const ChatBotSchema = z.object({
  content: z.string().min(1),
});
