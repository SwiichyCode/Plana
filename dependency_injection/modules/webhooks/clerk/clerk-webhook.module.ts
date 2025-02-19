import { ApplicationContainer } from '#di/container';
import { DI_SYMBOLS } from '#di/types';
import { ClerkWebhookHandler } from '@/core/infrastructure/adapters/webhooks/clerk/clerk-webhook-handler';
import { UserCreatedEvent } from '@/core/infrastructure/adapters/webhooks/clerk/events/user-created.event';
import { createModule } from '@evyweb/ioctopus';

export function createClerkWebhookModule() {
  const clerkWebhookModule = createModule();

  clerkWebhookModule
    .bind(DI_SYMBOLS.UserCreatedEvent)
    .toClass(UserCreatedEvent, [DI_SYMBOLS.UserService, DI_SYMBOLS.CrashReporterService]);

  clerkWebhookModule.bind(DI_SYMBOLS.WebhookEventHandler).toFactory(() => {
    return [ApplicationContainer.get(DI_SYMBOLS.UserCreatedEvent)];
  });

  clerkWebhookModule
    .bind(DI_SYMBOLS.ClerkWebhookHandler)
    .toClass(ClerkWebhookHandler, [DI_SYMBOLS.WebhookEventHandler, DI_SYMBOLS.CrashReporterService]);

  return clerkWebhookModule;
}
