import { ProjectService } from '@/core/domain/services/project.service';
import { LLMProviderHandler, SupportedLLMProvider } from '@/core/infrastructure/adapters/llm/llm-provider-handler';

export class UpdateProjectUseCase {
  constructor(
    public readonly projectService: ProjectService,
    public readonly llmProviderHandler: LLMProviderHandler,
  ) {}

  async execute(
    projectId: string,
    llmProvider: SupportedLLMProvider,
    llmModel: string,
    llmApiKey: string,
  ): Promise<void> {
    const isValidApiKey = await this.llmProviderHandler.validateApiKey(llmProvider, llmApiKey);

    if (!isValidApiKey) throw new Error('Invalid API key');

    await this.projectService.update({
      id: projectId,
      llmProvider: llmProvider,
      llmApiKey: llmApiKey,
    });
  }
}
