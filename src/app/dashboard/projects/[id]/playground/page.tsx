import { ChatBotForm } from '@/core/presentation/modules/dashboard/components/projects/playground/chat-bot-form';
import { ChatBotWindow } from '@/core/presentation/modules/dashboard/components/projects/playground/chat-bot-window';

export default async function ProjectPlaygroundPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return (
    <div className="flex h-screen flex-col items-center justify-center px-24">
      <ChatBotWindow />
      <ChatBotForm />
    </div>
  );
}
