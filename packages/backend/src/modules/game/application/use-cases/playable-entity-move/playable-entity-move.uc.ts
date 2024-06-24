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
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { PlayableEntityMovedPayload } from "src/modules/shared/events/game/playable-entity-moved.payload";
import { BackupService } from "../../../domain/backup/backup.service";
import { MapService } from "../../../domain/map/map.service";
import { MoveService } from "../../../domain/move/move.service";
import { PlayableEntityService } from "../../../domain/playable-entity/playable-entity.service";
import { TrapService } from "../../../domain/trap/trap.service";

@Injectable()
export class PlayableEntityMoveUseCase implements UseCase {
  constructor(
    private readonly moveService: MoveService,
    private readonly eventEmitter: EventEmitter2,
    private readonly trapService: TrapService,
    private readonly backupService: BackupService,
    private readonly playableEntityService: PlayableEntityService,
    private readonly mapService: MapService,
  ) {}

  public async execute({
    gameId,
    pathToTile,
    playableEntityId,
    userId,
  }: PlayableEntityMoveInput & {
    userId: User["id"];
  }): Promise<void> {
    const game = await this.backupService.getGameOrThrow({ gameId });

    this.mustExecute({ game, playableEntityId, userId });

    this.getPlayableEntityPath({ game, pathToTile, playableEntityId });

    await this.backupService.updateGame({ game });
  }

  private mustExecute({
    game,
    playableEntityId,
    userId,
  }: {
    game: GameEntity;
    userId: User["id"];
    playableEntityId: PlayableEntity["id"];
  }) {
    const playableEntity = this.playableEntityService.getPlayableEntityOrThrow({
      game,
      playableEntityId,
    });
    this.playableEntityService.mustBePlayedByUserId({ playableEntity, userId });
    this.playableEntityService.mustBeInActionPhase(playableEntity);
    this.playableEntityService.mustBeAlive(playableEntity);
    this.playableEntityService.mustBeAbleToMove(playableEntity);
    this.playableEntityService.mustBeAbleToAct(playableEntity);
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
    const validTiles: Tile[] = [];

    const playableEntity = this.playableEntityService.getPlayableEntityOrThrow({
      game,
      playableEntityId,
    });
    let movementPoints = playableEntity.characteristic.movementPoints;

    // slice to remove the entity self position (which is the origin in the bfs algo)
    const pathTiles = unfoldTilePath(pathToTile).slice(1);
    for (const pathTile of pathTiles) {
      const tile = this.mapService.getTileOrThrow({
        coord: pathTile.coord,
        game,
      });

      if (
        !this.isPlayableEntityAbleToMoveToTile({ game, playableEntity, tile })
      ) {
        break;
      }

      this.moveService.moveHeroToRequestedPosition({
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
    playableEntity.actionsDoneThisTurn.push({ name: "move" });

    this.eventEmitter.emitAsync(
      GameEvent.PlayableEntityMoved,
      new PlayableEntityMovedPayload({ game, playableEntity }),
    );

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
      !this.moveService.canMoveToRequestedPosition({
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
