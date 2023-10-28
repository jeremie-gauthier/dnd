import type { Coord } from '../interfaces/coord.interface';

export interface Entity {
  readonly type: string;
  readonly isPlayable: boolean;
  isBlocking: boolean;
  coord: Coord;

  // TODO: what it looks like
  getRepresentation: () => any;
  toString: () => string;
}
