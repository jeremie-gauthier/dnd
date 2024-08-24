import { GameWinConditionsDeserialized } from "src/modules/shared/interfaces/game-win-conditions-deserialized.interface";
import { DefeatAllMonsters } from "../../domain/win-conditions/win-condition/defeat-all-monsters.win-condition";

export class WinConditionFactory {
  private constructor() {}

  public static create(
    winConditionData: GameWinConditionsDeserialized[number],
  ) {
    switch (winConditionData.name) {
      case "defeat_all_monsters":
        return new DefeatAllMonsters(winConditionData);
      default:
        throw new Error(`WinCondition ${winConditionData.name} not found`);
    }
  }
}
