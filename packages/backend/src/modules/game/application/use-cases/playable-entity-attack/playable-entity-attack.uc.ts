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
import { PlayableEntityAttackInputDto } from "./playable-entity-attack.dto";

@Injectable()
export class PlayableEntityAttackUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly domainEventsDispatcherService: DomainEventsDispatcherService,
  ) {}

  public async execute({
    gameId,
    attackId,
    targetPlayableEntityId,
    userId,
  }: PlayableEntityAttackInputDto & { userId: User["id"] }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    game.playerAttack({
      attackId,
      targetPlayableEntityId,
      userId,
    });

    await this.gameRepository.update({ game });

    const plainGame = game.toPlain();
    await this.eventEmitter.emitAsync(
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
