export interface UseCase {
  execute(args: Record<string, unknown>): Promise<unknown>;
}
