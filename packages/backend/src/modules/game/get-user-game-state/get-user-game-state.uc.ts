import { GameEntity, GetUserGameStateOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { PlayerStateService } from "../services/player-state/player-state.service";

@Injectable()
export class GetUserGameStateUseCase implements UseCase {
  constructor(
    private readonly playerStateService: PlayerStateService,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    gameId,
  }: {
    userId: User["id"];
    gameId: GameEntity["id"];
  }): Promise<GetUserGameStateOutput> {
    const game = await this.backupService.getGameOrThrow({ gameId });

    const playerGameState = this.playerStateService.getPlayerState({
      game,
      userId,
    });

    return playerGameState;
  }
}
