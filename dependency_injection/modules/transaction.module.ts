import { DI_SYMBOLS } from '#di/types';
import { PrismaTransactionManager } from '@/core/infrastructure/repositories/prisma/transaction-manager.repository';
import { createModule } from '@evyweb/ioctopus';

export function createTransactionModule() {
  const transactionModule = createModule();

  transactionModule.bind(DI_SYMBOLS.TransactionManager).toClass(PrismaTransactionManager);

  return transactionModule;
}
