import { LLMRepository } from '@/core/domain/repositories/llm.repository';
import { SupportedLLMProvider } from '@/core/infrastructure/adapters/llm/llm-provider-handler';
import { MistralProvider } from '@/core/infrastructure/adapters/llm/mistral-provider';
import { OpenAIProvider } from '@/core/infrastructure/adapters/llm/openai-provider';
import { LLMProviderFactory } from '@/core/infrastructure/adapters/llm/refactoring/llm-provider.factory';

export class ConcreteLLMProviderFactory implements LLMProviderFactory {
  createProvider(provider: SupportedLLMProvider, apiKey: string): LLMRepository {
    switch (provider) {
      case 'mistral':
        return new MistralProvider(apiKey);
      case 'openai':
        return new OpenAIProvider(apiKey);
      default:
        throw new Error(`Provider ${provider} not supported`);
    }
  }
}
