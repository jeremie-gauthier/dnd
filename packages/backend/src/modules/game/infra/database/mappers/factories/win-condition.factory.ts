import { DefeatAllMonsters } from "src/modules/game/domain/win-conditions/win-condition/defeat-all-monsters.win-condition";
import { WinCondition as WinConditionDomain } from "src/modules/game/domain/win-conditions/win-condition/win-condition.abstract";
import { CurrentWinCondition as CurrentWinConditionPersistence } from "src/modules/game/infra/database/entities/win-condition/current-win-condition.entity";
import { WinCondition as WinConditionPersistence } from "src/modules/game/infra/database/entities/win-condition/win-condition.entity";
import { WinConditionName } from "../../enums/win-condition-name.enum";

export class WinConditionFactory {
  private constructor() {}

  public static create(
    winConditionData: CurrentWinConditionPersistence | WinConditionPersistence,
  ): WinConditionDomain {
    switch (winConditionData.name) {
      case WinConditionName.DEFEAT_ALL_MONSTERS:
        // nvm this any. There is a check during instantiation of entity domain
        return new DefeatAllMonsters(winConditionData.data as any);
      default:
        throw new Error(`WinCondition ${winConditionData.name} not found`);
    }
  }
}
