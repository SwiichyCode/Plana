import { LLMRepository } from '@/core/domain/repositories/llm.repository';
import { OpenAI } from 'openai';

export class OpenAIProvider implements LLMRepository {
  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const openai = new OpenAI({ apiKey });
      await openai.models.list();
      return true;
    } catch (error) {
      return false;
    }
  }
}
