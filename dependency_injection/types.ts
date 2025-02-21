import { EncryptionRepository } from '@/core/domain/repositories/encryption.repository';
import { InternalLLMRepository } from '@/core/domain/repositories/llm.repository';
import { CrashReporterRepository } from '@/core/domain/repositories/monitoring.repository';
import { ProjectMemberRepository } from '@/core/domain/repositories/project-member.repository';
import { ProjectRepository } from '@/core/domain/repositories/project.repository';
import { TransactionManager } from '@/core/domain/repositories/transaction-manager.repository';
import { UserRepository } from '@/core/domain/repositories/user.repository';
import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { EncryptionService } from '@/core/domain/services/encryption.service';
import { InternalLLMService } from '@/core/domain/services/internal-llm.service';
import { ProjectMemberService } from '@/core/domain/services/project-member.service';
import { ProjectService } from '@/core/domain/services/project.service';
import { UserService } from '@/core/domain/services/user.service';
import { CreateProjectUseCase } from '@/core/domain/use-cases/create-project';
import { UpdateProjectUseCase } from '@/core/domain/use-cases/update-project';
import { LLMProviderHandler } from '@/core/infrastructure/adapters/llm/llm-provider-handler';
import { ClerkWebhookHandler } from '@/core/infrastructure/adapters/webhooks/clerk/clerk-webhook-handler';
import { WebhookEventHandler } from '@/core/infrastructure/adapters/webhooks/clerk/clerk-webhook-handler.type';
import { UserCreatedEvent } from '@/core/infrastructure/adapters/webhooks/clerk/events/user-created.event';

export const DI_SYMBOLS = {
  // Services
  UserService: Symbol.for('UserService'),
  ProjectService: Symbol.for('ProjectService'),
  ProjectMemberService: Symbol.for('ProjectMemberService'),
  CrashReporterService: Symbol.for('CrashReporterService'),
  EncryptionService: Symbol.for('EncryptionService'),
  InternalLLMService: Symbol.for('InternalLLMService'),
  TransactionManager: Symbol.for('TransactionManager'),

  // Use Cases
  CreateProjectUseCase: Symbol.for('CreateProjectUseCase'),
  UpdateProjectUseCase: Symbol.for('UpdateProjectUseCase'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  ProjectRepository: Symbol.for('ProjectRepository'),
  ProjectMemberRepository: Symbol.for('ProjectMemberRepository'),
  CrashReporterRepository: Symbol.for('CrashReporterRepository'),
  TransactionRepository: Symbol.for('TransactionRepository'),
  EncryptionRepository: Symbol.for('EncryptionRepository'),
  InternalLLMRepository: Symbol.for('InternalLLMRepository'),

  // Webhooks
  ClerkWebhookHandler: Symbol.for('ClerkWebhookHandler'),
  WebhookEventHandler: Symbol.for('WebhookEventHandler'),
  LLMProviderHandler: Symbol.for('LLMProviderHandler'),
  UserCreatedEvent: Symbol.for('UserCreatedEvent'),
};

export interface DI_RETURN_TYPES {
  // Services
  UserService: UserService;
  ProjectService: ProjectService;
  ProjectMemberService: ProjectMemberService;
  CrashReporterService: CrashReporterService;
  EncryptionService: EncryptionService;
  InternalLLMService: InternalLLMService;
  TransactionManager: TransactionManager;

  // Use Cases
  CreateProjectUseCase: CreateProjectUseCase;
  UpdateProjectUseCase: UpdateProjectUseCase;

  // Repositories
  UserRepository: UserRepository;
  ProjectRepository: ProjectRepository;
  ProjectMemberRepository: ProjectMemberRepository;
  CrashReporterRepository: CrashReporterRepository;
  TransactionRepository: TransactionManager;
  EncryptionRepository: EncryptionRepository;
  InternalLLMRepository: InternalLLMRepository;

  // Webhooks
  ClerkWebhookHandler: ClerkWebhookHandler;
  WebhookEventHandler: WebhookEventHandler;
  LLMProviderHandler: LLMProviderHandler;
  UserCreatedEvent: UserCreatedEvent;
}
