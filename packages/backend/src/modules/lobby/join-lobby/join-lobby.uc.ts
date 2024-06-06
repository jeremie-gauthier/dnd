import type { JoinLobbyInput, LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import { JoinLobbyRepository } from "./join-lobby.repository";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(
    private readonly repository: JoinLobbyRepository,
    private readonly seatManagerService: SeatManagerService,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: { userId: User["id"] } & JoinLobbyInput): Promise<LobbyEntity["id"]> {
    const lobbyToLeave = await this.getLobbyToLeave({ userId });
    if (lobbyToLeave) {
      await this.seatManagerService.leave({ lobby: lobbyToLeave, userId });
    }

    const lobbyToJoin = await this.backupService.getLobbyOrThrow({ lobbyId });
    this.seatManagerService.take({ lobby: lobbyToJoin, userId });
    await this.backupService.updateLobby({ lobby: lobbyToJoin });

    return lobbyId;
  }

  private async getLobbyToLeave({
    userId,
  }: { userId: User["id"] }): Promise<LobbyEntity | undefined> {
    const lobbyIdToLeave = await this.repository.getUserLobby({ userId });
    if (!lobbyIdToLeave) {
      return;
    }

    try {
      return await this.backupService.getLobbyOrThrow({
        lobbyId: lobbyIdToLeave,
      });
    } catch {
      return undefined;
    }
  }
}
