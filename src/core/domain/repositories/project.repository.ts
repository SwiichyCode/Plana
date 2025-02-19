import { Project } from '@/core/domain/entities/project.entity';

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  findByOwner(userId: string): Promise<Project[]>;
  create(project: CreateProject): Promise<Project>;
  // update(project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
}

export type CreateProject = {
  title: string;
  description: string;
  ownerId: string;
};
