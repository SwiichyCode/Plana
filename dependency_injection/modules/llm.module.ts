import { DI_SYMBOLS } from '#di/types';
import { InternalLLMService } from '@/core/domain/services/internal-llm.service';
import { InternalOpenAIProvider } from '@/core/infrastructure/adapters/llm/internal/internal-openai-provider';
import { LLMProviderHandler } from '@/core/infrastructure/adapters/llm/llm-provider-handler';
import { createModule } from '@evyweb/ioctopus';

export function createLLMModule() {
  const llmModule = createModule();

  llmModule.bind(DI_SYMBOLS.InternalLLMRepository).toClass(InternalOpenAIProvider);
  llmModule.bind(DI_SYMBOLS.InternalLLMService).toClass(InternalLLMService, [DI_SYMBOLS.InternalLLMRepository]);

  // llmModule.bind(DI_SYMBOLS.LLMProviderHandler).toClass(LLMProviderHandler);

  return llmModule;
}
