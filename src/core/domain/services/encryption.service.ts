import { EncryptionRepository } from '@/core/domain/repositories/encryption.repository';

export class EncryptionService {
  constructor(private readonly encryptionRepository: EncryptionRepository) {}

  async encrypt(value: string): Promise<string> {
    return await this.encryptionRepository.encrypt(value);
  }

  async decrypt(encryptedValue: string): Promise<string> {
    return await this.encryptionRepository.decrypt(encryptedValue);
  }
}
