import { LLMRepository } from '@/core/domain/repositories/llm.repository';
import { Mistral } from '@mistralai/mistralai';

export class MistralProvider implements LLMRepository {
  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const mistral = new Mistral({ apiKey });
      await mistral.models.list();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
