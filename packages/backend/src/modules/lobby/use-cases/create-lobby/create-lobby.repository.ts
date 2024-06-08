import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "../../infra/database/lobbies.repository";

@Injectable()
export class CreateLobbyRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public async createLobby(
    lobby: Omit<LobbyEntity, "id">,
  ): Promise<LobbyEntity> {
    return await this.lobbiesRepository.set(lobby);
  }
}
