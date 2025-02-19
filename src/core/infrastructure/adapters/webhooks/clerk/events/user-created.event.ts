import { CrashReporterService } from '@/core/domain/services/crash-reporter.service';
import { UserService } from '@/core/domain/services/user.service';
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server';

import { WebhookEventHandler } from '../clerk-webhook-handler.type';

export class UserCreatedEvent implements WebhookEventHandler {
  constructor(
    private readonly userService: UserService,
    private readonly crashReporterService: CrashReporterService,
  ) {}

  supports(eventType: WebhookEvent['type']): boolean {
    return eventType === 'user.created';
  }

  async handle(event: WebhookEvent & { data: UserJSON }): Promise<void> {
    try {
      await this.userService.create({
        clerkUserId: event.data.id,
        first_name: event.data.first_name,
        last_name: event.data.last_name,
        email: event.data.email_addresses[0].email_address,
      });
    } catch (error) {
      this.crashReporterService.report(error);
      throw error;
    }
  }
}
