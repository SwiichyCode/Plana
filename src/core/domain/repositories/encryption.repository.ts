export interface EncryptionRepository {
  encrypt(value: string): Promise<string>;
  decrypt(encryptedValue: string): Promise<string>;
}
