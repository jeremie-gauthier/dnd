import { GameEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { GameEvent } from "./game-event.enum";

export class InitiativesRerolledPayload
  implements EventPayload<GameEvent.InitiativesRerolled>
{
  public readonly name = GameEvent.InitiativesRerolled;
  public readonly game: GameEntity;

  constructor({ game }: Omit<InitiativesRerolledPayload, "name">) {
    this.game = game;
  }
}
