import { CrashReporterRepository } from '@/core/domain/repositories/monitoring.repository';
import { ProjectMemberRepository } from '@/core/domain/repositories/project-member.repository';
import { ProjectRepository } from '@/core/domain/repositories/project.repository';
import { TransactionManager } from '@/core/domain/repositories/transaction-manager.repository';
import { UserRepository } from '@/core/domain/repositories/user.repository';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { ProjectMemberService } from '@/core/domain/services/project-member.service';
import { ProjectService } from '@/core/domain/services/project.service';
import { UserService } from '@/core/domain/services/user.service';
import { CreateProjectUseCase } from '@/core/domain/use-cases/create-project';
import { ClerkWebhookHandler } from '@/core/infrastructure/adapters/webhooks/clerk/clerk-webhook-handler';
import { WebhookEventHandler } from '@/core/infrastructure/adapters/webhooks/clerk/clerk-webhook-handler.type';
import { UserCreatedEvent } from '@/core/infrastructure/adapters/webhooks/clerk/events/user-created.event';

export const DI_SYMBOLS = {
  // Services
  UserService: Symbol.for('UserService'),
  ProjectService: Symbol.for('ProjectService'),
  ProjectMemberService: Symbol.for('ProjectMemberService'),
  CrashReporterService: Symbol.for('CrashReporterService'),
  TransactionManager: Symbol.for('TransactionManager'),

  // Use Cases
  CreateProjectUseCase: Symbol.for('CreateProjectUseCase'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  ProjectRepository: Symbol.for('ProjectRepository'),
  ProjectMemberRepository: Symbol.for('ProjectMemberRepository'),
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
  ProjectMemberService: ProjectMemberService;
  CrashReporterService: CrashReporterService;
  TransactionManager: TransactionManager;

  // Use Cases
  CreateProjectUseCase: CreateProjectUseCase;

  // Repositories
  UserRepository: UserRepository;
  ProjectRepository: ProjectRepository;
  ProjectMemberRepository: ProjectMemberRepository;
  CrashReporterRepository: CrashReporterRepository;

  // Webhooks
  ClerkWebhookHandler: ClerkWebhookHandler;
  WebhookEventHandler: WebhookEventHandler;
  UserCreatedEvent: UserCreatedEvent;
}
