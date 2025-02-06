import { Board as BoardDomain } from "../../domain/board/board.entity";
import { GameEvents as GameEventsDomain } from "../../domain/game-events/game-events.aggregate";
import { WinConditions as WinConditionsDomain } from "../../domain/win-conditions/win-conditions.aggregate";

export interface GameTemplateRepository {
  getOneOrThrow(data: { campaignId: string }): Promise<{
    board: BoardDomain;
    events: GameEventsDomain;
    winConditions: WinConditionsDomain;
  }>;
}

export const GAME_TEMPLATE_REPOSITORY = Symbol("GameTemplateRepository");
