export class ParsingError extends Error {
  constructor(message: string, line: number) {
    super(`[-] Parsing error: ${message} (at line ${line})`);
    this.name = 'ParsingError';
  }
}
