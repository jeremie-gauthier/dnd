import { ChildEntity, Column } from "typeorm";
import { InteractiveEntityKind } from "../../../enums/interactive-entity-kind.enum";
import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

@ChildEntity()
export class DoorEntity extends TileNonPlayableInteractiveEntity {
  @Column({ default: InteractiveEntityKind.DOOR, update: false })
  readonly kind = InteractiveEntityKind.DOOR;
}
