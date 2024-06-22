export interface UseCase {
  execute(args: Record<string, any>): Promise<unknown>;
}
