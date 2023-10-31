import type { Coord } from '../map/coord';

export abstract class Entity {
  public abstract readonly name: string;
  public abstract readonly type: string;
  public abstract readonly isPlayable: boolean;
  public abstract isBlocking: boolean;
  public abstract coord: Coord;

  public toString() {
    return this.name.at(0) ?? '?';
  }
}
