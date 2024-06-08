import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "../../infra/database/lobbies.repository";

@Injectable()
export class SeatManagerRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public async delLobbyById(lobbyId: LobbyEntity["id"]): Promise<void> {
    await this.lobbiesRepository.del(lobbyId);
  }
}
