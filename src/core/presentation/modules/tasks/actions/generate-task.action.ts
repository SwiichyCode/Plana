'use server';

import { actionClient } from '@/libs/next-safe-action.config';
import { openai } from '@/libs/openai.config';
import { prisma } from '@/libs/prisma.config';
import { revalidatePath } from 'next/cache';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const generateTaskActionSchema = z.object({
  prompt: z.string(),
});

const generateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['Todo', 'InProgress', 'Completed', 'OnHold']),
});

export const generateTaskAction = actionClient.schema(generateTaskActionSchema).action(async ({ parsedInput }) => {
  try {
    const aiResponse = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini-2024-07-18',
      messages: [
        {
          role: 'system',
          content:
            'You are a task generator AI that uses the result of an execution agent to create new tasks with the following format: (Title: task description) (Status: task status)',
        },
        {
          role: 'user',
          content: parsedInput.prompt,
        },
      ],
      response_format: zodResponseFormat(generateTaskSchema, 'task'),
    });

    const generatedTasks = aiResponse.choices[0].message.parsed;

    if (!generatedTasks) throw new Error('No tasks generated');

    await prisma.task.create({
      data: {
        title: generatedTasks.title,
        description: generatedTasks.description,
        status: generatedTasks.status,
      },
    });

    revalidatePath('/tasks/generation');
  } catch (error) {
    throw error;
  }
});
