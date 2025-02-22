import { LLMRepository } from '@/core/domain/repositories/llm.repository';

import { LLMProviderFactory } from './llm-provider.factory';

export type SupportedLLMProvider = 'mistral' | 'openai';

export class LLMProviderHandler {
  private providers: Map<SupportedLLMProvider, LLMRepository>;

  constructor(
    private providerFactory: LLMProviderFactory,
    apiKeys: { [key in SupportedLLMProvider]?: string },
  ) {
    this.providers = new Map<SupportedLLMProvider, LLMRepository>();

    Object.entries(apiKeys).forEach(([provider, apiKey]) => {
      if (apiKey) {
        this.providers.set(
          provider as SupportedLLMProvider,
          this.providerFactory.createProvider(provider as SupportedLLMProvider, apiKey),
        );
      }
    });
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
