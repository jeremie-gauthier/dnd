import { Board } from "../../domain/board/board.entity";
import { GameEvents } from "../../domain/game-events/game-events.aggregate";
import { WinConditions } from "../../domain/win-conditions/win-conditions.aggregate";

export interface GameTemplateDevRepository {
  create(data: {
    campaignId: string;
    board: Board;
    winConditions: WinConditions;
    gameEvents: GameEvents;
  }): Promise<void>;
}

export const GAME_TEMPLATE_DEV_REPOSITORY = Symbol("GameTemplateDevRepository");
