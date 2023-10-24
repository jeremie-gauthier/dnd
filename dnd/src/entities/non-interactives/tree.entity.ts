import { NonInteractive } from './non-interactive.interface';

export class Tree implements NonInteractive {
  public readonly type = 'tree';
  public readonly isBlocking = true;

  public getRepresentation() {
    return 'This is a Tree';
  }

  public toString() {
    return 'T';
  }
}
