import type { LobbyEntity, TogglePlayerReadyStateInput } from "@dnd/shared";
import { ForbiddenException, Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";

@Injectable()
export class TogglePlayerReadyStateUseCase implements UseCase {
  constructor(
    private readonly backupService: BackupService,
    private readonly seatManagerService: SeatManagerService,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: TogglePlayerReadyStateInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.backupService.getLobbyOrThrow({ lobbyId });
    this.mustExecute({ lobby, userId });

    this.toggleUserReadyState({ lobby, userId });

    await this.backupService.updateLobby({ lobby });
  }

  private mustExecute({
    lobby,
    userId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
  }) {
    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    this.seatManagerService.mustBeInTheLobby({ lobby, userId });
  }

  private toggleUserReadyState({
    lobby,
    userId,
  }: { lobby: LobbyEntity; userId: User["id"] }) {
    const player = this.seatManagerService.getPlayerOrThrow({ lobby, userId });

    player.isReady = !player.isReady;
  }
}
