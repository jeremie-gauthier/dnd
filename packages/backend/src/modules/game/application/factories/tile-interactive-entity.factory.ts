import { GameBoardDeserialized } from "src/modules/shared/interfaces/game-board-deserialized.interface";
import { Chest } from "../../domain/tile/tile-entity/interactive/chest.entity";
import { Door } from "../../domain/tile/tile-entity/interactive/door.entity";
import { TileInteractiveEntity } from "../../domain/tile/tile-entity/interactive/interactive.abstract";
import { Trap } from "../../domain/tile/tile-entity/interactive/trap.entity";

type RawTileInteractiveEntity = Extract<
  GameBoardDeserialized["tiles"][number]["entities"][number],
  { type: "interactive-entity" }
>;

export class TileInteractiveEntityFactory {
  private constructor() {}

  public static create(data: RawTileInteractiveEntity): TileInteractiveEntity {
    switch (data.kind) {
      case "door":
        return new Door(data);
      case "trap":
        return new Trap(data);
      case "chest":
        return new Chest(data);
    }
  }
}
