import { createContainer } from '@evyweb/ioctopus';

import { createEncryptionModule } from './modules/encryption.module';
import { createLLMModule } from './modules/llm.module';
import { createMonitoringModule } from './modules/monitoring.module';
import { createProjectModule } from './modules/project.module';
import { createTransactionModule } from './modules/transaction.module';
import { createUserModule } from './modules/user.module';
import { createClerkWebhookModule } from './modules/webhooks/clerk/clerk-webhook.module';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

export const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('UserModule'), createUserModule());
ApplicationContainer.load(Symbol('ProjectModule'), createProjectModule());
ApplicationContainer.load(Symbol('MonitoringModule'), createMonitoringModule());
ApplicationContainer.load(Symbol('ClerkWebhookModule'), createClerkWebhookModule());
ApplicationContainer.load(Symbol('TransactionModule'), createTransactionModule());
ApplicationContainer.load(Symbol('EncryptionModule'), createEncryptionModule());
ApplicationContainer.load(Symbol('LLMModule'), createLLMModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
