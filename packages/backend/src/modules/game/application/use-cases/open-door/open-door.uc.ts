import { OpenDoorInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { PlayableEntityService } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.service";
import { DoorOpenedPayload } from "src/modules/shared/events/game/door-opened.payload";
import { MonstersSpawnedPayload } from "src/modules/shared/events/game/enemies-spawned.payload";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameUpdatedPayload } from "src/modules/shared/events/game/game-updated.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/shared/events/game/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/shared/events/game/playable-entity-turn-started.payload";
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
    // private readonly initiativeService: InitiativeService,
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

    const {
      entityThatOpenedTheDoor,
      playingEntityWhoseTurnStarted,
      monstersSpawned,
    } = game.openDoor({
      userId,
      coordOfTileWithDoor: new Coord(coordOfTileWithDoor),
    });
    await this.gameRepository.update({ game });

    const plainGame = game.toPlain();
    this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game: plainGame }),
    );

    const plainEntityThatOpenedTheDoor = entityThatOpenedTheDoor.toPlain();
    this.eventEmitter.emitAsync(
      GameEvent.DoorOpened,
      new DoorOpenedPayload({
        game: plainGame,
        entityThatOpenedTheDoor: plainEntityThatOpenedTheDoor,
      }),
    );

    this.eventEmitter.emitAsync(
      GameEvent.MonstersSpawned,
      new MonstersSpawnedPayload({
        game: plainGame,
        monsters: monstersSpawned.map((monster) => monster.toPlain()),
      }),
    );

    this.eventEmitter.emitAsync(
      GameEvent.PlayableEntityTurnEnded,
      new PlayableEntityTurnEndedPayload({
        game: plainGame,
        playableEntity: plainEntityThatOpenedTheDoor,
      }),
    );
    if (playingEntityWhoseTurnStarted) {
      this.eventEmitter.emitAsync(
        GameEvent.PlayableEntityTurnStarted,
        new PlayableEntityTurnStartedPayload({
          game: plainGame,
          playableEntity: playingEntityWhoseTurnStarted.toPlain(),
        }),
      );
    }
  }
}
