import { GameEntity, LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { GamesRepository } from "src/redis/repositories/games.repository";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class GetUserGameStateRepository {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public getGameById({ gameId }: { gameId: GameEntity["id"] }) {
    return this.gamesRepository.getOne(gameId);
  }

  public getLobbyById({ lobbyId }: { lobbyId: LobbyEntity["id"] }) {
    return this.lobbiesRepository.getOne(lobbyId);
  }
}
