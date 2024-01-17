import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { LobbiesRepository } from 'src/redis/repositories/lobbies.repository';
import { UsersRepository } from 'src/redis/repositories/users.repository';

@Injectable()
export class HandleWsDisconnectionRepository {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async forgetUser(userId: User['id']): Promise<void> {
    const userLobbyId = await this.usersRepository.get(userId);
    if (!userLobbyId) {
      return;
    }

    await Promise.all([
      this.usersRepository.del(userId),
      this.removePlayerFromLobby(userId, userLobbyId),
    ]);
  }

  private async removePlayerFromLobby(
    userId: User['id'],
    lobbyId: LobbyEntity['id'],
  ): Promise<void> {
    const lobby = await this.lobbiesRepository.getOne(lobbyId);
    if (!lobby) {
      return;
    }

    const players = lobby.players.filter((player) => player.userId !== userId);

    if (players.length === 0) {
      await this.lobbiesRepository.del(lobbyId);
    } else {
      await this.lobbiesRepository.update({
        ...lobby,
        players,
      });
    }
  }
}
