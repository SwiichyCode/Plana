// import { getInjection } from '#di/container';
// import { ChatBotForm } from '@/core/presentation/modules/dashboard/components/projects/playground/chat-bot-form';
// import { ChatBotWindow } from '@/core/presentation/modules/dashboard/components/projects/playground/chat-bot-window';

// export default async function ProjectPlaygroundPage({ params }: { params: Promise<{ id: string }> }) {
//   const id = (await params).id;
//   const project = await getInjection('ProjectService').findById(id);

//   if (!project) return <div>Project not found</div>;

//   console.log(project.llmContext);

//   return (
//     <div className="flex h-screen flex-col items-center justify-center gap-8 px-24">
//       <ChatBotWindow llmContext={project.llmContext} />
//       <ChatBotForm id={project.id} />
//     </div>
//   );
// }

'use client';

import { useChat } from '@ai-sdk/react';

// import { getInjection } from '#di/container';
// import { ChatBotForm } from '@/core/presentation/modules/dashboard/components/projects/playground/chat-bot-form';
// import { ChatBotWindow } from '@/core/presentation/modules/dashboard/components/projects/playground/chat-bot-window';

// export default async function ProjectPlaygroundPage({ params }: { params: Promise<{ id: string }> }) {
//   const id = (await params).id;
//   const project = await getInjection('ProjectService').findById(id);

//   if (!project) return <div>Project not found</div>;

//   console.log(project.llmContext);

//   return (
//     <div className="flex h-screen flex-col items-center justify-center gap-8 px-24">
//       <ChatBotWindow llmContext={project.llmContext} />
//       <ChatBotForm id={project.id} />
//     </div>
//   );
// }

// import { getInjection } from '#di/container';
// import { ChatBotForm } from '@/core/presentation/modules/dashboard/components/projects/playground/chat-bot-form';
// import { ChatBotWindow } from '@/core/presentation/modules/dashboard/components/projects/playground/chat-bot-window';

// export default async function ProjectPlaygroundPage({ params }: { params: Promise<{ id: string }> }) {
//   const id = (await params).id;
//   const project = await getInjection('ProjectService').findById(id);

//   if (!project) return <div>Project not found</div>;

//   console.log(project.llmContext);

//   return (
//     <div className="flex h-screen flex-col items-center justify-center gap-8 px-24">
//       <ChatBotWindow llmContext={project.llmContext} />
//       <ChatBotForm id={project.id} />
//     </div>
//   );
// }

export default function ProjectPlaygroundPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-zinc-300 p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
