import { Injectable } from "@nestjs/common";
import type { EventEmitter2 } from "@nestjs/event-emitter";
import type { User } from "src/database/entities/user.entity";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import { UserLeftLobbyPayload } from "src/lobby/events/emitters/user-left-lobby.payload";
import type { MessageContext } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import type { LeaveLobbyRepository } from "./leave-lobby.repository";

@Injectable()
export class LeaveLobbyUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: LeaveLobbyRepository,
  ) {}

  public async execute({
    ctx,
    userId,
  }: {
    ctx: MessageContext;
    userId: User["id"];
  }): Promise<void> {
    const lobbyId = await this.repository.getUserLobby(userId);
    if (!lobbyId) {
      return;
    }

    await this.repository.removePlayerFromLobby({ userId, lobbyId });

    await this.eventEmitter.emitAsync(
      LobbyEvent.UserLeftLobby,
      new UserLeftLobbyPayload({ ctx, userId, lobbyId }),
    );
  }
}
