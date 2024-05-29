import { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";
import { UsersRepository } from "src/redis/repositories/users.repository";

@Injectable()
export class LeaveLobbyRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async getUserLobby({
    userId,
  }: { userId: User["id"] }): Promise<string | undefined> {
    return await this.usersRepository.get(userId);
  }

  public async getLobbyById({
    lobbyId,
  }: { lobbyId: LobbyEntity["id"] }): Promise<LobbyEntity | null> {
    return await this.lobbiesRepository.getOne(lobbyId);
  }

  public async updateLobby({ lobby }: { lobby: LobbyEntity }) {
    await this.lobbiesRepository.update(lobby);
  }
}
