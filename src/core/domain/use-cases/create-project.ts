import { CreateProject } from '@/core/domain/repositories/project.repository';
import { TransactionManager } from '@/core/domain/repositories/transaction-manager.repository';
import { ProjectMemberService } from '@/core/domain/services/project-member.service';
import { ProjectService } from '@/core/domain/services/project.service';

export class CreateProjectUseCase {
  constructor(
    public readonly projectService: ProjectService,
    public readonly projectMemberService: ProjectMemberService,
    private readonly transactionManager: TransactionManager,
  ) {}

  async execute(project: CreateProject): Promise<void> {
    await this.transactionManager.execute(async tx => {
      const createdProject = await this.projectService.create(project, tx);
      await this.projectMemberService.assignOwnerMembership(createdProject.id, project.ownerId, tx);
    });
  }
}
