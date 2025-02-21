import { DI_SYMBOLS } from '#di/types';
import { LLMProviderHandler } from '@/core/infrastructure/adapters/llm/llm-provider-handler';
import { createModule } from '@evyweb/ioctopus';

export function createLLMModule() {
  const llmModule = createModule();

  llmModule.bind(DI_SYMBOLS.LLMProviderHandler).toClass(LLMProviderHandler);

  return llmModule;
}
