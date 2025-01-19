import { GameBoardDeserialized } from "src/modules/shared/interfaces/game-board-deserialized.interface";
import { Playable } from "../../domain/playable-entities/playable-entity/playable-entity.abstract";
import { TileNonInteractiveEntity } from "../../domain/tile/tile-entity/non-interactive/non-interactive.entity";
import { TilePlayableEntity } from "../../domain/tile/tile-entity/playable/playable.entity";
import { TileEntity } from "../../domain/tile/tile-entity/tile-entity.abstract";
import { TileInteractiveEntityFactory } from "./tile-interactive-entity.factory";

type RawTileEntity = GameBoardDeserialized["tiles"][number]["entities"][number];

export class TileEntityFactory {
  private constructor() {}

  public static create({
    tileEntity,
    playableEntityRef,
  }: {
    tileEntity: RawTileEntity;
    playableEntityRef?: Playable;
  }): TileEntity {
    switch (tileEntity.type) {
      case "playable-entity": {
        if (!playableEntityRef) {
          throw new Error("No playable entity ref found");
        }

        return new TilePlayableEntity({
          ...tileEntity,
          isBlocking: playableEntityRef.isBlocking,
          faction: playableEntityRef.faction,
        });
      }
      case "interactive-entity":
        return TileInteractiveEntityFactory.create(tileEntity);
      case "non-interactive-entity":
        return new TileNonInteractiveEntity(tileEntity);
    }
  }
}
