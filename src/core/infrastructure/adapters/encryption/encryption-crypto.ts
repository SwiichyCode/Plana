import { EncryptionRepository } from '@/core/domain/repositories/encryption.repository';
import CryptoJS from 'crypto-js';

const secretKey = process.env.ENCRYPTION_KEY || 'default_secret';

export class EncryptionCrypto implements EncryptionRepository {
  async encrypt(value: string): Promise<string> {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
      return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
    } catch (error) {
      console.error('Encryption error:', error);
      return value;
    }
  }

  async decrypt(encryptedValue: string): Promise<string> {
    try {
      if (!encryptedValue) return '';

      const parsedValue = CryptoJS.enc.Base64.parse(encryptedValue).toString(CryptoJS.enc.Utf8);
      const bytes = CryptoJS.AES.decrypt(parsedValue, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      return encryptedValue;
    }
  }
}
