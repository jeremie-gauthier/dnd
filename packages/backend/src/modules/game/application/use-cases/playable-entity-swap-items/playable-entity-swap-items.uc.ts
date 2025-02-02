import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { User } from "src/modules/lobby/domain/user/user.entity";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameUpdatedPayload } from "src/modules/shared/events/game/game-updated.payload";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";
import { PlayableEntitySwapItemsInputDto } from "./playable-entity-swap-items.dto";

@Injectable()
export class PlayableEntitySwapItemsUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    gameId,
    userId,
    gearItemId,
    backpackItemId,
  }: PlayableEntitySwapItemsInputDto & { userId: User["id"] }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });
    game.playerSwapItems({ userId, gearItemId, backpackItemId });

    await this.gameRepository.update({ game });

    const plainGame = game.toPlain();
    await this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game: plainGame }),
    );
  }
}
