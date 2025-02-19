'use client';

import { Button } from '@/core/presentation/components/common/ui/button';
import { Form } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { compareStrings } from '@/core/presentation/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { deleteProjectAction } from '../../actions/delete-project-action';

type ProjectDeleteFormProps = {
  projectId: string;
  projectTitle: string;
};

const DeleteProjectSchema = z.object({
  projectTitle: z.string(),
});

export const DeleteProjectForm = ({ projectId, projectTitle }: ProjectDeleteFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DeleteProjectSchema>>({
    resolver: zodResolver(DeleteProjectSchema),
    defaultValues: {
      projectTitle: '',
    },
  });

  const projectTitleInput = useWatch({
    control: form.control,
    name: 'projectTitle',
  });

  function onSubmit(data: z.infer<typeof DeleteProjectSchema>) {
    startTransition(async () => {
      await deleteProjectAction({ projectId });

      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <InputForm control={form.control} name="projectTitle" />
        <Button type="submit" disabled={!compareStrings(projectTitleInput, projectTitle)} className="w-full">
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </form>
    </Form>
  );
};
