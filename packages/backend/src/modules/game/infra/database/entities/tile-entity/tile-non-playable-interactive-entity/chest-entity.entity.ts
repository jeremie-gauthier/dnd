import { Column } from "typeorm";
import { InteractiveEntityKind } from "../../../enums/interactive-entity-kind.enum";
import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

export class ChestEntity extends TileNonPlayableInteractiveEntity {
  @Column({ default: InteractiveEntityKind.CHEST, update: false })
  readonly kind = InteractiveEntityKind.CHEST;
}
