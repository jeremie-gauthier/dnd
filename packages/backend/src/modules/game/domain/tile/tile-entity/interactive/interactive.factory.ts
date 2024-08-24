import { Door } from "src/modules/game/domain/tile/tile-entity/interactive/door.entity";
import { TileInteractiveEntity } from "src/modules/game/domain/tile/tile-entity/interactive/interactive.abstract";
import { Trap } from "src/modules/game/domain/tile/tile-entity/interactive/trap.entity";
import { GameBoardDeserialized } from "src/modules/shared/interfaces/game-board-deserialized.interface";
import { Chest } from "./chest.entity";

type RawTileInteractiveEntity = Extract<
  GameBoardDeserialized["tiles"][number]["entities"][number],
  { type: "interactive-entity" }
>;

export class TileInteractiveEntityFactory {
  private constructor() {}

  public static create(data: RawTileInteractiveEntity): TileInteractiveEntity {
    switch (data.kind) {
      case "door":
        return new Door({
          ...data,
          type: "interactive-entity",
        });
      case "trap":
        return new Trap({
          ...data,
          type: "interactive-entity",
        });
      case "chest":
        return new Chest({
          ...data,
          type: "interactive-entity",
        });
    }
  }
}
