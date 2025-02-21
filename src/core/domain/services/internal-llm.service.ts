import { InternalLLMRepository } from '@/core/domain/repositories/llm.repository';

export class InternalLLMService {
  constructor(private readonly internalLLMRepository: InternalLLMRepository) {}

  async findModels(): Promise<string[]> {
    return await this.internalLLMRepository.findModels();
  }
}
