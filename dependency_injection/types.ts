import { CrashReporterRepository } from '@/core/domain/repositories/monitoring.repository';
import { ProjectRepository } from '@/core/domain/repositories/project.repository';
import { UserRepository } from '@/core/domain/repositories/user.repository';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { ProjectService } from '@/core/domain/services/project.service';
import { UserService } from '@/core/domain/services/user.service';
import { ClerkWebhookHandler } from '@/core/infrastructure/adapters/webhooks/clerk/clerk-webhook-handler';
import { WebhookEventHandler } from '@/core/infrastructure/adapters/webhooks/clerk/clerk-webhook-handler.type';
import { UserCreatedEvent } from '@/core/infrastructure/adapters/webhooks/clerk/events/user-created.event';

export const DI_SYMBOLS = {
  // Services
  UserService: Symbol.for('UserService'),
  ProjectService: Symbol.for('ProjectService'),
  CrashReporterService: Symbol.for('CrashReporterService'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  ProjectRepository: Symbol.for('ProjectRepository'),
  CrashReporterRepository: Symbol.for('CrashReporterRepository'),

  // Webhooks
  ClerkWebhookHandler: Symbol.for('ClerkWebhookHandler'),
  WebhookEventHandler: Symbol.for('WebhookEventHandler'),
  UserCreatedEvent: Symbol.for('UserCreatedEvent'),
};

export interface DI_RETURN_TYPES {
  // Services
  UserService: UserService;
  ProjectService: ProjectService;
  CrashReporterService: CrashReporterService;

  // Repositories
  UserRepository: UserRepository;
  ProjectRepository: ProjectRepository;
  CrashReporterRepository: CrashReporterRepository;

  // Webhooks
  ClerkWebhookHandler: ClerkWebhookHandler;
  WebhookEventHandler: WebhookEventHandler;
  UserCreatedEvent: UserCreatedEvent;
}
