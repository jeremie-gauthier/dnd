import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { GameEvent } from "./game-event.enum";

export class GameWonPayload implements EventPayload<GameEvent.GameWon> {
  public readonly name = GameEvent.GameWon;
  public readonly game: ReturnType<Game["toPlain"]>;

  constructor({ game }: Omit<GameWonPayload, "name">) {
    this.game = game;
  }
}
