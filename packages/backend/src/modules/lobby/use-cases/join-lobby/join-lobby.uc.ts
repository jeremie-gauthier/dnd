import type { JoinLobbyInput, LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "src/modules/lobby/domain/backup/backup.service";
import { SeatManagerService } from "src/modules/lobby/domain/seat-manager/seat-manager.service";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(
    private readonly seatManagerService: SeatManagerService,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: { userId: User["id"] } & JoinLobbyInput): Promise<LobbyEntity["id"]> {
    const lobbyToLeave = await this.seatManagerService.getUserLobby({ userId });
    if (lobbyToLeave) {
      await this.seatManagerService.leave({ lobby: lobbyToLeave, userId });
    }

    const lobbyToJoin = await this.backupService.getLobbyOrThrow({ lobbyId });
    this.seatManagerService.take({ lobby: lobbyToJoin, userId });
    await this.backupService.updateLobby({ lobby: lobbyToJoin });

    return lobbyId;
  }
}
