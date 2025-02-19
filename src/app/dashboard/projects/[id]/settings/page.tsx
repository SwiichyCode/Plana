import { getInjection } from '#di/container';
import { ProjectHeader } from '@/core/presentation/modules/dashboard/components/projects/project-header';

export default async function ProjectSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const project = await getInjection('ProjectService').findById(id);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="mx-auto max-w-3xl">
      <ProjectHeader project={project} />
    </div>
  );
}
