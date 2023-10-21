import { EntityFactory } from '../entities/entity.factory';
import { Entity } from '../entities/entity.interface';

export type TileContentType = 'free' | 'blocked';

export class TileContent {
  public readonly entity?: Entity = undefined;

  constructor(
    public readonly type: TileContentType,
    entityType?: string,
  ) {
    if (entityType) {
      this.entity = EntityFactory.create(entityType);
    }
  }

  public toString() {
    if (this.entity) {
      return this.entity.toString();
    } else {
      return this.type === 'free' ? '.' : 'X';
    }
  }
}
