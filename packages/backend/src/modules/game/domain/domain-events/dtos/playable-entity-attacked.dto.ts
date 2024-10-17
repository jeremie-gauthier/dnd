import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Attack } from "../../attack/attack.entity";
import { Dice } from "../../dice/dice.vo";
import { Item } from "../../item/item.abstract";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";

export class PlayableEntityAttackedDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityAttacked>
{
  public readonly name = GameEvent.PlayableEntityAttacked;
  public readonly attacker: ReturnType<Playable["toPlain"]>;
  public readonly target: ReturnType<Playable["toPlain"]>;
  public readonly damageDone: number;
  public readonly dicesResults: {
    dice: ReturnType<Dice["toPlain"]>;
    result: number;
  }[];
  public readonly attack: ReturnType<Attack["toPlain"]>;
  public readonly attackItemUsed: ReturnType<Item["toPlain"]>;

  constructor({
    attacker,
    target,
    damageDone,
    dicesResults,
    attack,
    attackItemUsed,
  }: Omit<PlayableEntityAttackedDomainEvent, "name">) {
    this.attacker = attacker;
    this.target = target;
    this.damageDone = damageDone;
    this.dicesResults = dicesResults;
    this.attack = attack;
    this.attackItemUsed = attackItemUsed;
  }
}
