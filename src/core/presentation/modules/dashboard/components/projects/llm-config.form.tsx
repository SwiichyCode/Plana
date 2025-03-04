'use client';

import { Project } from '@/core/domain/entities/project.entity';
import { Button } from '@/core/presentation/components/common/ui/button';
import { Form, FormDescription, FormMessage } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { LLMProviderCombobox } from '@/core/presentation/modules/dashboard/components/projects/llm-provider-combobox';
import { maskApiKey } from '@/core/presentation/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, Loader, Trash } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { deleteLLMConfigAction } from '../../actions/delete-llm-config.action';
import { updateLLMConfigAction } from '../../actions/update-llm-config.action';
import { LLMConfigSchema } from './llm-config-schema';
import { LLMModelCombobox } from './llm-model-provider-combobox';

type AddAiApiKeyProps = {
  project: Project;
};

export const LLMConfigForm = ({ project }: AddAiApiKeyProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<z.infer<typeof LLMConfigSchema>>({
    resolver: zodResolver(LLMConfigSchema),
    defaultValues: {
      llmProvider: project.llmProvider ? project.llmProvider : 'openai',
      llmModel: project.llmModel ? project.llmModel : 'gpt-4o-2024-08-06',
      llmApiKey: project.llmApiKey ? maskApiKey(project.llmApiKey) : '',
    },
  });

  function onSubmit(data: z.infer<typeof LLMConfigSchema>) {
    startTransition(async () => {
      if (project?.llmApiKey) {
        await deleteLLMConfigAction({ id: project.id });
      } else {
        const response = await updateLLMConfigAction({
          id: project.id,
          llmProvider: data.llmProvider,
          llmModel: data.llmModel,
          llmApiKey: data.llmApiKey,
        });

        if (response?.serverError) {
          setErrorMessage(response.serverError);
        }
      }
      form.reset();
    });
  }

  const llmProvider = useWatch({ name: 'llmProvider', control: form.control });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <h2 className="mb-6 text-2xl font-bold">LLM Configuration</h2>
        <div className="flex gap-16">
          <div className="w-[50%]">
            <LLMProviderCombobox
              form={form}
              control={form.control}
              name="llmProvider"
              disabled={project.llmApiKey ? true : false}
            />
          </div>

          <div className="w-[50%]">
            <LLMModelCombobox
              form={form}
              control={form.control}
              name="llmModel"
              disabled={project.llmApiKey ? true : false}
              provider={llmProvider}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-4">
            <InputForm
              control={form.control}
              name="llmApiKey"
              label="API Key"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              disabled={project.llmApiKey ? true : false}
              className="w-full [&_label]:font-semibold"
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
          {errorMessage && <FormMessage className="text-red-500">{errorMessage}</FormMessage>}
          <FormDescription>Enter your OpenAI API key to start using AI-powered features.</FormDescription>
        </div>
      </form>
    </Form>
  );
};
