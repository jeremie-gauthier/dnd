import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Potion } from "../../item/potion/potion.abstract";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";

export class PlayableEntityDrankPotionDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityDrankPotion>
{
  public readonly name = GameEvent.PlayableEntityDrankPotion;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;
  public readonly potion: ReturnType<Potion["toPlain"]>;

  constructor({
    playableEntity,
    potion,
  }: Omit<PlayableEntityDrankPotionDomainEvent, "name">) {
    this.playableEntity = playableEntity;
    this.potion = potion;
  }
}
