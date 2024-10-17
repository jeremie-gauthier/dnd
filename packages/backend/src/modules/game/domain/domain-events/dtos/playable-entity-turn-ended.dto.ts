import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";

export class PlayableEntityTurnEndedDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityTurnEnded>
{
  public readonly name = GameEvent.PlayableEntityTurnEnded;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    playableEntity,
  }: Omit<PlayableEntityTurnEndedDomainEvent, "name">) {
    this.playableEntity = playableEntity;
  }
}
