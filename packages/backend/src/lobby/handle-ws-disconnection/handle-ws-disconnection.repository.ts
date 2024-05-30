import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";
import { UsersRepository } from "src/redis/repositories/users.repository";

@Injectable()
export class HandleWsDisconnectionRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async getCachedUserLobbyId(
    userId: User["id"],
  ): Promise<LobbyEntity["id"] | undefined> {
    return await this.usersRepository.get(userId);
  }

  public async getLobbyById({
    lobbyId,
  }: { lobbyId: LobbyEntity["id"] }): Promise<LobbyEntity | null> {
    return await this.lobbiesRepository.getOne(lobbyId);
  }

  public async forgetUser(userId: User["id"]): Promise<void> {
    await this.usersRepository.del(userId);
  }
}
