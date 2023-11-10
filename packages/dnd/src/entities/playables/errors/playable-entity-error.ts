export class PlayableEntityError extends Error {
  constructor(message: string) {
    super(`[-] PlayableEntity error: ${message}`);
    this.name = 'PlayableEntityError';
  }
}
