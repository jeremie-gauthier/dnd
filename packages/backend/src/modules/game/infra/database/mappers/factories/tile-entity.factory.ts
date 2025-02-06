import { Playable as PlayableDomain } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { TileNonInteractiveEntity } from "src/modules/game/domain/tile/tile-entity/non-interactive/non-interactive.entity";
import { TilePlayableEntity } from "src/modules/game/domain/tile/tile-entity/playable/playable.entity";
import { TileEntity as TileEntityDomain } from "src/modules/game/domain/tile/tile-entity/tile-entity.abstract";
import { TileEntityType } from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { TileEntityPersistence } from "src/modules/game/infra/database/interfaces/tile-entity-persistence.interface";
import { TileInteractiveEntityFactory } from "./tile-interactive-entity.factory";

export class TileEntityFactory {
  private constructor() {}

  public static create({
    tileEntity,
    playableEntityRef,
  }: {
    tileEntity: TileEntityPersistence;
    playableEntityRef?: PlayableDomain;
  }): TileEntityDomain {
    switch (tileEntity.type) {
      case TileEntityType.PLAYABLE_ENTITY: {
        if (!playableEntityRef) {
          throw new Error("No playable entity ref found");
        }

        return new TilePlayableEntity({
          ...tileEntity,
          isBlocking: playableEntityRef.isBlocking,
          faction: playableEntityRef.faction,
        });
      }
      case TileEntityType.INTERACTIVE_ENTITY:
        return TileInteractiveEntityFactory.create(tileEntity);
      case TileEntityType.NON_INTERACTIVE_ENTITY:
        return new TileNonInteractiveEntity(tileEntity);
    }
  }
}
