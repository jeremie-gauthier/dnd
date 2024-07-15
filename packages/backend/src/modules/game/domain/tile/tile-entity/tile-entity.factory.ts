import { GameBoardDeserialized } from "src/modules/shared/interfaces/game-board-deserialized.interface";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { TileInteractiveEntityFactory } from "./interactive/interactive.factory";
import { TileNonInteractiveEntity } from "./non-interactive/non-interactive.abstract";
import { TilePlayableEntity } from "./playable/playable.entity";
import { TileEntity } from "./tile-entity.abstract";

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
          faction: playableEntityRef.type,
        });
      }
      case "interactive-entity":
        return TileInteractiveEntityFactory.create(tileEntity);
      case "non-interactive-entity":
        return new TileNonInteractiveEntity({
          ...tileEntity,
          type: "non-interactive-entity",
        });
    }
  }
}
