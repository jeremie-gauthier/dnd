import { Chest } from "src/modules/game/domain/tile/tile-entity/interactive/chest.entity";
import { Door } from "src/modules/game/domain/tile/tile-entity/interactive/door.entity";
import { TileInteractiveEntity as TileInteractiveEntityDomain } from "src/modules/game/domain/tile/tile-entity/interactive/interactive.abstract";
import { Trap } from "src/modules/game/domain/tile/tile-entity/interactive/trap.entity";
import { TileNonPlayableInteractiveEntity as TileInteractiveEntityPersistence } from "src/modules/game/infra/database/entities/tile-entity/tile-non-playable-interactive-entity/tile-non-playable-interactive-entity.entity";
import { TrapEntity as TrapEntityPersistence } from "src/modules/game/infra/database/entities/tile-entity/tile-non-playable-interactive-entity/trap-entity.entity";
import { InteractiveEntityKind } from "src/modules/game/infra/database/enums/interactive-entity-kind.enum";

export class TileInteractiveEntityFactory {
  private constructor() {}

  public static create(
    data: TileInteractiveEntityPersistence,
  ): TileInteractiveEntityDomain {
    switch (data.kind) {
      case InteractiveEntityKind.DOOR:
        return new Door(data);
      case InteractiveEntityKind.TRAP:
        return new Trap(data as TrapEntityPersistence);
      case InteractiveEntityKind.CHEST:
        return new Chest(data);
    }
  }
}
