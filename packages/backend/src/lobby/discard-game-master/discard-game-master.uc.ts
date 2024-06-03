import { DiscardGameMasterInput, LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { DiscardGameMasterRepository } from "./discard-game-master.repository";

@Injectable()
export class DiscardGameMasterUseCase implements UseCase {
  constructor(
    private readonly repository: DiscardGameMasterRepository,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    lobbyId,
    userId,
  }: DiscardGameMasterInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.repository.getLobbyById({ lobbyId });

    this.mustExecute(lobby, { userId });

    this.discardGameMaster({ lobby });
    await this.backupService.updateLobby({ lobby });
  }

  private mustExecute(
    lobby: LobbyEntity | null,
    { userId }: { userId: User["id"] },
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    if (playerIdx < 0) {
      throw new ForbiddenException(
        "You must be in the lobby to discard Game Master",
      );
    }

    const player = lobby.players[playerIdx]!;
    if (player.isReady) {
      throw new ForbiddenException(
        "You cannot discard role when you are ready",
      );
    }

    if (lobby.gameMaster.userId !== userId) {
      throw new ForbiddenException(
        "You can only discard roles you have picked",
      );
    }
  }

  private discardGameMaster({ lobby }: { lobby: LobbyEntity }): void {
    lobby.gameMaster.userId = undefined;
  }
}
