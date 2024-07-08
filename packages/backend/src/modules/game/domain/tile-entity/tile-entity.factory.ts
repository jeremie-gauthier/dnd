import { GameBoardDeserialized } from "src/modules/shared/interfaces/game-board-deserialized.interface";
import { TileInteractiveEntityFactory } from "./interactive/interactive.factory";
import { TileNonInteractiveEntity } from "./non-interactive/non-interactive.abstract";
import { TilePlayableEntity } from "./playable/playable.entity";
import { TileEntity } from "./tile-entity.abstract";

type RawTileEntity = GameBoardDeserialized["tiles"][number]["entities"][number];

export class TileEntityFactory {
  private constructor() {}

  public static create(data: RawTileEntity): TileEntity {
    switch (data.type) {
      case "playable-entity":
        return new TilePlayableEntity(data);
      case "non-playable-interactive-entity":
        return TileInteractiveEntityFactory.create(data);
      case "non-playable-non-interactive-entity":
        return new TileNonInteractiveEntity({
          ...data,
          type: "non-interactive-entity",
        });
    }
  }
}
