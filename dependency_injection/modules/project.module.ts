import { DI_SYMBOLS } from '#di/types';
import { ProjectMemberService } from '@/core/domain/services/project-member.service';
import { ProjectService } from '@/core/domain/services/project.service';
import { CreateProjectUseCase } from '@/core/domain/use-cases/create-project';
import { PrismaProjectMemberRepository } from '@/core/infrastructure/repositories/prisma/project-member.repository';
import { PrismaProjectRepository } from '@/core/infrastructure/repositories/prisma/project.repository';
import { createModule } from '@evyweb/ioctopus';

export function createProjectModule() {
  const projectModule = createModule();

  projectModule.bind(DI_SYMBOLS.ProjectMemberRepository).toClass(PrismaProjectMemberRepository);

  projectModule.bind(DI_SYMBOLS.ProjectRepository).toClass(PrismaProjectRepository, [DI_SYMBOLS.CrashReporterService]);
  projectModule.bind(DI_SYMBOLS.ProjectService).toClass(ProjectService, [DI_SYMBOLS.ProjectRepository]);
  projectModule
    .bind(DI_SYMBOLS.ProjectMemberService)
    .toClass(ProjectMemberService, [DI_SYMBOLS.ProjectMemberRepository]);

  projectModule
    .bind(DI_SYMBOLS.CreateProjectUseCase)
    .toClass(CreateProjectUseCase, [
      DI_SYMBOLS.ProjectService,
      DI_SYMBOLS.ProjectMemberService,
      DI_SYMBOLS.TransactionManager,
    ]);

  return projectModule;
}
