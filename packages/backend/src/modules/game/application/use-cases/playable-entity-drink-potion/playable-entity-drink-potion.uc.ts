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
import { DomainEventsDispatcherService } from "../../services/domain-events-dispatcher.service";
import { PlayableEntityDrinkPotionInputDto } from "./playable-entity-drink-potion.dto";

@Injectable()
export class PlayableEntityDrinkPotionUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly domainEventsDispatcherService: DomainEventsDispatcherService,
  ) {}

  public async execute({
    gameId,
    itemId,
    userId,
  }: PlayableEntityDrinkPotionInputDto & {
    userId: User["id"];
  }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    game.playerDrinkPotion({ userId, itemId });
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
