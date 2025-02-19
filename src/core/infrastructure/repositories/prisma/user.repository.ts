import { User } from '@/core/domain/entities/user.entity';
import { CreateUser, UserRepository } from '@/core/domain/repositories/user.repository';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { prisma } from '@/libs/prisma.config';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly crashReporterService: CrashReporterService) {}

  async create(user: CreateUser): Promise<User> {
    try {
      return await prisma.user.create({
        data: user,
      });
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }
}
