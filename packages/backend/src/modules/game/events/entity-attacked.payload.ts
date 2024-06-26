import { GameEntity, GameItem, PlayableEntity } from "@dnd/shared";
import { Dice } from "src/database/entities/dice.entity";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { GameEvent } from "./game-event.enum";

export class EntityAttackedPayload
  implements EventPayload<GameEvent.EntityAttacked>
{
  public readonly name = GameEvent.EntityAttacked;
  public readonly game: GameEntity;
  public readonly attacker: PlayableEntity;
  public readonly target: PlayableEntity;
  public readonly damageDone: number;
  public readonly dicesResults: { dice: Dice; result: number }[];
  public readonly attack: GameItem["attacks"][number];
  public readonly attackItemUsed: GameItem;

  constructor({
    game,
    attacker,
    target,
    damageDone,
    dicesResults,
    attack,
    attackItemUsed,
  }: Omit<EntityAttackedPayload, "name">) {
    this.game = game;
    this.attacker = attacker;
    this.target = target;
    this.damageDone = damageDone;
    this.dicesResults = dicesResults;
    this.attack = attack;
    this.attackItemUsed = attackItemUsed;
  }
}
