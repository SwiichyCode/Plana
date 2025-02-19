import { TransactionContext } from '@/core/domain/repositories/transaction-manager.repository';

export interface ProjectMemberRepository {
  assignOwnerMembership(projectId: string, userId: string, tx?: TransactionContext): Promise<void>;
}
