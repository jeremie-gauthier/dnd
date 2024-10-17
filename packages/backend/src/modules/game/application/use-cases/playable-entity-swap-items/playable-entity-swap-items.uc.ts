import { PlayableEntitySwapItemsInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { GameEvent } from "src/modules/game/domain/domain-events/game-event.enum";
import { GameUpdatedPayload } from "../../events/game-updated.payload";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";

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
  }: PlayableEntitySwapItemsInput & { userId: User["id"] }): Promise<void> {
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
