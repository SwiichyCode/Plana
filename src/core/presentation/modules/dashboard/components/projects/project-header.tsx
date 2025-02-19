import { Project } from '@/core/domain/entities/project.entity';

import { ProjectLogo } from './project-logo';

type ProjectHeaderProps = {
  project: Project;
};

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 py-8">
        <ProjectLogo name={project.title} />

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="truncate text-xs text-muted-foreground">{project.description}</p>
        </div>
      </div>
    </div>
  );
};
