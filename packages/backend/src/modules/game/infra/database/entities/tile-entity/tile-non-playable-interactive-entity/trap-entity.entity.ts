import { ChildEntity, Column } from "typeorm";
import { InteractiveEntityKind } from "../../../enums/interactive-entity-kind.enum";
import { TrapName } from "../../../enums/trap-name.enum";
import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

@ChildEntity()
export class TrapEntity extends TileNonPlayableInteractiveEntity {
  @Column({ default: InteractiveEntityKind.TRAP, update: false })
  readonly kind = InteractiveEntityKind.TRAP;

  @Column({ default: InteractiveEntityKind.TRAP, update: false })
  readonly name = TrapName.PIT;
}
