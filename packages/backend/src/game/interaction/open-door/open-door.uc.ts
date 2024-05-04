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
import { InitiativeService } from "src/game/timeline/services/initiative/initiative.service";
import { TurnService } from "src/game/timeline/services/turn/turn.service";
import { MessageContext } from "src/types/socket.type";
import { UseCase } from "src/types/use-case.interface";
import { OpenDoorRepository } from "./open-door.repository";

@Injectable()
export class OpenDoorUseCase implements UseCase {
  constructor(
    private readonly repository: OpenDoorRepository,
    private readonly initiativeService: InitiativeService,
    private readonly turnService: TurnService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    ctx,
    userId,
    gameId,
    coordOfTileWithDoor,
  }: OpenDoorInput & {
    ctx: MessageContext;
    userId: User["id"];
  }): Promise<void> {
    const game = await this.repository.getGameById({ gameId });

    this.assertCanOpenDoor(game, { userId, coordOfTileWithDoor });

    const { doorEntity, entityThatOpenedTheDoor } = this.openDoor({
      userId,
      game,
      coordOfTileWithDoor,
    });
    await this.repository.updateGame({ game });

    this.eventEmitter.emitAsync(
      GameEvent.DoorOpened,
      new DoorOpenedPayload({ ctx, doorEntity, entityThatOpenedTheDoor, game }),
    );
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

    if (playingEntity.characteristic.actionPoints < 1) {
      throw new ForbiddenException(
        "You must have at least one action point to open a door",
      );
    }
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
  }): {
    doorEntity: TileNonPlayableInteractiveEntity;
    entityThatOpenedTheDoor: PlayableEntity;
  } {
    const tileWithDoorIdx = coordToIndex({
      coord: coordOfTileWithDoor,
      metadata: { width: game.map.width, height: game.map.height },
    });
    // open the door
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

    // end playing entity's turn
    const playableEntities = Object.values(game.playableEntities);
    const playingEntity = playableEntities.find(
      ({ currentPhase, playedByUserId }) =>
        currentPhase === "action" && playedByUserId === userId,
    ) as PlayableEntity;

    playingEntity.characteristic.actionPoints -= 1;
    playingEntity.currentPhase = "idle";

    // reroll initiative
    this.initiativeService.rollPlayableEntitiesInitiative({ game });

    // restart timeline at first entity
    const nextEntityToPlay = this.turnService.getNextEntityToPlay({
      game,
    }) as PlayableEntity;
    nextEntityToPlay.currentPhase = "action";
    nextEntityToPlay.characteristic.actionPoints =
      nextEntityToPlay.characteristic.baseActionPoints;

    return {
      doorEntity,
      entityThatOpenedTheDoor: playingEntity,
    };
  }
}
