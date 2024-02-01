import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/database/entities/user.entity';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { UserLeftLobbyPayload } from 'src/lobby/events/emitters/user-left-lobby.payload';
import { MessageContext } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { LeaveLobbyRepository } from './leave-lobby.repository';

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
    userId: User['id'];
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