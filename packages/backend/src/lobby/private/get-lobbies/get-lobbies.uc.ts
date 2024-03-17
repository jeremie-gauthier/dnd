import { Injectable } from "@nestjs/common";
import type { UseCase } from "src/types/use-case.interface";
import type { GetLobbiesOutputDto } from "./get-lobbies.dto";
import type { GetLobbiesRepository } from "./get-lobbies.repository";

@Injectable()
export class GetLobbiesUseCase implements UseCase {
  constructor(private readonly repository: GetLobbiesRepository) {}

  public async execute(): Promise<GetLobbiesOutputDto> {
    const lobbies = await this.repository.getLobbies();

    return lobbies.map((lobby) => ({
      ...lobby,
      nbPlayers: lobby.players.length,
    }));
  }
}
