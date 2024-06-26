import type { Entity } from '../entities/entity.abstract';
import type { Trap } from '../entities/non-playables/interactives/trap.entity';
import type { Coord } from './coord';

export class Tile {
  constructor(
    public readonly coord: Coord,
    public readonly label?: string,
    public entities: Entity[] = [],
  ) {}

  public getActiveTrap() {
    return this.entities.find(
      (entity) =>
        entity.isNonPlayable() &&
        entity.isInteractive() &&
        entity.isTrap() &&
        entity.canInteract,
    ) as Trap | undefined;
  }

  public isBlockedByEntity() {
    return this.entities.some((entity) => entity.isBlocking);
  }

  public isBlockedByNonPlayableEntity() {
    return this.entities.some((entity) => !entity.isPlayable);
  }

  public isBlockedByAllyEntity(ally: string) {
    return this.entities.some((entity) => entity.type === ally);
  }

  public isBlockedByNonAllyEntity(ally: string) {
    return !this.isBlockedByAllyEntity(ally);
  }

  public getBlockingNonAllyEntity(ally: string) {
    return this.entities.find(
      (entity) => entity.isBlocking && entity.type !== ally,
    );
  }

  public toString() {
    return this.entities.length === 0 ? '.' : this.entities[0]?.toString();
  }
}
