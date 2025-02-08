import { ChildEntity, Column } from "typeorm";
import { InteractiveEntityKind } from "../../../enums/interactive-entity-kind.enum";
import {
  TrapName,
  TrapNameType,
  TrapNameValues,
} from "../../../enums/trap-name.enum";
import { InteractiveEntity } from "./interactive-entity.entity";

@ChildEntity(InteractiveEntityKind.TRAP)
export class TrapEntity extends InteractiveEntity {
  override readonly kind = InteractiveEntityKind.TRAP;

  @Column({
    type: "enum",
    enum: TrapNameValues,
    default: TrapName.PIT,
    update: false,
  })
  readonly name: TrapNameType;
}
