export class GameDomainError<Name extends string> extends Error {
  public readonly type: "domain";
  public readonly domain: "game";

  public readonly name: Name;
  public readonly message: string;
  public readonly cause: any;

  constructor({
    name,
    message,
    cause,
  }: { name: Name; message: string; cause?: any }) {
    super(message);
    this.name = name;
    this.cause = cause;
  }
}
