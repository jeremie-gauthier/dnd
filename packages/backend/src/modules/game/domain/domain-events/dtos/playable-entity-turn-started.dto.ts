import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "../game-event.enum";

export class PlayableEntityTurnStartedDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityTurnStarted>
{
  public readonly name = GameEvent.PlayableEntityTurnStarted;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    playableEntity,
  }: Omit<PlayableEntityTurnStartedDomainEvent, "name">) {
    this.playableEntity = playableEntity;
  }
}
