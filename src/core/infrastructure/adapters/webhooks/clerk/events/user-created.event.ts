import { WebhookEvent } from '@clerk/nextjs/server';

import { WebhookEventHandler } from '../clerk-webhook-handler.type';

export class UserCreatedEvent implements WebhookEventHandler {
  supports(eventType: string): boolean {
    return eventType === ('user.created' as WebhookEvent['type']);
  }

  async handle(event: WebhookEvent): Promise<void> {
    console.log('User created event:', event);
  }
}
