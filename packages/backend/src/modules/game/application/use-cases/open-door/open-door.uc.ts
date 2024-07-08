import {
  Coord,
  GameEntity,
  OpenDoorInput,
  PlayableEntity,
  TileNonPlayableInteractiveEntity,
} from "@dnd/shared";
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { PlayableEntityService } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.service";
import { DoorOpenedPayload } from "src/modules/shared/events/game/door-opened.payload";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { InitiativeService } from "../../../domain/initiative/initiative.service";
import { MapService } from "../../../domain/map/map.service";
import { SpawnService } from "../../../domain/spawn/spawn.service";
import { TurnService } from "../../../domain/turn/turn.service";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";

@Injectable()
export class OpenDoorUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly turnService: TurnService,
    private readonly initiativeService: InitiativeService,
    private readonly spawnService: SpawnService,
    private readonly eventEmitter: EventEmitter2,
    private readonly playableEntityService: PlayableEntityService,
    private readonly mapService: MapService,
  ) {}

  public async execute({
    userId,
    gameId,
    coordOfTileWithDoor,
  }: OpenDoorInput & {
    userId: User["id"];
  }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    // this.mustExecute({ game, userId, coordOfTileWithDoor });

    // const { entityThatOpenedTheDoor } = this.openDoor({
    //   coordOfTileWithDoor,
    //   game,
    //   userId,
    // });
    // this.turnService.endPlayableEntityTurn({
    //   game,
    //   playableEntity: entityThatOpenedTheDoor,
    // });
    // this.spawnService.spawnEnemies({ game, doorCoord: coordOfTileWithDoor });
    // this.initiativeService.rollPlayableEntitiesInitiative({ game });
    // this.turnService.restartTimeline({ game });

    // this.backupService.updateGame({ game });
  }

  private mustExecute({
    game,
    userId,
    coordOfTileWithDoor,
  }: Pick<OpenDoorInput, "coordOfTileWithDoor"> & {
    game: GameEntity;
    userId: User["id"];
  }) {
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

    const tileWithDoor = this.getDoor({
      coord: coordOfTileWithDoor,
      game,
    });
    if (!tileWithDoor) {
      throw new NotFoundException("No closed door found at these coordinates");
    }

    this.playableEntityService.mustBeAdjacent({
      adjacencyCoord: coordOfTileWithDoor,
      playableEntity: playingEntity,
    });
    this.playableEntityService.mustBeAbleToAct(playingEntity);
    this.playableEntityService.mustBeAlive(playingEntity);
  }

  private openDoor({
    userId,
    game,
    coordOfTileWithDoor,
  }: Pick<OpenDoorInput, "coordOfTileWithDoor"> & {
    userId: User["id"];
    game: GameEntity;
  }): { entityThatOpenedTheDoor: PlayableEntity } {
    const doorEntity = this.getDoor({
      coord: coordOfTileWithDoor,
      game,
    }) as TileNonPlayableInteractiveEntity;

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

  private getDoor({
    coord,
    game,
  }: { coord: Coord; game: GameEntity }):
    | TileNonPlayableInteractiveEntity
    | undefined {
    const tileWithDoor = this.mapService.getTileOrThrow({ coord, game });
    const doorEntity = tileWithDoor.entities.find(
      (entity) =>
        entity.type === "non-playable-interactive-entity" &&
        entity.kind === "door" &&
        entity.isBlocking &&
        entity.canInteract,
    ) as TileNonPlayableInteractiveEntity | undefined;
    return doorEntity;
  }
}
