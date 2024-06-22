import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { GameEvent } from "./game-event.enum";

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
