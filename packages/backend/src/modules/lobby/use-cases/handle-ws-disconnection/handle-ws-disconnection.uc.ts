import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import type { ServerSocket } from "src/interfaces/socket.interface";
import type { UseCase } from "src/interfaces/use-case.interface";
import { SeatManagerService } from "src/modules/lobby/domain/seat-manager/seat-manager.service";

@Injectable()
export class HandleWsDisconnectionUseCase implements UseCase {
  constructor(private readonly seatManagerService: SeatManagerService) {}

  public async execute({ client }: { client: ServerSocket }): Promise<void> {
    const { userId } = client.data;

    await Promise.all([this.leaveLobby({ userId }), this.leaveRooms(client)]);
  }

  private async leaveRooms(client: ServerSocket) {
    return await Promise.all(
      Array.from(client.rooms).map((room) => client.leave(room)),
    );
  }

  private async leaveLobby({ userId }: { userId: User["id"] }) {
    try {
      const lobbyToLeave = await this.seatManagerService.getUserLobby({
        userId,
      });
      if (lobbyToLeave) {
        await this.seatManagerService.leave({ lobby: lobbyToLeave, userId });
      }
    } catch {}
  }
}
