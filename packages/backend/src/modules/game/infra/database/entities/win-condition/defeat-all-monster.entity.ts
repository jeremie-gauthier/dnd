import { WinCondition } from "./win-condition.entity";

export class DefeatAllMonsters extends WinCondition {
  name: "defeat_all_monsters";
  nbMonstersRemaining: number;
}
