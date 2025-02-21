import { getInjection } from '#di/container';
import { DeleteProjectPopover } from '@/core/presentation/modules/dashboard/components/projects/delete-project-popover';
import { LLMConfigForm } from '@/core/presentation/modules/dashboard/components/projects/llm-config.form';
import { ProjectDescriptionContextForm } from '@/core/presentation/modules/dashboard/components/projects/project-description-context-form';
import { ProjectHeader } from '@/core/presentation/modules/dashboard/components/projects/project-header';

export default async function ProjectSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const project = await getInjection('ProjectService').findById(id);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="mx-auto max-w-3xl">
      <ProjectHeader project={project} />

      <div className="space-y-8">
        <LLMConfigForm project={project} />
        <ProjectDescriptionContextForm project={project} />
        <DeleteProjectPopover projectId={project.id} projectTitle={project.title} />
      </div>
    </div>
  );
}
