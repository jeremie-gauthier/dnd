import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class PlayableEntityTurnStartedPayload
  implements EventPayload<GameEvent.PlayableEntityTurnStarted>
{
  public readonly name = GameEvent.PlayableEntityTurnStarted;
  public readonly game: GameEntity;
  public readonly playableEntity: PlayableEntity;

  constructor({
    game,
    playableEntity,
  }: Omit<PlayableEntityTurnStartedPayload, "name">) {
    this.game = game;
    this.playableEntity = playableEntity;
  }
}
