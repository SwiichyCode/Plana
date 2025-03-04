'use client';

import { Project } from '@/core/domain/entities/project.entity';
import { Button } from '@/core/presentation/components/common/ui/button';
import { Form, FormDescription, FormMessage } from '@/core/presentation/components/common/ui/form';
import { TextAreaForm } from '@/core/presentation/components/common/ui/textarea-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateProjectDescriptionContextAction } from '../../actions/update-project-description-context.action';
import { ProjectDescriptionContextSchema } from './project-description-context-schema';

type ProjectDescriptionContextFormProps = {
  project: Project;
};

export const ProjectDescriptionContextForm = ({ project }: ProjectDescriptionContextFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<z.infer<typeof ProjectDescriptionContextSchema>>({
    resolver: zodResolver(ProjectDescriptionContextSchema),
    defaultValues: {
      projectDescriptionContext: project.projectDescriptionContext ? project.projectDescriptionContext : '',
    },
  });

  function onSubmit(data: z.infer<typeof ProjectDescriptionContextSchema>) {
    startTransition(async () => {
      const response = await updateProjectDescriptionContextAction({
        id: project.id,
        projectDescriptionContext: data.projectDescriptionContext,
      });

      if (response?.serverError) {
        setErrorMessage(response.serverError);
      }

      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <h2 className="mb-6 text-2xl font-bold">Project context Configuration</h2>
        <TextAreaForm
          control={form.control}
          label="Project context"
          name="projectDescriptionContext"
          placeholder="Describe your project in detail (goals, features, technical stack, constraints, etc.)"
          className="[&_label]:font-semibold"
        />
        <FormDescription>
          This description is crucial for providing context about your project. The more detailed it is, the better your
          project will be understood in future interactions. Include objectives, key features, and any relevant
          information.
        </FormDescription>

        {errorMessage && <FormMessage className="text-red-500">{errorMessage}</FormMessage>}

        <Button type="submit" disabled={isPending}>
          {isPending ? <span className="opacity-50">Saving...</span> : 'Save your context'}
        </Button>
      </form>
    </Form>
  );
};
