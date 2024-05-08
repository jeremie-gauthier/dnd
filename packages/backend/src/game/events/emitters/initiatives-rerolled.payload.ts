import { GameEntity } from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class InitiativesRerolledPayload
  implements EventPayload<GameEvent.InitiativesRerolled>
{
  public readonly name = GameEvent.InitiativesRerolled;
  public readonly game: GameEntity;

  constructor({  game }: Omit<InitiativesRerolledPayload, "name">) {
    this.game = game;
  }
}
