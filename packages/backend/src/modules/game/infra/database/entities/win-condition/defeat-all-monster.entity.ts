import { ChildEntity, Column } from "typeorm";
import { WinConditionName } from "../../enums/win-condition-name.enum";
import { WinCondition } from "./win-condition.entity";

@ChildEntity()
export class DefeatAllMonsters extends WinCondition {
  @Column({ default: WinConditionName.DEFEAT_ALL_MONSTERS, update: false })
  readonly name = WinConditionName.DEFEAT_ALL_MONSTERS;

  @Column()
  nbMonstersRemaining: number;
}
