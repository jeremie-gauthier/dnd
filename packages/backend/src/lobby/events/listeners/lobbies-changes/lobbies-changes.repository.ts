import { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class LobbiesChangesRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public async getLobbyById(
    lobbyId: LobbyEntity["id"],
  ): Promise<LobbyEntity | null> {
    return await this.lobbiesRepository.getOne(lobbyId);
  }
}
