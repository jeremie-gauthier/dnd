import { TileNonInteractiveEntity } from "src/modules/game/domain/tile/tile-entity/non-interactive/non-interactive.abstract";
import { TilePlayableEntity } from "src/modules/game/domain/tile/tile-entity/playable/playable.entity";
import { TileEntity } from "src/modules/game/domain/tile/tile-entity/tile-entity.abstract";
import { Board } from "../model/board.type";
import { TileInteractiveEntityFactory } from "./tile-interactive-entity.factory";

export class TileEntityFactory {
  private constructor() {}

  public static create(
    data: Board["tiles"][number]["entities"][number],
  ): TileEntity {
    switch (data.type) {
      case "playable-entity":
        return new TilePlayableEntity(data);
      case "interactive-entity":
        return TileInteractiveEntityFactory.create(data);
      case "non-interactive-entity":
        return new TileNonInteractiveEntity(data);
    }
  }
}
