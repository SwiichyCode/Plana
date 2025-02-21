export interface LLMRepository {
  validateApiKey(apiKey: string): Promise<boolean>;
}
