'use client';

import { Project } from '@/core/domain/entities/project.entity';
import { Button } from '@/core/presentation/components/common/ui/button';
import { Form, FormDescription } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { LLMProviderCombobox } from '@/core/presentation/modules/dashboard/components/projects/llm-provider-combobox';
import { maskApiKey } from '@/core/presentation/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, Loader, Trash } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { deleteAiApiKeyAction } from '../../actions/delete-ai-api-key.action';
import { updateAiApiKeyAction } from '../../actions/update-ai-api-key.action';
import { LLMSetupSchema } from './llm-setup-schema';

type AddAiApiKeyProps = {
  project: Project;
};

export const LLMSetupForm = ({ project }: AddAiApiKeyProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LLMSetupSchema>>({
    resolver: zodResolver(LLMSetupSchema),
    defaultValues: {
      llmProvider: project.llmProvider ? project.llmProvider : 'mistral',
      llmApiKey: project.llmApiKey ? maskApiKey(project.llmApiKey) : '',
    },
  });

  function onSubmit(data: z.infer<typeof LLMSetupSchema>) {
    startTransition(async () => {
      project?.llmApiKey
        ? await deleteAiApiKeyAction({ id: project.id })
        : await updateAiApiKeyAction({ id: project.id, llmProvider: data.llmProvider, llmApiKey: data.llmApiKey });
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <LLMProviderCombobox
          form={form}
          control={form.control}
          name="llmProvider"
          disabled={project.llmApiKey ? true : false}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-4">
            <InputForm
              control={form.control}
              name="llmApiKey"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              disabled={project.llmApiKey ? true : false}
              className="w-[300px]"
            />
            {project.llmApiKey ? (
              <Button type="submit" disabled={isPending} variant={'destructive'}>
                {isPending ? <Loader /> : <Trash className="h-4 w-4" />}
              </Button>
            ) : (
              <Button type="submit" disabled={isPending || project.llmApiKey ? true : false}>
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
