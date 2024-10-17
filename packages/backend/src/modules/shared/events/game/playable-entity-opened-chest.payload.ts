import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class PlayableEntityOpenedChestPayload
  implements EventPayload<GameEvent.PlayableEntityOpenedChest>
{
  public readonly name = GameEvent.PlayableEntityOpenedChest;
  public readonly game: ReturnType<Game["toPlain"]>;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    game,
    playableEntity,
  }: Omit<PlayableEntityOpenedChestPayload, "name">) {
    this.game = game;
    this.playableEntity = playableEntity;
  }
}
