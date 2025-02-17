import { TaskCard } from '@/core/presentation/modules/tasks/components/task-card';
import { Task } from '@prisma/client';

type TaskViewProps = {
  tasks: Task[];
};

export const TaskView = ({ tasks }: TaskViewProps) => {
  if (!tasks.length) {
    return <p className="text-center text-sm">No tasks found.</p>;
  }

  return (
    <div className="flex w-full flex-wrap gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} status={task.status} />
      ))}
    </div>
  );
};
