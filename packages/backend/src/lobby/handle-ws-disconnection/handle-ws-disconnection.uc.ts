import { Injectable } from "@nestjs/common";
import type { ServerSocket } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import { HandleWsDisconnectionRepository } from "./handle-ws-disconnection.repository";

@Injectable()
export class HandleWsDisconnectionUseCase implements UseCase {
  constructor(
    private readonly repository: HandleWsDisconnectionRepository,
    private readonly seatManagerService: SeatManagerService,
  ) {}

  public async execute(client: ServerSocket): Promise<void> {
    const { userId } = client.data;
    client.leave(userId);

    const lobbyId = await this.repository.getCachedUserLobbyId(userId);
    if (!lobbyId) {
      return;
    }

    const [lobbyToLeave] = await Promise.all([
      this.repository.getLobbyById({ lobbyId }),
      this.leaveRooms(client),
      this.repository.forgetUser(userId),
    ]);

    if (lobbyToLeave) {
      this.seatManagerService.leave({ lobby: lobbyToLeave, userId });
      await this.repository.updateLobby({ lobby: lobbyToLeave });
    }

    await client.leave(lobbyId);
  }

  private async leaveRooms(client: ServerSocket) {
    return await Promise.all(
      Array.from(client.rooms).map((room) => client.leave(room)),
    );
  }
}
