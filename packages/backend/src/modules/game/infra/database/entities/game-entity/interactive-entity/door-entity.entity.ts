import { ChildEntity } from "typeorm";
import { InteractiveEntityKind } from "../../../enums/interactive-entity-kind.enum";
import { InteractiveEntity } from "./interactive-entity.entity";

@ChildEntity(InteractiveEntityKind.DOOR)
export class DoorEntity extends InteractiveEntity {
  override readonly kind = InteractiveEntityKind.DOOR;
}
