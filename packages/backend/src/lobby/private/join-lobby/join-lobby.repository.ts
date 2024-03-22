import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class JoinLobbyRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

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
