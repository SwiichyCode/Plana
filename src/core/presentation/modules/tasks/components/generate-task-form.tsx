'use client';

import { Button } from '@/core/presentation/components/common/ui/button';
import { Form } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { generateTaskAction } from '../actions/generate-task.action';
import { GenerateTaskSchema } from './generate-task-schema';

export const GenerateTaskForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof GenerateTaskSchema>>({
    resolver: zodResolver(GenerateTaskSchema),
    defaultValues: {
      prompt: '',
    },
  });

  function onSubmit(data: z.infer<typeof GenerateTaskSchema>) {
    startTransition(async () => {
      await generateTaskAction(data);

      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <InputForm control={form.control} name="prompt" label="Prompt" placeholder="Write a task description" />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  );
};
