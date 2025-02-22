import { LLMRepository } from '@/core/domain/repositories/llm.repository';
import { OpenAI } from 'openai';

export class OpenAIProvider implements LLMRepository {
  private openai: OpenAI;

  constructor(public readonly apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }
  async validateApiKey(): Promise<boolean> {
    try {
      await this.openai.models.list();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
