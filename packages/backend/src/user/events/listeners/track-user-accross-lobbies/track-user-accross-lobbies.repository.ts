import { Injectable } from "@nestjs/common";
import type { UserJoinedLobbyPayload } from "src/lobby/events/emitters/user-joined-lobby.payload";
import type { UserLeftLobbyPayload } from "src/lobby/events/emitters/user-left-lobby.payload";
import { UsersRepository } from "src/redis/repositories/users.repository";

@Injectable()
export class TrackUserAccrossLobbiesRepository {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async saveUserLobby({ userId, lobby }: UserJoinedLobbyPayload) {
    await this.usersRepository.set({ userId, lobbyId: lobby.id });
  }

  public async removeUserLobby({ userId }: UserLeftLobbyPayload) {
    await this.usersRepository.del(userId);
  }
}
