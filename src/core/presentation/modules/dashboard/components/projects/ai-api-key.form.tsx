'use client';

import { Project } from '@/core/domain/entities/project.entity';
import { Button } from '@/core/presentation/components/common/ui/button';
import { Form, FormDescription } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { maskApiKey } from '@/core/presentation/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, Loader, Trash } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { deleteAiApiKeyAction } from '../../actions/delete-ai-api-key.action';
import { updateAiApiKeyAction } from '../../actions/update-ai-api-key.action';
import { AiApiKeySchema } from './ai-api-key-schema';

type AddAiApiKeyProps = {
  project: Project;
};

export const AiApiKeyForm = ({ project }: AddAiApiKeyProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AiApiKeySchema>>({
    resolver: zodResolver(AiApiKeySchema),
    defaultValues: {
      aiApiKey: project.aiApiKey ? maskApiKey(project.aiApiKey) : '',
    },
  });

  function onSubmit(data: z.infer<typeof AiApiKeySchema>) {
    startTransition(async () => {
      project?.aiApiKey
        ? await deleteAiApiKeyAction({ id: project.id })
        : await updateAiApiKeyAction({ id: project.id, aiApiKey: data.aiApiKey });

      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-4">
            <InputForm
              control={form.control}
              name="aiApiKey"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              disabled={project.aiApiKey ? true : false}
              className="w-[300px]"
            />
            {project.aiApiKey ? (
              <Button type="submit" disabled={isPending} variant={'destructive'}>
                {isPending ? <Loader /> : <Trash className="h-4 w-4" />}
              </Button>
            ) : (
              <Button type="submit" disabled={isPending || project.aiApiKey ? true : false}>
                {isPending ? <Loader /> : <CheckIcon className="h-4 w-4" />}
              </Button>
            )}
          </div>
          <FormDescription>Enter your OpenAI API key to start using AI-powered features.</FormDescription>
        </div>
      </form>
    </Form>
  );
};
