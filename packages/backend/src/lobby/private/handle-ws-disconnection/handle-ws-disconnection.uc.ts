import { Injectable } from '@nestjs/common';
import { MessageContext, ServerSocket } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { HandleWsDisconnectionRepository } from './handle-ws-disconnection.repository';

@Injectable()
export class HandleWsDisconnectionUseCase implements UseCase {
  constructor(private readonly repository: HandleWsDisconnectionRepository) {}

  public async execute(ctx: MessageContext): Promise<void> {
    const { userId } = ctx.client.data;
    const lobbyId = await this.repository.getCachedUserLobbyId(userId);
    if (!lobbyId) {
      return;
    }

    await Promise.all([
      this.leaveRooms(ctx.client),
      this.repository.forgetUser(userId),
      this.repository.removePlayerFromLobby({ ctx, userId, lobbyId }),
    ]);
  }

  private async leaveRooms(client: ServerSocket) {
    return await Promise.all(Array.from(client.rooms).map((room) => client.leave(room)));
  }
}
