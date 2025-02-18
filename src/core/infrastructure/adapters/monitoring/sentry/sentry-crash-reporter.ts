import { CrashReporterRepository } from '@/core/domain/repositories/monitoring.repository';
import * as Sentry from '@sentry/nextjs';

export class SentryCrashReporterRepository implements CrashReporterRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report(error: any, context?: Record<string, any>) {
    Sentry.captureException(error, {
      extra: context,
    });
  }
}
