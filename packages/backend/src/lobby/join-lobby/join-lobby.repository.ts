import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";
import { UsersRepository } from "src/redis/repositories/users.repository";

@Injectable()
export class JoinLobbyRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async getUserLobby({ userId }: { userId: User["id"] }) {
    return await this.usersRepository.get(userId);
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

  public async getLobbyById(
    lobbyId: LobbyEntity["id"],
  ): Promise<LobbyEntity | null> {
    return await this.lobbiesRepository.getOne(lobbyId);
  }

  public async addPlayerToLobby({
    player,
    lobbyId,
  }: {
    lobbyId: LobbyEntity["id"];
    player: LobbyEntity["players"][number];
  }) {
    await this.lobbiesRepository.client.json.arrAppend(
      LobbiesRepository.KEY,
      `${lobbyId}.players`,
      player,
    );
  }
}
