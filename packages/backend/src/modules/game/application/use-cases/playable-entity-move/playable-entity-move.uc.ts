import { PlayableEntityMoveInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameUpdatedPayload } from "src/modules/shared/events/game/game-updated.payload";
import { PlayableEntityMovedPayload } from "src/modules/shared/events/game/playable-entity-moved.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/shared/events/game/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/shared/events/game/playable-entity-turn-started.payload";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";

@Injectable()
export class PlayableEntityMoveUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    gameId,
    pathToTile,
    userId,
  }: PlayableEntityMoveInput & {
    userId: User["id"];
  }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    const { playingEntity, turnEnded } = game.playerMove({
      userId,
      pathToTile,
    });

    await this.gameRepository.update({ game });

    const plainGame = game.toPlain();
    this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game: plainGame }),
    );

    this.eventEmitter.emitAsync(
      GameEvent.PlayableEntityMoved,
      new PlayableEntityMovedPayload({
        game: plainGame,
        playableEntity: playingEntity.toPlain(),
      }),
    );

    if (turnEnded) {
      this.eventEmitter.emitAsync(
        GameEvent.PlayableEntityTurnEnded,
        new PlayableEntityTurnEndedPayload({
          game: plainGame,
          playableEntity: turnEnded.playingEntityWhoseTurnEnded.toPlain(),
        }),
      );

      if (turnEnded.playingEntityWhoseTurnStarted) {
        this.eventEmitter.emitAsync(
          GameEvent.PlayableEntityTurnStarted,
          new PlayableEntityTurnStartedPayload({
            game: plainGame,
            playableEntity: turnEnded.playingEntityWhoseTurnStarted.toPlain(),
          }),
        );
      }
    }
  }
}
