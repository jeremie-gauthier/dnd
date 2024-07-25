import { GameLog } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { PostgresDiceUIRepository } from "../../database/dice-ui/dice-ui.repository";

@Injectable()
export class LogPresenter {
  constructor(private readonly diceUIRepository: PostgresDiceUIRepository) {}

  public async toView(gameLog: GameLog): Promise<GameLog> {
    if (gameLog.type === "game.update.playable_entity_attacked") {
      return {
        ...gameLog,
        data: {
          ...gameLog.data,
          diceRollResults: await Promise.all(
            gameLog.data.diceRollResults.map(async (diceRollResult) => ({
              ...diceRollResult,
              ...(await this.getDiceColor({ name: diceRollResult.name })),
            })),
          ),
        },
      };
    }

    return gameLog;
  }

  private async getDiceColor({
    name,
  }: { name: Dice["name"] }): Promise<{ color: `#${string}` }> {
    const diceUI = await this.diceUIRepository.getOneOrThrow({ name });

    return {
      color: diceUI.color,
    };
  }
}
