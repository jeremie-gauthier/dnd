import { ChildEntity } from "typeorm";
import { InteractiveEntityKind } from "../../../enums/interactive-entity-kind.enum";
import { InteractiveEntity } from "./interactive-entity.entity";

@ChildEntity(InteractiveEntityKind.CHEST)
export class ChestEntity extends InteractiveEntity {
  override readonly kind = InteractiveEntityKind.CHEST;
}
