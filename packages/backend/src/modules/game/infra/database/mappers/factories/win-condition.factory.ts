import { DefeatAllMonsters } from "src/modules/game/domain/win-conditions/win-condition/defeat-all-monsters.win-condition";
import { WinCondition } from "src/modules/game/domain/win-conditions/win-condition/win-condition.abstract";
import { DefeatAllMonsters as DefeatAllMonstersPersistence } from "src/modules/game/infra/database/entities/win-condition/defeat-all-monster.entity";
import { WinCondition as WinConditionPersistence } from "src/modules/game/infra/database/entities/win-condition/win-condition.entity";
import { WinConditionName } from "../../enums/win-condition-name.enum";

export class WinConditionFactory {
  private constructor() {}

  public static create(
    winConditionData: WinConditionPersistence,
  ): WinCondition {
    switch (winConditionData.name) {
      case WinConditionName.DEFEAT_ALL_MONSTERS:
        return new DefeatAllMonsters(
          winConditionData as DefeatAllMonstersPersistence,
        );
      default:
        throw new Error(`WinCondition ${winConditionData.name} not found`);
    }
  }
}
