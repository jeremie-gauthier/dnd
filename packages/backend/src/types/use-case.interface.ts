export interface UseCase {
  execute(...args: any[]): Promise<any>;
}
