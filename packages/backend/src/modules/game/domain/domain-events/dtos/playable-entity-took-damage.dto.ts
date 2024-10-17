import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "../game-event.enum";

export class PlayableEntityTookDamageDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityTookDamage>
{
  public readonly name = GameEvent.PlayableEntityTookDamage;
  public readonly target: ReturnType<Playable["toPlain"]>;
  public readonly amount: number;

  constructor({
    target,
    amount,
  }: Omit<PlayableEntityTookDamageDomainEvent, "name">) {
    this.target = target;
    this.amount = amount;
  }
}
