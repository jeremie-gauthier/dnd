import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";

export class PlayableEntityOpenedChestDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityOpenedChest>
{
  public readonly name = GameEvent.PlayableEntityOpenedChest;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    playableEntity,
  }: Omit<PlayableEntityOpenedChestDomainEvent, "name">) {
    this.playableEntity = playableEntity;
  }
}
