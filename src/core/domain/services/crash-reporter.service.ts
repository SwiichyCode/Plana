import { CrashReporterRepository } from '@/core/domain/repositories/monitoring.repository';

export class CrashReporterService {
  constructor(private readonly crashReporterRepository: CrashReporterRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report(error: any, context?: Record<string, any>) {
    this.crashReporterRepository.report(error, context);
  }
}
