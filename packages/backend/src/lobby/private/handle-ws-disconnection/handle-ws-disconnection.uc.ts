import { Injectable } from "@nestjs/common";
import type { EventEmitter2 } from "@nestjs/event-emitter";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import { UserForceLeftLobbyPayload } from "src/lobby/events/emitters/user-force-left-lobby.payload";
import type { MessageContext, ServerSocket } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import type { HandleWsDisconnectionRepository } from "./handle-ws-disconnection.repository";

@Injectable()
export class HandleWsDisconnectionUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: HandleWsDisconnectionRepository,
  ) {}

  public async execute(ctx: MessageContext): Promise<void> {
    const { userId } = ctx.client.data;
    const lobbyId = await this.repository.getCachedUserLobbyId(userId);
    if (!lobbyId) {
      return;
    }

    await Promise.all([
      this.leaveRooms(ctx.client),
      this.repository.forgetUser(userId),
      this.repository.removePlayerFromLobby({ userId, lobbyId }),
    ]);

    // made synchronous to avoid potential side effects
    this.eventEmitter.emit(
      LobbyEvent.UserForceLeftLobby,
      new UserForceLeftLobbyPayload({
        ctx,
        userId,
        lobbyId,
      }),
    );
  }

  private async leaveRooms(client: ServerSocket) {
    return await Promise.all(
      Array.from(client.rooms).map((room) => client.leave(room)),
    );
  }
}
