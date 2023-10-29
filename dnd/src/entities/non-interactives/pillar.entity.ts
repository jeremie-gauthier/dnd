import type { Coord } from '../../map/coord';
import { NonInteractive } from './non-interactive.interface';

export class Pillar implements NonInteractive {
  public readonly type = 'pillar';
  public readonly isPlayable = false;
  public readonly isBlocking = true;

  constructor(public readonly coord: Coord) {}

  public getRepresentation() {
    return 'This is a Pillar';
  }

  public toString() {
    return 'P';
  }
}
