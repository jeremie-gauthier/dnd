import { NonInteractive } from './non-interactive.interface';

export class Wall implements NonInteractive {
  public readonly type = 'wall';
  public readonly isBlocking = true;

  public getRepresentation() {
    return 'This is a Wall';
  }

  public toString() {
    return 'W';
  }
}
