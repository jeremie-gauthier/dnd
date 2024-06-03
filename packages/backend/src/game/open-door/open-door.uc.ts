import {
  Coord,
  GameEntity,
  OpenDoorInput,
  PlayableEntity,
  Tile,
  TileNonPlayableInteractiveEntity,
  coordToIndex,
  getNeighbourCoords,
} from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { DoorOpenedPayload } from "src/game/events/emitters/door-opened.payload";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { InitiativeService } from "../services/initiative/initiative.service";
import { PlayableEntityService } from "../services/playable-entity/playable-entity.service";
import { SpawnService } from "../services/spawn/spawn.service";
import { TurnService } from "../services/turn/turn.service";
import { OpenDoorRepository } from "./open-door.repository";

@Injectable()
export class OpenDoorUseCase implements UseCase {
  constructor(
    private readonly repository: OpenDoorRepository,
    private readonly turnService: TurnService,
    private readonly initiativeService: InitiativeService,
    private readonly spawnService: SpawnService,
    private readonly eventEmitter: EventEmitter2,
    private readonly backupService: BackupService,
    private readonly playableEntityService: PlayableEntityService,
  ) {}

  public async execute({
    userId,
    gameId,
    coordOfTileWithDoor,
  }: OpenDoorInput & {
    userId: User["id"];
  }): Promise<void> {
    const game = await this.repository.getGameById({ gameId });

    this.assertCanOpenDoor(game, { userId, coordOfTileWithDoor });

    const { entityThatOpenedTheDoor } = this.openDoor({
      coordOfTileWithDoor,
      game,
      userId,
    });
    this.turnService.endPlayableEntityTurn({
      game,
      playableEntity: entityThatOpenedTheDoor,
    });
    this.spawnService.spawnEnemies({ game, doorCoord: coordOfTileWithDoor });
    this.initiativeService.rollPlayableEntitiesInitiative({ game });
    this.turnService.restartTimeline({ game });

    this.backupService.updateGame({ game });
  }

  private assertCanOpenDoor(
    game: GameEntity | null,
    {
      userId,
      coordOfTileWithDoor,
    }: Pick<OpenDoorInput, "coordOfTileWithDoor"> & {
      userId: User["id"];
    },
  ): asserts game is GameEntity {
    if (!game) {
      throw new NotFoundException("Game not found");
    }

    const playableEntities = Object.values(game.playableEntities);
    if (
      playableEntities.every(({ playedByUserId }) => playedByUserId !== userId)
    ) {
      throw new ForbiddenException("User does not play in this lobby");
    }

    const playingEntity = playableEntities.find(
      ({ currentPhase, playedByUserId }) =>
        currentPhase === "action" && playedByUserId === userId,
    );
    if (!playingEntity) {
      throw new ForbiddenException(
        "User has no playable entity in action phase",
      );
    }

    const tileWithDoorIdx = coordToIndex({
      coord: coordOfTileWithDoor,
      metadata: { width: game.map.width, height: game.map.height },
    });
    const tileWithDoor = game.map.tiles[tileWithDoorIdx];
    if (!tileWithDoor) {
      throw new ForbiddenException("No tile found at these coordinates");
    }

    if (
      !tileWithDoor.entities.some(
        (entity) =>
          entity.type === "non-playable-interactive-entity" &&
          entity.kind === "door" &&
          entity.isBlocking &&
          entity.canInteract,
      )
    ) {
      throw new NotFoundException("No closed door found at these coordinates");
    }

    if (
      !this.isNeighbourTiles({
        tileCoord: playingEntity.coord,
        tileToCompareCoord: coordOfTileWithDoor,
      })
    ) {
      throw new ForbiddenException(
        "You must be adjacent to the door to open it",
      );
    }

    this.playableEntityService.mustBeAbleToAct(playingEntity);
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

  private openDoor({
    userId,
    game,
    coordOfTileWithDoor,
  }: Pick<OpenDoorInput, "coordOfTileWithDoor"> & {
    userId: User["id"];
    game: GameEntity;
  }): { entityThatOpenedTheDoor: PlayableEntity } {
    const tileWithDoorIdx = coordToIndex({
      coord: coordOfTileWithDoor,
      metadata: { width: game.map.width, height: game.map.height },
    });

    const tileWithDoor = game.map.tiles[tileWithDoorIdx] as Tile;
    const doorEntity = tileWithDoor.entities.find(
      (entity) =>
        entity.type === "non-playable-interactive-entity" &&
        entity.kind === "door" &&
        entity.isBlocking &&
        entity.canInteract,
    ) as TileNonPlayableInteractiveEntity;

    doorEntity.isBlocking = false;
    doorEntity.canInteract = false;

    const playableEntities = Object.values(game.playableEntities);
    const entityThatOpenedTheDoor = playableEntities.find(
      ({ currentPhase, playedByUserId }) =>
        currentPhase === "action" && playedByUserId === userId,
    ) as PlayableEntity;

    entityThatOpenedTheDoor.characteristic.actionPoints -= 1;

    this.eventEmitter.emitAsync(
      GameEvent.DoorOpened,
      new DoorOpenedPayload({
        doorEntity,
        doorCoord: coordOfTileWithDoor,
        entityThatOpenedTheDoor,
        game,
      }),
    );

    return { entityThatOpenedTheDoor };
  }
}
