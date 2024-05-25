import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class PlayableEntityTurnEndedPayload
  implements EventPayload<GameEvent.PlayableEntityTurnEnded>
{
  public readonly name = GameEvent.PlayableEntityTurnEnded;
  public readonly game: GameEntity;
  public readonly playableEntity: PlayableEntity;

  constructor({
    game,
    playableEntity,
  }: Omit<PlayableEntityTurnEndedPayload, "name">) {
    this.game = game;
    this.playableEntity = playableEntity;
  }
}
