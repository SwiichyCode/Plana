import { Project } from '@/core/domain/entities/project.entity';
import { CreateProject, ProjectRepository, UpdateProject } from '@/core/domain/repositories/project.repository';

import { TransactionContext } from '../repositories/transaction-manager.repository';

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async findById(id: string): Promise<Project | null> {
    return await this.projectRepository.findById(id);
  }

  async findByOwner(userId: string): Promise<Project[]> {
    return await this.projectRepository.findByOwner(userId);
  }

  async create(project: CreateProject, tx?: TransactionContext): Promise<Project> {
    return await this.projectRepository.create(project, tx);
  }

  async update(project: UpdateProject): Promise<Project> {
    return await this.projectRepository.update(project);
  }

  async delete(id: string): Promise<void> {
    return await this.projectRepository.delete(id);
  }
}
