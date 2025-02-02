import { Inject, Injectable } from "@nestjs/common";
import type { UseCase } from "src/interfaces/use-case.interface";
import { Game } from "src/modules/game/infra/database/entities/game.entity";
import { CurrentPhase } from "src/modules/game/infra/database/enums/current-phase.enum";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";
import { GameStateService } from "../../services/game-state.service";

@Injectable()
export class GetUserGameStateUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly gameStateService: GameStateService,
  ) {}

  public async execute({
    userId,
    gameId,
  }: {
    userId: string;
    gameId: Game["id"];
  }) {
    const game = await this.gameRepository.getOneOrThrow({ gameId });
    const plainGame = game.toPlain();

    const playableEntityTurn = plainGame.playableEntities.values.find(
      ({ status }) => status === CurrentPhase.ACTION,
    );
    if (!playableEntityTurn) {
      throw new Error(
        `No playable entity in '${CurrentPhase.ACTION}' phase found`,
      );
    }

    const playerGameState =
      this.gameStateService.getGameStateFromPlayerPerspective({
        game: plainGame,
        userId,
      });
    const playerCurrentlyPlaying = {
      userId: playableEntityTurn.playedByUserId,
      entityId: playableEntityTurn.id,
    };
    const userStatus =
      userId === playerCurrentlyPlaying.userId
        ? CurrentPhase.ACTION
        : CurrentPhase.IDLE;

    return {
      game: playerGameState,
      yourStatus: userStatus,
      playerCurrentlyPlaying,
    };
  }
}
