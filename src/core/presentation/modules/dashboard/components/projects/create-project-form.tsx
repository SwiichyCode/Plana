'use client';

import { Button } from '@/core/presentation/components/common/ui/button';
import { Form } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { TextAreaForm } from '@/core/presentation/components/common/ui/textarea-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createProjectAction } from '../../actions/create-project.action';
import { CreateProjectSchema } from './create-project-schema';

export const CreateProjectForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(data: z.infer<typeof CreateProjectSchema>) {
    startTransition(async () => {
      await createProjectAction(data);

      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <InputForm control={form.control} name="title" label="Title" placeholder="Write project title" />
        <TextAreaForm
          control={form.control}
          name="description"
          label="Description"
          placeholder="Write project description"
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  );
};
