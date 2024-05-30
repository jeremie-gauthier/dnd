import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class PickHeroRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public getLobbyById(lobbyId: LobbyEntity["id"]): Promise<LobbyEntity | null> {
    return this.lobbiesRepository.getOne(lobbyId);
  }
}
