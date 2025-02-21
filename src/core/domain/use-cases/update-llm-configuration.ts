import { ProjectService } from '@/core/domain/services/project.service';
import { LLMProviderHandler, SupportedLLMProvider } from '@/core/infrastructure/adapters/llm/llm-provider-handler';

import { UpdateProject } from '../repositories/project.repository';

export class UpdateLLMConfigurationUseCase {
  constructor(
    public readonly projectService: ProjectService,
    public readonly llmProviderHandler: LLMProviderHandler,
  ) {}

  async execute(project: UpdateProject): Promise<void> {
    const isValidApiKey = await this.llmProviderHandler.validateApiKey(
      project.llmProvider as SupportedLLMProvider,
      project.llmApiKey!,
    );

    if (!isValidApiKey) throw new Error('Invalid API key');

    await this.projectService.update({
      id: project.id,
      llmProvider: project.llmProvider,
      llmModel: project.llmModel,
      llmApiKey: project.llmApiKey,
    });
  }
}
