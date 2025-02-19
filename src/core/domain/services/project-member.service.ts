import { ProjectMemberRepository } from '@/core/domain/repositories/project-member.repository';
import { TransactionContext } from '@/core/domain/repositories/transaction-manager.repository';

export class ProjectMemberService {
  constructor(private readonly projectMemberRepository: ProjectMemberRepository) {}

  async assignOwnerMembership(projectId: string, userId: string, tx?: TransactionContext): Promise<void> {
    return this.projectMemberRepository.assignOwnerMembership(projectId, userId, tx);
  }
}
