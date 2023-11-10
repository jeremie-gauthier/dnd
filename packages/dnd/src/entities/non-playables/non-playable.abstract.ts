import type { Coord } from '../../map/coord';
import { Entity } from '../entity.abstract';
import type { Interactive } from './interactives/interactive.abstract';

export abstract class NonPlayable extends Entity {
  constructor(public readonly coord: Coord) {
    super();
  }

  public isInteractive(): this is Interactive {
    return this.type === 'interactive';
  }
}
