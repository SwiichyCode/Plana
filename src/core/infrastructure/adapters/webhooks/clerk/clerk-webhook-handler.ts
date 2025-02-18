import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { WebhookEventHandler } from '@/core/infrastructure/adapters/webhooks/clerk/clerk-webhook-handler.type';
import { WebhookEvent } from '@clerk/nextjs/server';

export class ClerkWebhookHandler {
  constructor(
    private readonly eventHandlers: WebhookEventHandler[],
    private readonly crashReporterService: CrashReporterService,
  ) {}

  async handleWebhookEvent(event: WebhookEvent): Promise<void> {
    const handler = this.eventHandlers.find(h => h.supports(event.type));

    if (!handler) {
      this.crashReporterService.report(new Error(`No handler found for event type ${event.type}`));
      return;
    }

    await handler.handle(event);
  }
}
