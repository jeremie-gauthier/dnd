import { GameEntity } from "@dnd/shared";
import { EventPayload } from "src/shared/event-payload.abstract";
import { GameEvent } from "./game-event.enum";

export class GameUpdatedPayload implements EventPayload<GameEvent.GameUpdated> {
  public readonly name = GameEvent.GameUpdated;
  public readonly game: GameEntity;

  constructor({ game }: Omit<GameUpdatedPayload, "name">) {
    this.game = game;
  }
}
