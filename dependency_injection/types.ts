import { CrashReporterRepository } from '@/core/domain/repositories/monitoring.repository';
import { ProjectRepository } from '@/core/domain/repositories/project.repository';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { ProjectService } from '@/core/domain/services/project.service';

export const DI_SYMBOLS = {
  // Services
  ProjectService: Symbol.for('ProjectService'),
  CrashReporterService: Symbol.for('CrashReporterService'),

  // Repositories
  ProjectRepository: Symbol.for('ProjectRepository'),
  CrashReporterRepository: Symbol.for('CrashReporterRepository'),
};

export interface DI_RETURN_TYPES {
  // Services
  ProjectService: ProjectService;
  CrashReporterService: CrashReporterService;

  // Repositories
  ProjectRepository: ProjectRepository;
  CrashReporterRepository: CrashReporterRepository;
}
