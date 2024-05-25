import { GameEntity } from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class GameUpdatedPayload implements EventPayload<GameEvent.GameUpdated> {
  public readonly name = GameEvent.GameUpdated;
  public readonly game: GameEntity;

  constructor({ game }: Omit<GameUpdatedPayload, "name">) {
    this.game = game;
  }
}