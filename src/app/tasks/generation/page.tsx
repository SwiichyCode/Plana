import { GenerateTaskForm } from '@/core/presentation/modules/tasks/components/generate-task-form';
import { TaskView } from '@/core/presentation/modules/tasks/components/task-view';
import { prisma } from '@/libs/prisma.config';

export default async function TasksGeneration() {
  const tasks = await prisma.task.findMany();

  return (
    <div className="m-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">Tasks Generation</h1>
        <p className="text-center text-lg">Generate tasks based on the given prompt.</p>

        <TaskView tasks={tasks} />
        <GenerateTaskForm />
      </main>
    </div>
  );
}
