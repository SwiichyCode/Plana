import { DI_SYMBOLS } from '#di/types';
import { ProjectService } from '@/core/domain/services/project.service';
import { PrismaProjectRepository } from '@/core/infrastructure/repositories/prisma/project.repository';
import { createModule } from '@evyweb/ioctopus';

export function createProjectModule() {
  const projectModule = createModule();

  projectModule.bind(DI_SYMBOLS.ProjectRepository).toClass(PrismaProjectRepository, [DI_SYMBOLS.CrashReporterService]);
  projectModule.bind(DI_SYMBOLS.ProjectService).toClass(ProjectService, [DI_SYMBOLS.ProjectRepository]);

  return projectModule;
}
