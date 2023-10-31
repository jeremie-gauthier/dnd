import type { Coord } from '../map/coord';
import type { NonPlayable } from './non-playables/non-playable.abstract';

export abstract class Entity {
  public abstract readonly name: string;
  public abstract readonly type: string;
  public abstract readonly isPlayable: boolean;
  public abstract isBlocking: boolean;
  public abstract coord: Coord;

  public isNonPlayable(): this is NonPlayable {
    return !this.isPlayable;
  }

  public toString() {
    return this.name.at(0) ?? '?';
  }
}
