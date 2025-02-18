export interface CrashReporterRepository {
  report(error: any, context?: Record<string, any>): void; // eslint-disable-line @typescript-eslint/no-explicit-any
}
