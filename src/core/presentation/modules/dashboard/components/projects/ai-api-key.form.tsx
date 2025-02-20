'use client';

import { Project } from '@/core/domain/entities/project.entity';
import { Button } from '@/core/presentation/components/common/ui/button';
import { Form, FormDescription } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, Loader } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
      aiApiKey: project.aiApiKey ? project.aiApiKey : '',
    },
  });

  function onSubmit(data: z.infer<typeof AiApiKeySchema>) {
    startTransition(async () => {
      await updateAiApiKeyAction({
        id: project.id,
        aiApiKey: data.aiApiKey,
      });
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
              className="w-[300px]"
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader /> : <CheckIcon className="h-4 w-4" />}
            </Button>
          </div>
          <FormDescription>Enter your OpenAI API key to start using AI-powered features.</FormDescription>
        </div>
      </form>
    </Form>
  );
};
