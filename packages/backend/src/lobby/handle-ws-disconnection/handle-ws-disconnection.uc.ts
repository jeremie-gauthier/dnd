import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { ServerSocket } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import { HandleWsDisconnectionRepository } from "./handle-ws-disconnection.repository";

@Injectable()
export class HandleWsDisconnectionUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
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

    await Promise.all([
      this.leaveRooms(client),
      this.repository.forgetUser(userId),
    ]);

    await this.seatManagerService.leave({ userId });

    await client.leave(lobbyId);
  }

  private async leaveRooms(client: ServerSocket) {
    return await Promise.all(
      Array.from(client.rooms).map((room) => client.leave(room)),
    );
  }
}
