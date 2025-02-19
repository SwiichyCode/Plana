import { createContainer } from '@evyweb/ioctopus';

import { createMonitoringModule } from './modules/monitoring.module';
import { createProjectModule } from './modules/project.module';
import { createUserModule } from './modules/user.module';
import { createClerkWebhookModule } from './modules/webhooks/clerk/clerk-webhook.module';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

export const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('UserModule'), createUserModule());
ApplicationContainer.load(Symbol('ProjectModule'), createProjectModule());
ApplicationContainer.load(Symbol('MonitoringModule'), createMonitoringModule());
ApplicationContainer.load(Symbol('ClerkWebhookModule'), createClerkWebhookModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
