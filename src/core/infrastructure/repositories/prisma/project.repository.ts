import { Project } from '@/core/domain/entities/project.entity';
import { ProjectRepository, UpdateProject } from '@/core/domain/repositories/project.repository';
import { TransactionContext } from '@/core/domain/repositories/transaction-manager.repository';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { EncryptionService } from '@/core/domain/services/encryption.service';
import { prisma } from '@/libs/prisma.config';
import { Prisma } from '@prisma/client';

export class PrismaProjectRepository implements ProjectRepository {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly crashReporterService: CrashReporterService,
  ) {}

  async findById(id: string): Promise<Project | null> {
    try {
      const project = await prisma.project.findUnique({ where: { id, deletedAt: null } });
      if (project?.llmApiKey) project.llmApiKey = await this.encryptionService.decrypt(project.llmApiKey);

      return project;
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }

  async findByOwner(userId: string): Promise<Project[]> {
    try {
      return await prisma.project.findMany({
        where: {
          ownerId: userId,
          deletedAt: null,
        },
      });
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }

  async create(project: Project, tx?: TransactionContext): Promise<Project> {
    try {
      const invoker = (tx as Prisma.TransactionClient) ?? prisma;

      return await invoker.project.create({ data: { ...project } });
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }

  async update(project: UpdateProject): Promise<Project> {
    try {
      return await prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          title: project.title,
          description: project.description,
          projectDescriptionContext: project.projectDescriptionContext,
          llmProvider: project.llmProvider,
          llmModel: project.llmModel,
          llmApiKey: project.llmApiKey ? await this.encryptionService.encrypt(project.llmApiKey) : null,
        },
      });
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }

  async updateDescriptionContext(id: string, projectDescriptionContext: string): Promise<Project> {
    try {
      return await prisma.project.update({
        where: {
          id: id,
        },
        data: {
          projectDescriptionContext: projectDescriptionContext,
        },
      });
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.project.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (err) {
      this.crashReporterService.report(err);
      throw err;
    }
  }
}
