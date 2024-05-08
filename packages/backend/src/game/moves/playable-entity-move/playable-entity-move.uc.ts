import {
  Coord,
  GameEntity,
  PlayableEntity,
  PlayableEntityMoveInput,
  Tile,
  getNeighbourCoords,
  unfoldTilePath,
} from "@dnd/shared";
import { TrapEntity } from "@dnd/shared/dist/database/game/interactive-entities.type";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { PlayableEntityMovedPayload } from "src/game/events/emitters/playable-entity-moved.payload";
import { CoordService } from "src/game/map/services/coord/coord.service";
import { TrapService } from "src/game/trap/services/trap/trap.service";
import { UseCase } from "src/types/use-case.interface";
import { MovesService } from "../services/moves.service";
import { PlayableEntityMoveRepository } from "./playable-entity-move.repository";

@Injectable()
export class PlayableEntityMoveUseCase implements UseCase {
  constructor(
    private readonly repository: PlayableEntityMoveRepository,
    private readonly movesSerivce: MovesService,
    private readonly eventEmitter: EventEmitter2,
    private readonly trapService: TrapService,
    private readonly coordService: CoordService,
  ) {}

  public async execute({
    gameId,
    pathToTile,
    playableEntityId,
    userId,
  }: PlayableEntityMoveInput & {
    userId: User["id"];
  }): Promise<void> {
    const game = await this.repository.getGameById({ gameId });

    this.assertCanMovePlayableEntity(game, {
      playableEntityId,
      userId,
    });

    this.getPlayableEntityPath({ game, pathToTile, playableEntityId });

    await this.repository.updateGame({ game });

    this.eventEmitter.emitAsync(
      GameEvent.PlayableEntityMoved,
      new PlayableEntityMovedPayload({ game }),
    );
  }

  private assertCanMovePlayableEntity(
    game: GameEntity | null,
    {
      playableEntityId,
      userId,
    }: {
      userId: User["id"];
      playableEntityId: PlayableEntity["id"];
    },
  ): asserts game is GameEntity {
    if (!game) {
      throw new NotFoundException("Game not found");
    }

    const playableEntity = game.playableEntities[playableEntityId];
    if (!playableEntity) {
      throw new NotFoundException("Playable entity not found in this game");
    }

    if (playableEntity.playedByUserId !== userId) {
      throw new ForbiddenException(
        "Cannot move a playable entity that you does not own",
      );
    }

    if (playableEntity.currentPhase !== "action") {
      throw new ForbiddenException(
        "Cannot move a playable entity that is not in action phase",
      );
    }

    if (playableEntity.characteristic.healthPoints <= 0) {
      throw new ForbiddenException(
        "Cannot move a playable entity that is not alive",
      );
    }

    if (playableEntity.characteristic.movementPoints <= 0) {
      throw new ForbiddenException(
        "Playable entity has no movement points left",
      );
    }

    if (playableEntity.characteristic.actionPoints <= 0) {
      throw new ForbiddenException("Playable entity has no action points left");
    }
  }

  private getPlayableEntityPath({
    game,
    pathToTile,
    playableEntityId,
  }: {
    game: GameEntity;
    pathToTile: PlayableEntityMoveInput["pathToTile"];
    playableEntityId: PlayableEntityMoveInput["playableEntityId"];
  }): Tile[] {
    const metadata = { width: game.map.width, height: game.map.height };
    const validTiles: Tile[] = [];

    const playableEntity = game.playableEntities[
      playableEntityId
    ] as PlayableEntity;

    let movementPoints = playableEntity.characteristic.movementPoints;

    // slice to remove the entity self position (which is the origin in the bfs algo)
    const pathTiles = unfoldTilePath(pathToTile).slice(1);
    for (const pathTile of pathTiles) {
      const index = this.coordService.coordToIndex({
        coord: pathTile.coord,
        metadata,
      });
      const tile = game.map.tiles[index] as Tile;

      if (
        !this.isPlayableEntityAbleToMoveToTile({ game, playableEntity, tile })
      ) {
        break;
      }

      this.movesSerivce.moveHeroToRequestedPosition({
        game,
        heroId: playableEntityId,
        requestedPosition: pathTile.coord,
      });
      movementPoints -= 1;

      validTiles.push(pathTile);

      if (this.hasTriggerTrap({ tile })) {
        const trapEntity = this.getTrapEntityOnCoord({ tile });
        this.trapService.trigger({
          game,
          trapEntity,
          subjectEntity: playableEntity,
        });
        break;
      }
    }

    playableEntity.characteristic.actionPoints -= 1;

    return validTiles;
  }

  private isPlayableEntityAbleToMoveToTile({
    game,
    playableEntity,
    tile,
  }: {
    game: GameEntity;
    playableEntity: PlayableEntity;
    tile: Tile;
  }): boolean {
    if (playableEntity.characteristic.movementPoints <= 0) {
      return false;
    }

    if (
      !this.isNeighbourTiles({
        tileCoord: playableEntity.coord,
        tileToCompareCoord: tile.coord,
      })
    ) {
      return false;
    }

    if (
      !this.movesSerivce.canMoveToRequestedPosition({
        game,
        requestedPosition: tile.coord,
      })
    ) {
      return false;
    }

    return true;
  }

  private isNeighbourTiles({
    tileCoord,
    tileToCompareCoord,
  }: { tileCoord: Coord; tileToCompareCoord: Coord }): boolean {
    const neighbourCoords = getNeighbourCoords({ coord: tileCoord });
    return neighbourCoords.some(
      ({ row, column }) =>
        row === tileToCompareCoord.row && column === tileToCompareCoord.column,
    );
  }

  private hasTriggerTrap({ tile }: { tile: Tile }): boolean {
    return tile.entities.some(
      (entity) =>
        entity.type === "non-playable-interactive-entity" &&
        entity.kind === "trap" &&
        entity.canInteract,
    );
  }

  private getTrapEntityOnCoord({ tile }: { tile: Tile }): TrapEntity {
    const trapEntity = tile.entities.find(
      (entity) =>
        entity.type === "non-playable-interactive-entity" &&
        entity.kind === "trap" &&
        entity.canInteract,
    ) as TrapEntity;

    return trapEntity;
  }
}
