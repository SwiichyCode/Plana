import { DI_SYMBOLS } from '#di/types';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { SentryCrashReporterRepository } from '@/core/infrastructure/adapters/monitoring/sentry/sentry-crash-reporter';
import { createModule } from '@evyweb/ioctopus';

export function createMonitoringModule() {
  const monitoringModule = createModule();

  monitoringModule.bind(DI_SYMBOLS.CrashReporterRepository).toClass(SentryCrashReporterRepository);
  monitoringModule
    .bind(DI_SYMBOLS.CrashReporterService)
    .toClass(CrashReporterService, [DI_SYMBOLS.CrashReporterRepository]);

  return monitoringModule;
}
