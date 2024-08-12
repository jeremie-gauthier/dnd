import { Door } from "src/modules/game/domain/tile/tile-entity/interactive/door.entity";
import { TileInteractiveEntity } from "src/modules/game/domain/tile/tile-entity/interactive/interactive.abstract";
import { Trap } from "src/modules/game/domain/tile/tile-entity/interactive/trap.entity";
import { TileInteractiveEntity as TileInteractiveEntityPersistence } from "src/modules/game/infra/database/game/model/tile-entity/interactive.type";

export class TileInteractiveEntityFactory {
  private constructor() {}

  public static create(
    data: TileInteractiveEntityPersistence,
  ): TileInteractiveEntity {
    switch (data.kind) {
      case "door":
        return new Door(data);
      case "trap":
        return new Trap(data);
    }
  }
}
