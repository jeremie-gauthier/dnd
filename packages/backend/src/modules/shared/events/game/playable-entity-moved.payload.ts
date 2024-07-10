import type { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class PlayableEntityMovedPayload
  implements EventPayload<GameEvent.PlayableEntityMoved>
{
  public readonly name = GameEvent.PlayableEntityMoved;
  public readonly game: ReturnType<Game["toPlain"]>;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    game,
    playableEntity,
  }: Omit<PlayableEntityMovedPayload, "name">) {
    this.game = game;
    this.playableEntity = playableEntity;
  }
}
