import { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { ServerSocket } from "src/interfaces/socket.interface";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "src/modules/lobby/domain/backup/backup.service";
import { SeatManagerService } from "src/modules/lobby/domain/seat-manager/seat-manager.service";
import { HandleWsDisconnectionRepository } from "./handle-ws-disconnection.repository";

@Injectable()
export class HandleWsDisconnectionUseCase implements UseCase {
  constructor(
    private readonly repository: HandleWsDisconnectionRepository,
    private readonly seatManagerService: SeatManagerService,
    private readonly backupService: BackupService,
  ) {}

  public async execute({ client }: { client: ServerSocket }): Promise<void> {
    const { userId } = client.data;
    client.leave(userId);

    const lobbyId = await this.repository.getCachedUserLobbyId(userId);
    if (!lobbyId) {
      return;
    }

    const [lobbyToLeave] = await Promise.all([
      this.getLobbyToLeave({ lobbyId }),
      this.leaveRooms(client),
      this.repository.forgetUser(userId),
    ]);

    if (lobbyToLeave) {
      await this.seatManagerService.leave({ lobby: lobbyToLeave, userId });
    }

    await client.leave(lobbyId);
  }

  private async leaveRooms(client: ServerSocket) {
    return await Promise.all(
      Array.from(client.rooms).map((room) => client.leave(room)),
    );
  }

  private async getLobbyToLeave({
    lobbyId,
  }: { lobbyId: LobbyEntity["id"] }): Promise<LobbyEntity | undefined> {
    try {
      return await this.backupService.getLobbyOrThrow({ lobbyId });
    } catch {
      return undefined;
    }
  }
}
