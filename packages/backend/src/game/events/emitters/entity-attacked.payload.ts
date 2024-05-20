import { GameEntity, GameItem, PlayableEntity } from "@dnd/shared";
import { Dice } from "src/database/entities/dice.entity";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

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

  constructor({
    game,
    attacker,
    target,
    damageDone,
    dicesResults,
    attack,
  }: Omit<EntityAttackedPayload, "name">) {
    this.game = game;
    this.attacker = attacker;
    this.target = target;
    this.damageDone = damageDone;
    this.dicesResults = dicesResults;
    this.attack = attack;
  }
}
