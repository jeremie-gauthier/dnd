import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventPayload } from "src/shared/event-payload.abstract";
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
