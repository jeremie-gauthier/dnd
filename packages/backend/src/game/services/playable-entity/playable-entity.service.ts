import {
  Coord,
  EnemyKind,
  GameEntity,
  GameItem,
  PlayableEnemyEntity,
  PlayableEntity,
  getNeighbourCoords,
} from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { Attack } from "src/database/entities/attack.entity";
import { User } from "src/database/entities/user.entity";

@Injectable()
export class PlayableEntityService {
  public createEnemies({
    game,
    enemiesName,
  }: { game: GameEntity; enemiesName: EnemyKind[] }): PlayableEnemyEntity[] {
    return enemiesName.map((enemyName) => {
      const enemyTemplate = game.enemyTemplates[enemyName]!;
      const id = `${enemyName}:${randomUUID()}`;

      return {
        id,
        type: "enemy",
        currentPhase: "idle",
        playedByUserId: game.gameMaster.userId,
        name: id,
        kind: enemyName,
        initiative: Number.NaN,
        isBlocking: true,
        coord: { row: Number.NaN, column: Number.NaN },
        characteristic: {
          ...enemyTemplate.characteristic,
          healthPoints: enemyTemplate.characteristic.baseHealthPoints,
          manaPoints: enemyTemplate.characteristic.baseManaPoints,
          armorClass: enemyTemplate.characteristic.baseArmorClass,
          movementPoints: enemyTemplate.characteristic.baseMovementPoints,
          actionPoints: enemyTemplate.characteristic.baseActionPoints,
        },
        inventory: enemyTemplate.inventory,
        actionsDoneThisTurn: [],
      };
    });
  }

  public getPlayableEntityOrThrow({
    game,
    playableEntityId,
  }: { game: GameEntity; playableEntityId: PlayableEntity["id"] }) {
    const playableEntity = game.playableEntities[playableEntityId];
    if (!playableEntity) {
      throw new NotFoundException("Playable entity not found in this game");
    }
    return playableEntity;
  }

  public getAttackItemOrThrow({
    attackId,
    playableEntity: { inventory },
  }: { attackId: Attack["id"]; playableEntity: PlayableEntity }): GameItem {
    const attackItem =
      inventory.gear.find(({ attacks }) =>
        attacks.some(({ id }) => id === attackId),
      ) ||
      inventory.backpack.find(({ attacks }) =>
        attacks.some(({ id }) => id === attackId),
      );

    if (!attackItem) {
      throw new NotFoundException(
        "Attack item not found in playable entity's inventory",
      );
    }

    return attackItem;
  }

  public mustBeAbleToAct(
    playableEntity: PlayableEntity,
  ): asserts playableEntity is PlayableEntity {
    if (playableEntity.characteristic.actionPoints <= 0) {
      throw new ForbiddenException(
        "Cannot act with a playable entity that has no action points left",
      );
    }
  }

  public mustBeAbleToMove(
    playableEntity: PlayableEntity,
  ): asserts playableEntity is PlayableEntity {
    if (playableEntity.characteristic.movementPoints <= 0) {
      throw new ForbiddenException(
        "Cannot move with a playable entity that has no movement points left",
      );
    }
  }

  public mustBeInActionPhase(
    playableEntity: PlayableEntity,
  ): asserts playableEntity is PlayableEntity & { currentPhase: "action" } {
    if (playableEntity.currentPhase !== "action") {
      throw new ForbiddenException(
        "Cannot act with a playable entity that is not in action phase",
      );
    }
  }

  public mustBeAlive(
    playableEntity: PlayableEntity,
  ): asserts playableEntity is PlayableEntity {
    if (playableEntity.characteristic.healthPoints <= 0) {
      throw new ForbiddenException(
        "Cannot act with a playable entity that is not alive",
      );
    }
  }

  public mustBeAdjacent({
    adjacencyCoord,
    playableEntity,
  }: { adjacencyCoord: Coord; playableEntity: PlayableEntity }) {
    const neighbourCoords = getNeighbourCoords({ coord: playableEntity.coord });
    const isAdjacent = neighbourCoords.some(
      ({ row, column }) =>
        row === adjacencyCoord.row && column === adjacencyCoord.column,
    );

    if (!isAdjacent) {
      throw new ForbiddenException(
        "Cannot act with an entity that is not adjacent",
      );
    }
  }

  public mustBePlayedByUserId({
    playableEntity,
    userId,
  }: { playableEntity: PlayableEntity; userId: User["id"] }) {
    if (playableEntity.playedByUserId !== userId) {
      throw new ForbiddenException(
        "Cannot act with a playable entity that you does not own",
      );
    }
  }

  public mustHaveItemInGear({
    item,
    playableEntity: { inventory },
  }: { item: GameItem; playableEntity: PlayableEntity }) {
    if (inventory.gear.every(({ name }) => name !== item.name)) {
      throw new ForbiddenException("Cannot use item that is not in gear");
    }
  }
}
