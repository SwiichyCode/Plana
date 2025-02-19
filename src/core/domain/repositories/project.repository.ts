import { Project } from '@/core/domain/entities/project.entity';
import { TransactionContext } from '@/core/domain/repositories/transaction-manager.repository';

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  findByOwner(userId: string): Promise<Project[]>;
  create(project: CreateProject, tx?: TransactionContext): Promise<Project>;
  // update(project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
}

export type CreateProject = {
  title: string;
  description: string;
  ownerId: string;
};
