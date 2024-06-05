import { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class BackupRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public getLobby({ lobbyId }: { lobbyId: LobbyEntity["id"] }) {
    return this.lobbiesRepository.getOne(lobbyId);
  }

  public async updateLobby({ lobby }: { lobby: LobbyEntity }) {
    await this.lobbiesRepository.update(lobby);
  }
}
