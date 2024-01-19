import { Injectable } from '@nestjs/common';
import { UserJoinedLobbyPayload } from 'src/lobby/events/emitters/user-joined-lobby.payload';
import { UsersRepository } from 'src/redis/repositories/users.repository';

@Injectable()
export class TrackUserAccrossLobbiesRepository {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async saveUserLobby({ userId, lobbyId }: UserJoinedLobbyPayload) {
    await this.usersRepository.set({ userId, lobbyId });
  }
}
