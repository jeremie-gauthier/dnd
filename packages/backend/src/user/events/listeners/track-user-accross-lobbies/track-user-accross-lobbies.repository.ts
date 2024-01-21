import { Injectable } from '@nestjs/common';
import { UserForceLeftLobbyPayload } from 'src/lobby/events/emitters/user-force-left-lobby.payload';
import { UserJoinedLobbyPayload } from 'src/lobby/events/emitters/user-joined-lobby.payload';
import { UserLeftLobbyPayload } from 'src/lobby/events/emitters/user-left-lobby.payload';
import { UsersRepository } from 'src/redis/repositories/users.repository';

@Injectable()
export class TrackUserAccrossLobbiesRepository {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async saveUserLobby({ userId, lobbyId }: UserJoinedLobbyPayload) {
    await this.usersRepository.set({ userId, lobbyId });
  }

  public async removeUserLobby({ userId }: UserLeftLobbyPayload | UserForceLeftLobbyPayload) {
    await this.usersRepository.del(userId);
  }
}
