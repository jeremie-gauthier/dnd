import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { GameEvent } from "./game-event.enum";

export class GameUpdatedPayload implements EventPayload<GameEvent.GameUpdated> {
  public readonly name = GameEvent.GameUpdated;
  public readonly game: Game;

  constructor({ game }: Omit<GameUpdatedPayload, "name">) {
    this.game = game;
  }
}
