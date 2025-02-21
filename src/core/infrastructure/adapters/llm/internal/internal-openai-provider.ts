import { InternalLLMRepository } from '@/core/domain/repositories/llm.repository';
import { openai } from '@/libs/openai.config';

export class InternalOpenAIProvider implements InternalLLMRepository {
  async findModels(): Promise<string[]> {
    try {
      const models = await openai.models.list();
      return models.data.map(model => model.id);
    } catch (error) {
      throw error;
    }
  }
}
