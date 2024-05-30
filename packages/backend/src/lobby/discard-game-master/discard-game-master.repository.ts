import { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class DiscardGameMasterRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public getLobbyById({
    lobbyId,
  }: { lobbyId: LobbyEntity["id"] }): Promise<LobbyEntity | null> {
    return this.lobbiesRepository.getOne(lobbyId);
  }
}
