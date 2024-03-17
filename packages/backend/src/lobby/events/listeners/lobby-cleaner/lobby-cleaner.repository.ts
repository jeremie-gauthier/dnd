import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class LobbyCleanerRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public async getLobbyById(
    lobbyId: LobbyEntity["id"],
  ): Promise<LobbyEntity | null> {
    return await this.lobbiesRepository.getOne(lobbyId);
  }

  public async delLobbyById(lobbyId: LobbyEntity["id"]): Promise<void> {
    await this.lobbiesRepository.del(lobbyId);
  }
}
