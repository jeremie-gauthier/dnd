import {
  AttackRangeType,
  Coord,
  GameItem,
  GameView,
  PlayableEntity,
  Tile,
} from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MapService } from "../map/map.service";

@Injectable()
export class CombatService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    // private readonly diceService: DiceService,
    private readonly mapService: MapService,
  ) {}

  public attack({
    game,
    attackerPlayableEntity,
    targetPlayableEntity,
    attack,
    attackItem,
  }: {
    game: GameView;
    attackerPlayableEntity: PlayableEntity;
    targetPlayableEntity: PlayableEntity;
    attack: GameItem["attacks"][number];
    attackItem: GameItem;
  }): void {
    // TODO: will need to implement hero bonus check for potential attack bonuses
    // const dicesResults = attack.dices.map((dice) =>
    //   this.diceService.roll({ dice }),
    // );
    // const damageDone = Math.max(
    //   0,
    //   sum(...dicesResults.map(({ result }) => result)) -
    //     targetPlayableEntity.characteristic.armorClass,
    // );
    // this.eventEmitter.emitAsync(
    //   GameEvent.EntityAttacked,
    //   new EntityAttackedPayload({
    //     game,
    //     attacker: attackerPlayableEntity,
    //     target: targetPlayableEntity,
    //     damageDone,
    //     dicesResults,
    //     attack,
    //     attackItemUsed: attackItem,
    //   }),
    // );
    // if (damageDone > 0) {
    //   this.takeDamage({
    //     game,
    //     target: targetPlayableEntity,
    //     amount: damageDone,
    //   });
    // }
  }

  public takeDamage({
    game,
    target,
    amount,
  }: { game: GameView; target: PlayableEntity; amount: number }): void {
    target.characteristic.healthPoints -= amount;

    // this.eventEmitter.emitAsync(
    //   GameEvent.EntityTookDamage,
    //   new EntityTookDamagePayload({ game, target, amount }),
    // );

    if (target.characteristic.healthPoints <= 0) {
      this.entityDeath({ game, target });
    }
  }

  public entityDeath({
    game,
    target,
  }: { game: GameView; target: PlayableEntity }): void {
    target.characteristic.healthPoints = 0;
    target.isBlocking = false;

    if (target.faction === "monster") {
      this.handleEnemyDeath({ game, target });
    }

    // this.eventEmitter.emitAsync(
    //   GameEvent.EntityDied,
    //   new EntityDiedPayload({ game, target }),
    // );
  }

  private handleEnemyDeath({
    game,
    target,
  }: { game: GameView; target: PlayableEntity }): void {
    const playableEntities = Object.entries(game.playableEntities);
    const remainingEntities = playableEntities.filter(
      ([id]) => id !== target.id,
    );
    game.playableEntities = Object.fromEntries(remainingEntities);

    const targetTile = this.mapService.getTileOrThrow({
      coord: target.coord,
      game,
    });
    targetTile.entities = targetTile.entities.filter(
      (entity) =>
        !(entity.type === "playable-entity" && entity.id === target.id),
    );
  }

  public mustHaveTargetInRange({
    ally,
    game,
    originTile,
    range,
    targetCoord,
  }: {
    ally: PlayableEntity["faction"];
    game: GameView;
    originTile: Tile;
    range: AttackRangeType;
    targetCoord: Coord;
  }) {
    // if (!canAttackTarget({ ally, game, originTile, range, targetCoord })) {
    //   throw new ForbiddenException("Target playable entity is out of range");
    // }
  }
}
