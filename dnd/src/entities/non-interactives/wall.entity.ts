import type { Coord } from '../../map/coord';
import { NonInteractive } from './non-interactive.interface';

export class Wall implements NonInteractive {
  public readonly type = 'wall';
  public readonly isPlayable = false;
  public readonly isBlocking = true;

  constructor(public readonly coord: Coord) {}

  public getRepresentation() {
    return 'This is a Wall';
  }

  public toString() {
    return 'W';
  }
}
