import { EventPayload } from "src/interfaces/event-payload.interface";
import { Attack } from "src/modules/game/domain/attack/attack.entity";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Item } from "src/modules/game/domain/item/item.abstract";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class PlayableEntityAttackedPayload
  implements EventPayload<GameEvent.PlayableEntityAttacked>
{
  public readonly name = GameEvent.PlayableEntityAttacked;
  public readonly game: ReturnType<Game["toPlain"]>;
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
    game,
    attacker,
    target,
    damageDone,
    dicesResults,
    attack,
    attackItemUsed,
  }: Omit<PlayableEntityAttackedPayload, "name">) {
    this.game = game;
    this.attacker = attacker;
    this.target = target;
    this.damageDone = damageDone;
    this.dicesResults = dicesResults;
    this.attack = attack;
    this.attackItemUsed = attackItemUsed;
  }
}
