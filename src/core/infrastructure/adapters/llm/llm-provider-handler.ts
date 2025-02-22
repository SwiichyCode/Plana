import { LLMRepository } from '@/core/domain/repositories/llm.repository';

import { MistralProvider } from './mistral-provider';
import { OpenAIProvider } from './openai-provider';

export type SupportedLLMProvider = 'mistral' | 'openai';

export class LLMProviderHandler {
  private providers: Map<SupportedLLMProvider, LLMRepository>;

  constructor(apiKeys: { [key in SupportedLLMProvider]?: string }) {
    this.providers = new Map<SupportedLLMProvider, LLMRepository>([
      ['mistral', new MistralProvider(apiKeys.mistral || '')],
      ['openai', new OpenAIProvider(apiKeys.openai || '')],
    ]);
  }

  getProvider(providerName: SupportedLLMProvider): LLMRepository {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Provider ${providerName} not supported`);
    }
    return provider;
  }

  async validateApiKey(provider: SupportedLLMProvider, apiKey: string): Promise<boolean> {
    const llmProvider = this.getProvider(provider);
    return await llmProvider.validateApiKey(apiKey);
  }

  getSupportedProviders(): SupportedLLMProvider[] {
    return Array.from(this.providers.keys());
  }
}
