import { EndPlayerTurnInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameUpdatedPayload } from "src/modules/shared/events/game/game-updated.payload";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";
import { TurnService } from "../../services/turn.service";

@Injectable()
export class EndPlayerTurnUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    protected readonly gameRepository: GameRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly turnService: TurnService,
  ) {}

  public async execute({
    gameId,
    userId,
  }: EndPlayerTurnInput & { userId: User["id"] }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    const { playingEntitiesWhoseTurnEnded, playingEntitiesWhoseTurnStarted } =
      game.endPlayerTurn({ userId });
    await this.gameRepository.update({ game });

    this.turnService.emitAsyncTurnEvents({
      game,
      playingEntitiesWhoseTurnEnded,
      playingEntitiesWhoseTurnStarted,
    });

    const plainGame = game.toPlain();
    this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game: plainGame }),
    );
  }
}
