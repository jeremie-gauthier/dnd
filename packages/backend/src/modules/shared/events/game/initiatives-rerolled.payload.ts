import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { GameEvent } from "./game-event.enum";

export class InitiativesRerolledPayload
  implements EventPayload<GameEvent.InitiativesRerolled>
{
  public readonly name = GameEvent.InitiativesRerolled;
  public readonly game: ReturnType<Game["toPlain"]>;

  constructor({ game }: Omit<InitiativesRerolledPayload, "name">) {
    this.game = game;
  }
}
