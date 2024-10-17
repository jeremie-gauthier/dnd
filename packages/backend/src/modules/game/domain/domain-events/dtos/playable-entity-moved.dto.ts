import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "../game-event.enum";

export class PlayableEntityMovedDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityMoved>
{
  public readonly name = GameEvent.PlayableEntityMoved;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    playableEntity,
  }: Omit<PlayableEntityMovedDomainEvent, "name">) {
    this.playableEntity = playableEntity;
  }
}
