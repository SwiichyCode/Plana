import { LLMRepository } from '@/core/domain/repositories/llm.repository';
import { SupportedLLMProvider } from '@/core/infrastructure/adapters/llm/llm-provider-handler';

export interface LLMProviderFactory {
  createProvider(provider: SupportedLLMProvider, apiKey: string): LLMRepository;
}
