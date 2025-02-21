export interface TransactionManager {
  execute<T>(fn: (tx: TransactionContext) => Promise<T>): Promise<T>;
}

export interface TransactionContext {} // eslint-disable-line @typescript-eslint/no-empty-object-type
