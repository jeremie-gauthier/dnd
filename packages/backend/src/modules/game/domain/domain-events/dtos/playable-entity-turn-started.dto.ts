import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";

export class PlayableEntityTurnStartedDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityTurnStarted>
{
  public readonly name = GameEvent.PlayableEntityTurnStarted;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    playableEntity,
  }: { playableEntity: ReturnType<Playable["toPlain"]> }) {
    this.playableEntity = playableEntity;
  }
}
