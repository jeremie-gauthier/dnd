import { WinConditionName } from "../../enums/win-condition-name.enum";
import { WinCondition } from "./win-condition.entity";

export class DefeatAllMonsters extends WinCondition {
  readonly name = WinConditionName.DEFEAT_ALL_MONSTERS;
  nbMonstersRemaining: number;
}
