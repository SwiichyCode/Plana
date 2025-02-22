import { LLMRepository } from '@/core/domain/repositories/llm.repository';
import { Mistral } from '@mistralai/mistralai';

export class MistralProvider implements LLMRepository {
  private mistral: Mistral;

  constructor(public readonly apiKey: string) {
    this.mistral = new Mistral({ apiKey });
  }
  async validateApiKey(): Promise<boolean> {
    try {
      await this.mistral.models.list();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
