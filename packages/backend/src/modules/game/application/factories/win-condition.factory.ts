import { DefeatAllMonsters } from "../../domain/win-conditions/win-condition/defeat-all-monsters.win-condition";
import { WinCondition } from "../../domain/win-conditions/win-condition/win-condition.abstract";
import { DefeatAllMonsters as DefeatAllMonstersPersistence } from "../../infra/database/entities/win-condition/defeat-all-monster.entity";
import { WinCondition as WinConditionPersistence } from "../../infra/database/entities/win-condition/win-condition.entity";

export class WinConditionFactory {
  private constructor() {}

  public static create(
    winConditionData: WinConditionPersistence,
  ): WinCondition {
    switch (winConditionData.name) {
      case "defeat_all_monsters":
        return new DefeatAllMonsters(
          winConditionData as DefeatAllMonstersPersistence,
        );
      default:
        throw new Error(`WinCondition ${winConditionData.name} not found`);
    }
  }
}
