import { Entity } from '../entities/entity.interface';
import { Coord } from '../interfaces/coord.interface';

export class Tile {
  constructor(
    public readonly coord: Coord,
    public readonly label?: string,
    public entities: Entity[] = [],
  ) {}

  public isBlockedByEntity() {
    return this.entities.some((entity) => entity.isBlocking);
  }

  public toString() {
    return this.entities.length === 0 ? '.' : this.entities[0]?.toString();
  }
}
