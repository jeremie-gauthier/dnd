import { InteractiveEntity as InteractiveEntityPersistence } from "../entities/game-entity/interactive-entity/interactive-entity.entity";
import { NonInteractiveEntity as NonInteractiveEntityPersistence } from "../entities/game-entity/non-interactive-entity/non-interactive-entity.entity";
import { PlayableEntity as PlayableEntityPersistence } from "../entities/game-entity/playable-entity/playable-entity.entity";

export type TileEntityPersistence =
  | PlayableEntityPersistence
  | InteractiveEntityPersistence
  | NonInteractiveEntityPersistence;
