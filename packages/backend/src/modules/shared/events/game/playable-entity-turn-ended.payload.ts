import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class PlayableEntityTurnEndedPayload
  implements EventPayload<GameEvent.PlayableEntityTurnEnded>
{
  public readonly name = GameEvent.PlayableEntityTurnEnded;
  public readonly game: Game;
  public readonly playableEntity: Playable;

  constructor({
    game,
    playableEntity,
  }: Omit<PlayableEntityTurnEndedPayload, "name">) {
    this.game = game;
    this.playableEntity = playableEntity;
  }
}
