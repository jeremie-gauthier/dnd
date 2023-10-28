import type { Coord } from '../../interfaces/coord.interface';
import { NonInteractive } from './non-interactive.interface';

export class Tree implements NonInteractive {
  public readonly type = 'tree';
  public readonly isPlayable = false;
  public readonly isBlocking = true;

  constructor(public readonly coord: Coord) {}

  public getRepresentation() {
    return 'This is a Tree';
  }

  public toString() {
    return 'T';
  }
}
