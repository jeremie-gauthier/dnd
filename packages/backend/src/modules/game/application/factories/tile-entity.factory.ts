import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
import { Playable } from "../../domain/playable-entities/playable-entity/playable-entity.abstract";
import { TileNonInteractiveEntity } from "../../domain/tile/tile-entity/non-interactive/non-interactive.entity";
import { TilePlayableEntity } from "../../domain/tile/tile-entity/playable/playable.entity";
import { TileEntity as TileEntityDomain } from "../../domain/tile/tile-entity/tile-entity.abstract";
import { TileEntity as TileEntityPersistence } from "../../infra/database/entities/tile-entity/tile-entity.entity";
import { TileNonPlayableInteractiveEntity as TileNonPlayableInteractiveEntityPersistence } from "../../infra/database/entities/tile-entity/tile-non-playable-interactive-entity/tile-non-playable-interactive-entity.entity";
import { TileNonPlayableNonInteractiveEntity as TileNonPlayableNonInteractiveEntityPersistence } from "../../infra/database/entities/tile-entity/tile-non-playable-non-interactive-entity/tile-non-playable-non-interactive-entity.entity";
import { TilePlayableEntity as TilePlayableEntityPersistence } from "../../infra/database/entities/tile-entity/tile-playable-entity/tile-playable-entity.entity";
import { TileInteractiveEntityFactory } from "./tile-interactive-entity.factory";

export class TileEntityFactory {
  private constructor() {}

  public static create({
    tileEntity,
    playableEntityRef,
  }: {
    tileEntity: TileEntityPersistence;
    playableEntityRef?: Playable;
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
        } as TilePlayableEntityPersistence);
      }
      case TileEntityType.INTERACTIVE_ENTITY:
        return TileInteractiveEntityFactory.create(
          tileEntity as TileNonPlayableInteractiveEntityPersistence,
        );
      case TileEntityType.NON_INTERACTIVE_ENTITY:
        return new TileNonInteractiveEntity(
          tileEntity as TileNonPlayableNonInteractiveEntityPersistence,
        );
    }
  }
}
