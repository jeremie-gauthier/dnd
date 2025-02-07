import { Inject, Injectable } from "@nestjs/common";
import type { UseCase } from "src/interfaces/use-case.interface";
import {
  LOBBY_REPOSITORY,
  LobbyRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class GetLobbiesUseCase implements UseCase {
  constructor(
    @Inject(LOBBY_REPOSITORY)
    private readonly lobbiesRepository: LobbyRepository,
  ) {}

  public async execute() {
    const lobbies = await this.lobbiesRepository.getMany();

    return {
      data: lobbies.map((lobby) => {
        const plainLobby = lobby.toPlain();

        return {
          ...plainLobby,
          nbPlayers: plainLobby.players.length,
        };
      }),
      count: lobbies.length,
    };
  }
}
