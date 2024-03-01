export interface UseCase {
  execute(...args: unknown[]): Promise<unknown>;
}
