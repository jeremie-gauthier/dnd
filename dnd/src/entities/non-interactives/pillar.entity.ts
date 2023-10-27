import type { Coord } from '../../interfaces/coord.interface';
import { NonInteractive } from './non-interactive.interface';

export class Pillar implements NonInteractive {
  public readonly type = 'pillar';
  public readonly isBlocking = true;

  constructor(public readonly coord: Coord) {}

  public getRepresentation() {
    return 'This is a Pillar';
  }

  public toString() {
    return 'P';
  }
}
