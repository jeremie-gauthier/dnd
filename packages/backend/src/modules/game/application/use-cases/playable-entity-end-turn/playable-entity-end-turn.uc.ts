import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameUpdatedPayload } from "src/modules/shared/events/game/game-updated.payload";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";
import { DomainEventsDispatcherService } from "../../services/domain-events-dispatcher.service";
import { PlayableEntityEndTurnInputDto } from "./playable-entity-end-turn.dto";

@Injectable()
export class PlayableEntityEndTurnUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly domainEventsDispatcherService: DomainEventsDispatcherService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    gameId,
    userId,
  }: PlayableEntityEndTurnInputDto & { userId: User["id"] }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    game.endPlayerTurn({ userId });
    await this.gameRepository.update({ game });

    const plainGame = game.toPlain();
    this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game: plainGame }),
    );

    const domainEvents = game.collectDomainEvents();
    this.domainEventsDispatcherService.dispatch({
      domainEvents,
      game: plainGame,
    });
  }
}
