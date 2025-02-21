export interface LLMRepository {
  validateApiKey(apiKey: string): Promise<boolean>;
}

export interface InternalLLMRepository {
  findModels(): Promise<string[]>;
}
