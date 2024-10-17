import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Potion } from "src/modules/game/domain/item/potion/potion.abstract";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class PlayableEntityDrankPotionPayload
  implements EventPayload<GameEvent.PlayableEntityDrankPotion>
{
  public readonly name = GameEvent.PlayableEntityDrankPotion;
  public readonly game: ReturnType<Game["toPlain"]>;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;
  public readonly potion: ReturnType<Potion["toPlain"]>;

  constructor({
    game,
    playableEntity,
    potion,
  }: Omit<PlayableEntityDrankPotionPayload, "name">) {
    this.game = game;
    this.playableEntity = playableEntity;
    this.potion = potion;
  }
}
