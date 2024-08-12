import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import { LobbyDeletedPayload } from "src/modules/shared/events/lobby/lobby-deleted.payload";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";

@Injectable()
export class DeleteGameUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    protected readonly gameRepository: GameRepository,
  ) {}

  public async execute({ lobby }: LobbyDeletedPayload): Promise<void> {
    await this.gameRepository.del({ gameId: lobby.id });
  }
}
