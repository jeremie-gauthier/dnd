import { TileEntityType } from "src/database/enums/tile-entity-type.enum";

export class TilePlayableEntity {
  readonly type = TileEntityType.PLAYABLE_ENTITY;
  id: string;
  faction: "hero" | "monster";
  isBlocking: boolean;
}
