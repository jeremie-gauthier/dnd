import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/database/entities/user.entity';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { UserForceLeftLobbyPayload } from 'src/lobby/events/emitters/user-force-left-lobby.payload';
import { LobbiesRepository } from 'src/redis/repositories/lobbies.repository';
import { UsersRepository } from 'src/redis/repositories/users.repository';
import { MessageContext } from 'src/types/socket.type';

@Injectable()
export class HandleWsDisconnectionRepository {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly usersRepository: UsersRepository,
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async getCachedUserLobbyId(userId: User['id']): Promise<LobbyEntity['id'] | undefined> {
    return await this.usersRepository.get(userId);
  }

  public async forgetUser(userId: User['id']): Promise<void> {
    await this.usersRepository.del(userId);
  }

  public async removePlayerFromLobby({
    ctx,
    userId,
    lobbyId,
  }: {
    ctx: MessageContext;
    userId: User['id'];
    lobbyId: LobbyEntity['id'];
  }): Promise<void> {
    const lobby = await this.lobbiesRepository.getOne(lobbyId);
    if (!lobby) {
      return;
    }

    await this.lobbiesRepository.update({
      ...lobby,
      players: lobby.players.filter((player) => player.userId !== userId),
    });

    this.eventEmitter.emit(
      LobbyEvent.UserForceLeftLobby,
      new UserForceLeftLobbyPayload({
        ctx,
        userId,
        lobbyId,
      }),
    );
  }
}
