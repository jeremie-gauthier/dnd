import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventPayload } from "src/shared/event-payload.abstract";
import { GameEvent } from "./game-event.enum";

export class EntityDiedPayload implements EventPayload<GameEvent.EntityDied> {
  public readonly name = GameEvent.EntityDied;
  public readonly game: GameEntity;
  public readonly target: PlayableEntity;

  constructor({ game, target }: Omit<EntityDiedPayload, "name">) {
    this.game = game;
    this.target = target;
  }
}
