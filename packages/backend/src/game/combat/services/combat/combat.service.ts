import {
  AttackRangeType,
  Coord,
  GameEntity,
  GameItem,
  PlayableEntity,
  Tile,
  canAttackTarget,
  sum,
} from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DiceService } from "src/game/dice/services/dice/dice.service";
import { EntityAttackedPayload } from "src/game/events/emitters/entity-attacked.payload";
import { EntityDiedPayload } from "src/game/events/emitters/entity-died.payload";
import { EntityTookDamagePayload } from "src/game/events/emitters/entity-took-damage.payload";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { CoordService } from "src/game/map/services/coord/coord.service";

@Injectable()
export class CombatService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly diceService: DiceService,
    private readonly coordService: CoordService,
  ) {}

  public attack({
    game,
    attackerPlayableEntity,
    targetPlayableEntity,
    attack,
    attackItem,
  }: {
    game: GameEntity;
    attackerPlayableEntity: PlayableEntity;
    targetPlayableEntity: PlayableEntity;
    attack: GameItem["attacks"][number];
    attackItem: GameItem;
  }): void {
    // TODO: will need to implement hero bonus check for potential attack bonuses
    const dicesResults = attack.dices.map((dice) =>
      this.diceService.roll({ dice }),
    );

    const damageDone = Math.max(
      0,
      sum(...dicesResults.map(({ result }) => result)) -
        targetPlayableEntity.characteristic.armorClass,
    );

    this.eventEmitter.emitAsync(
      GameEvent.EntityAttacked,
      new EntityAttackedPayload({
        game,
        attacker: attackerPlayableEntity,
        target: targetPlayableEntity,
        damageDone,
        dicesResults,
        attack,
        attackItemUsed: attackItem,
      }),
    );

    if (damageDone > 0) {
      this.takeDamage({
        game,
        target: targetPlayableEntity,
        amount: damageDone,
      });
    }
  }

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

    if (target.type === "enemy") {
      this.handleEnemyDeath({ game, target });
    }

    this.eventEmitter.emitAsync(
      GameEvent.EntityDied,
      new EntityDiedPayload({ game, target }),
    );
  }

  private handleEnemyDeath({
    game,
    target,
  }: { game: GameEntity; target: PlayableEntity }): void {
    const playableEntities = Object.entries(game.playableEntities);
    const remainingEntities = playableEntities.filter(
      ([id]) => id !== target.id,
    );
    game.playableEntities = Object.fromEntries(remainingEntities);

    const targetIdx = this.coordService.coordToIndex({
      coord: target.coord,
      metadata: { height: game.map.height, width: game.map.width },
    });
    const targetTile = game.map.tiles[targetIdx];
    if (!targetTile) {
      return;
    }
    targetTile.entities = targetTile.entities.filter(
      (entity) =>
        !(entity.type === "playable-entity" && entity.id === target.id),
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
    return canAttackTarget({ ally, game, originTile, range, targetCoord });
  }
}
