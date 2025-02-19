import { Project } from '@/core/domain/entities/project.entity';
import { CreateProject, ProjectRepository } from '@/core/domain/repositories/project.repository';

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async findById(id: string): Promise<Project | null> {
    return await this.projectRepository.findById(id);
  }

  async findByOwner(userId: string): Promise<Project[]> {
    return await this.projectRepository.findByOwner(userId);
  }

  async create(project: CreateProject): Promise<Project> {
    return await this.projectRepository.create(project);
  }
}
