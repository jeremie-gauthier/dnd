import { InteractiveEntityKind } from "src/database/enums/interactive-entity-kind.enum";
import { Chest } from "../../domain/tile/tile-entity/interactive/chest.entity";
import { Door } from "../../domain/tile/tile-entity/interactive/door.entity";
import { TileInteractiveEntity as TileInteractiveEntityDomain } from "../../domain/tile/tile-entity/interactive/interactive.abstract";
import { Trap } from "../../domain/tile/tile-entity/interactive/trap.entity";
import { TileNonPlayableInteractiveEntity as TileInteractiveEntityPersistence } from "../../infra/database/entities/tile-entity/tile-non-playable-interactive-entity/tile-non-playable-interactive-entity.entity";
import { TrapEntity as TrapEntityPersistence } from "../../infra/database/entities/tile-entity/tile-non-playable-interactive-entity/trap-entity.entity";

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
