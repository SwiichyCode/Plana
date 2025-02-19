import { WebhookEvent } from '@clerk/nextjs/server';

export interface WebhookEventHandler {
  handle(event: WebhookEvent): Promise<void>;
  supports(eventType: WebhookEvent['type']): boolean;
}
