import { GameEntity, GetUserGameStateOutput, LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { PlayerStateService } from "../services/player-state/player-state.service";
import { GetUserGameStateRepository } from "./get-user-game-state.repository";

@Injectable()
export class GetUserGameStateUseCase implements UseCase {
  constructor(
    private readonly repository: GetUserGameStateRepository,
    private readonly playerStateService: PlayerStateService,
  ) {}

  public async execute({
    userId,
    gameId,
  }: {
    userId: User["id"];
    gameId: GameEntity["id"];
  }): Promise<GetUserGameStateOutput> {
    const lobby = await this.repository.getLobbyById({ lobbyId: gameId });
    this.mustBeInTheLobby({ userId, lobby });

    const game = await this.repository.getGameById({ gameId });
    this.mustExecute(game);

    const playerGameState = this.playerStateService.getPlayerState({
      game,
      userId,
    });

    return playerGameState;
  }

  private mustBeInTheLobby({
    userId,
    lobby,
  }: { userId: User["id"]; lobby: LobbyEntity | null }) {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    if (lobby.players.every((player) => player.userId !== userId)) {
      throw new ForbiddenException("User does not belong to this lobby");
    }
  }

  private mustExecute(game: GameEntity | null): asserts game is GameEntity {
    if (!game) {
      throw new NotFoundException("Game not found");
    }
  }
}
