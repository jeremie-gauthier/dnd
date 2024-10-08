import { GetLobbyOutput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import type { UseCase } from "src/interfaces/use-case.interface";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class GetLobbyUseCase implements UseCase {
  constructor(
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async execute({
    lobbyId,
  }: { lobbyId: string }): Promise<GetLobbyOutput> {
    const lobby = await this.lobbiesRepository.getOneOrThrow({ lobbyId });
    const plainLobby = lobby.toPlain();
    return {
      ...plainLobby,
      players: plainLobby.players.map(({ status, ...player }) => ({
        ...player,
        isReady: status,
        heroesSelected: plainLobby.playableCharacters
          .filter((pc) => pc.pickedBy === player.userId)
          .map((pc) => pc.id),
      })),
      status: plainLobby.status,
    };
  }
}
