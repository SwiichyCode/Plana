'use client';

import { Button } from '@/core/presentation/components/common/ui/button';
import { Form } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ChatBotSchema } from './chat-bot-schema';

export const ChatBotForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<z.infer<typeof ChatBotSchema>>({
    resolver: zodResolver(ChatBotSchema),
    defaultValues: {
      content: '',
    },
  });

  function onSubmit(data: z.infer<typeof ChatBotSchema>) {
    startTransition(async () => {
      // Send the data to the server
      console.log(data);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <InputForm control={form.control} name="content" placeholder="Write your message here..." />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white" />
              <span>Sending...</span>
            </div>
          ) : (
            <span>Send</span>
          )}
        </Button>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </form>
    </Form>
  );
};
