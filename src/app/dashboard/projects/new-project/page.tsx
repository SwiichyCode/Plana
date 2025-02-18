import { CreateProjectForm } from '@/core/presentation/modules/dashboard/components/projects/create-project-form';

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create a New Project</h1>
        <p className="text-muted-foreground">
          Launch your new project in a few simple steps. Define your goals and plan your success.
        </p>
      </div>

      <CreateProjectForm />
    </div>
  );
}
