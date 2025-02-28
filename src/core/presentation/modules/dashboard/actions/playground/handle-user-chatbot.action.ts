'use server';

import { mistral } from '@/libs/mistral.config';
import { MyCustomError, authActionClient } from '@/libs/next-safe-action.config';
import { prisma } from '@/libs/prisma.config';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const handleUserChatbotActionSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export const handleUserChatbotAction = authActionClient
  .schema(handleUserChatbotActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      // 1. Get the LLM configuration from the database
      const project = await prisma.project.findUnique({
        where: { id: parsedInput.id },
        select: { llmContext: true, llmProvider: true, llmModel: true, llmApiKey: true },
      });

      if (!project) throw new Error('Project not found');

      let { llmContext, llmProvider, llmModel, llmApiKey } = project;

      // 2. Add the user's message to the conversation history
      let conversationHistory = llmContext ? JSON.parse(llmContext) : [];
      conversationHistory.push({ role: 'user', content: parsedInput.content });

      // 3. Call Mistral API to compress the conversation history
      if (conversationHistory.length > 3) {
        const compressedConversationHistory = await mistral.chat.complete({
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'system',
              content:
                'Compress the following conversation into a concise summary while preserving all critical context, key information, and the essential flow of the discussion. Focus on maintaining the most relevant details that are necessary for continuing the conversation coherently.',
            },
            ...conversationHistory,
          ],
        });

        if (!compressedConversationHistory?.choices?.[0]?.message?.content)
          throw new Error('Compressed conversation history is empty');

        const compressedConversationHistoryResponse = compressedConversationHistory.choices[0].message.content;

        llmContext = JSON.stringify([
          ...conversationHistory,
          { role: 'assistant', content: compressedConversationHistoryResponse },
        ]);

        conversationHistory = [
          ...conversationHistory,
          { role: 'assistant', content: compressedConversationHistoryResponse },
        ];
      }

      // 4. Call the LLM API to generate a response
      const response = await mistral.chat.complete({
        model: llmModel,
        messages: conversationHistory,
      });

      if (!response?.choices?.[0]?.message?.content) throw new Error('LLM response is empty');

      const responseContent = response.choices[0].message.content;

      // 5. Update the project's LLM context
      await prisma.project.update({
        where: { id: parsedInput.id },
        data: {
          llmContext: JSON.stringify([...conversationHistory, { role: 'assistant', content: responseContent }]),
        },
      });
    } catch (error) {
      if (error instanceof Error) throw new MyCustomError(error.message);
    }

    revalidatePath(`/dashboard/projects/${parsedInput.id}/playground`);
  });
