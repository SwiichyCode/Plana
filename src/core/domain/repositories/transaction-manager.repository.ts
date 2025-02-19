export interface TransactionManager {
  execute<T>(fn: (tx: TransactionContext) => Promise<T>): Promise<T>;
}

export interface TransactionContext {
  // Vous pouvez étendre cette interface pour inclure des méthodes spécifiques,
  // ou utiliser directement le type de votre ORM si vous le souhaitez.
}
