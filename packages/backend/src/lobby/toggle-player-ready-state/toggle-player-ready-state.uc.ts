import type { LobbyEntity, TogglePlayerReadyStateInput } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { TogglePlayerReadyStateRepository } from "./toggle-player-ready-state.repository";

@Injectable()
export class TogglePlayerReadyStateUseCase implements UseCase {
  constructor(
    private readonly repository: TogglePlayerReadyStateRepository,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: TogglePlayerReadyStateInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.repository.getLobbyById(lobbyId);
    this.assertCanToggleReadyState(lobby, { userId });

    this.toggleUserReadyState({ lobby, userId });

    await this.backupService.updateLobby({ lobby });
  }

  private assertCanToggleReadyState(
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
        "You must be in the lobby to set your ready state",
      );
    }
  }

  private toggleUserReadyState({
    lobby,
    userId,
  }: { lobby: LobbyEntity; userId: User["id"] }) {
    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    const player = lobby.players[playerIdx]!;

    player.isReady = !player.isReady;
  }
}
