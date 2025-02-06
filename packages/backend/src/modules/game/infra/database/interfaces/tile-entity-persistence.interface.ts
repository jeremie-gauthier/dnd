import { TileNonPlayableInteractiveEntity as TileNonPlayableInteractiveEntityPersistence } from "../entities/tile-entity/tile-non-playable-interactive-entity/tile-non-playable-interactive-entity.entity";
import { TileNonPlayableNonInteractiveEntity as TileNonPlayableNonInteractiveEntityPersistence } from "../entities/tile-entity/tile-non-playable-non-interactive-entity/tile-non-playable-non-interactive-entity.entity";
import { TilePlayableEntity as TilePlayableEntityPersistence } from "../entities/tile-entity/tile-playable-entity/tile-playable-entity.entity";

export type TileEntityPersistence =
  | TilePlayableEntityPersistence
  | TileNonPlayableInteractiveEntityPersistence
  | TileNonPlayableNonInteractiveEntityPersistence;
