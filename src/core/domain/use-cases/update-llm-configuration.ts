import { ProjectService } from '@/core/domain/services/project.service';
import {
  LLMProviderHandler,
  SupportedLLMProvider,
} from '@/core/infrastructure/adapters/llm/refactoring/llm-provider-handler';
import { LLMProviderFactory } from '@/core/infrastructure/adapters/llm/refactoring/llm-provider.factory';

import { UpdateProject } from '../repositories/project.repository';

export class UpdateLLMConfigurationUseCase {
  constructor(
    public readonly projectService: ProjectService,
    private readonly providerFactory: LLMProviderFactory,
  ) {}

  async execute(project: UpdateProject): Promise<void> {
    const handler = new LLMProviderHandler(this.providerFactory, {
      [project.llmProvider as SupportedLLMProvider]: project.llmApiKey,
    });

    const isValidApiKey = await handler.validateApiKey(project.llmProvider as SupportedLLMProvider, project.llmApiKey!);

    if (!isValidApiKey) throw new Error('Invalid API key');

    await this.projectService.update({
      id: project.id,
      llmProvider: project.llmProvider,
      llmModel: project.llmModel,
      llmApiKey: project.llmApiKey,
    });
  }
}
