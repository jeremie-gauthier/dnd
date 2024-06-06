import type { GameEntity, LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { GamesRepository } from "src/redis/repositories/games.repository";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class SeatManagerRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    private readonly gamesRepository: GamesRepository,
  ) {}

  public async delLobbyById(lobbyId: LobbyEntity["id"]): Promise<void> {
    await this.lobbiesRepository.del(lobbyId);
  }

  public async delGameById({
    gameId,
  }: { gameId: GameEntity["id"] }): Promise<void> {
    await this.gamesRepository.del(gameId);
  }
}
