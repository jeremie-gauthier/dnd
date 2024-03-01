import { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";
import { UsersRepository } from "src/redis/repositories/users.repository";

@Injectable()
export class HandleWsDisconnectionRepository {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async getCachedUserLobbyId(
    userId: User["id"],
  ): Promise<LobbyEntity["id"] | undefined> {
    return await this.usersRepository.get(userId);
  }

  public async forgetUser(userId: User["id"]): Promise<void> {
    await this.usersRepository.del(userId);
  }

  public async removePlayerFromLobby({
    userId,
    lobbyId,
  }: {
    userId: User["id"];
    lobbyId: LobbyEntity["id"];
  }): Promise<void> {
    const lobby = await this.lobbiesRepository.getOne(lobbyId);
    if (!lobby) {
      return;
    }

    await this.lobbiesRepository.update({
      ...lobby,
      players: lobby.players.filter((player) => player.userId !== userId),
    });
  }
}
