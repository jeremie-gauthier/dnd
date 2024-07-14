import { TileNonInteractiveEntity } from "src/modules/game/domain/tile/tile-entity/non-interactive/non-interactive.abstract";
import { TilePlayableEntity } from "src/modules/game/domain/tile/tile-entity/playable/playable.entity";
import { TileEntity } from "src/modules/game/domain/tile/tile-entity/tile-entity.abstract";
import { Board } from "../model/board.type";
import { PlayableEntity } from "../model/playable-entity/playable.type";
import { TileInteractiveEntityFactory } from "./tile-interactive-entity.factory";

export class TileEntityFactory {
  private constructor() {}

  public static create({
    tileEntity,
    playableEntityRef,
  }: {
    tileEntity: Board["tiles"][number]["entities"][number];
    playableEntityRef?: PlayableEntity;
  }): TileEntity {
    switch (tileEntity.type) {
      case "playable-entity":
        return new TilePlayableEntity({
          ...tileEntity,
          isBlocking: playableEntityRef?.isBlocking ?? true,
        });
      case "interactive-entity":
        return TileInteractiveEntityFactory.create(tileEntity);
      case "non-interactive-entity":
        return new TileNonInteractiveEntity(tileEntity);
    }
  }
}
