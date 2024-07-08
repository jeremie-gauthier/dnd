import { GameEntity, GetUserGameStateOutput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { PlayerStateService } from "../../../domain/player-state/player-state.service";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";

@Injectable()
export class GetUserGameStateUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly playerStateService: PlayerStateService,
  ) {}

  public async execute({
    userId,
    gameId,
  }: {
    userId: User["id"];
    gameId: GameEntity["id"];
  }): Promise<GetUserGameStateOutput> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    // const playerGameState = this.playerStateService.getPlayerState({
    //   game,
    //   userId,
    // });

    return {} as any;
  }
}
