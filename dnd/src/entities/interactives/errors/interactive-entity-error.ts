export class InteractiveEntityError extends Error {
  constructor(message: string) {
    super(`[-] InteractiveEntity error: ${message}`);
    this.name = 'InteractiveEntityError';
  }
}
