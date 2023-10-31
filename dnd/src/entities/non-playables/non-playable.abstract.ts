import type { Coord } from '../../map/coord';
import { Entity } from '../entity.abstract';

export abstract class NonPlayable extends Entity {
  constructor(public readonly coord: Coord) {
    super();
  }
}
