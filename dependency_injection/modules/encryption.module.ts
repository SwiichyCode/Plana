import { DI_SYMBOLS } from '#di/types';
import { EncryptionService } from '@/core/domain/services/encryption.service';
import { EncryptionCrypto } from '@/core/infrastructure/adapters/encryption/encryption-crypto';
import { createModule } from '@evyweb/ioctopus';

export function createEncryptionModule() {
  const encryptionModule = createModule();

  encryptionModule.bind(DI_SYMBOLS.EncryptionRepository).toClass(EncryptionCrypto);
  encryptionModule.bind(DI_SYMBOLS.EncryptionService).toClass(EncryptionService, [DI_SYMBOLS.EncryptionRepository]);

  return encryptionModule;
}
