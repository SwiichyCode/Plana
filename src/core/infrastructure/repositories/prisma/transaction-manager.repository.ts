import { TransactionContext, TransactionManager } from '@/core/domain/repositories/transaction-manager.repository';
import { prisma } from '@/libs/prisma.config';

export class PrismaTransactionManager implements TransactionManager {
  async execute<T>(fn: (tx: TransactionContext) => Promise<T>): Promise<T> {
    return await prisma.$transaction(async tx => {
      return await fn(tx as TransactionContext);
    });
  }
}
