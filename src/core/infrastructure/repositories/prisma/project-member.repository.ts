import { ProjectMemberRepository } from '@/core/domain/repositories/project-member.repository';
import { TransactionContext } from '@/core/domain/repositories/transaction-manager.repository';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { prisma } from '@/libs/prisma.config';
import { Prisma } from '@prisma/client';

export class PrismaProjectMemberRepository implements ProjectMemberRepository {
  constructor(private readonly crashReporterService: CrashReporterService) {}

  async assignOwnerMembership(projectId: string, userId: string, tx?: TransactionContext): Promise<void> {
    try {
      await (tx
        ? (tx as Prisma.TransactionClient).projectMember.create({
            data: { projectId, userId, role: 'owner' },
          })
        : prisma.projectMember.create({
            data: { projectId, userId, role: 'owner' },
          }));
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }
}
