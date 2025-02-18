import { Project } from '@/core/domain/entities/project.entity';
import { ProjectRepository } from '@/core/domain/repositories/project.repository';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { prisma } from '@/libs/prisma.config';

export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly crashReporterService: CrashReporterService) {}

  async findByOwner(userId: string): Promise<Project[]> {
    try {
      return await prisma.project.findMany({
        where: {
          ownerId: userId,
        },
      });
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }

  async create(project: Project): Promise<Project> {
    try {
      return await prisma.project.create({
        data: project,
      });
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }
}
