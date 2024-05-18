import {
  AttackRangeType,
  Coord,
  GameEntity,
  PlayableEntity,
  Tile,
} from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EntityDiedPayload } from "src/game/events/emitters/entity-died.payload";
import { EntityTookDamagePayload } from "src/game/events/emitters/entity-took-damage.payload";
import { GameEvent } from "src/game/events/emitters/game-events.enum";

@Injectable()
export class CombatService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public takeDamage({
    game,
    target,
    amount,
  }: { game: GameEntity; target: PlayableEntity; amount: number }): void {
    target.characteristic.healthPoints -= amount;

    this.eventEmitter.emitAsync(
      GameEvent.EntityTookDamage,
      new EntityTookDamagePayload({ game, target, amount }),
    );

    if (target.characteristic.healthPoints <= 0) {
      this.entityDeath({ game, target });
    }
  }

  public entityDeath({
    game,
    target,
  }: { game: GameEntity; target: PlayableEntity }): void {
    target.characteristic.healthPoints = 0;
    target.isBlocking = false;

    this.eventEmitter.emitAsync(
      GameEvent.EntityDied,
      new EntityDiedPayload({ game, target }),
    );
  }

  public canAttackTarget({
    ally,
    game,
    originTile,
    range,
    targetCoord,
  }: {
    ally: PlayableEntity["type"];
    game: GameEntity;
    originTile: Tile;
    range: AttackRangeType;
    targetCoord: Coord;
  }): boolean {
    return this.canAttackTarget({ ally, game, originTile, range, targetCoord });
  }
}
