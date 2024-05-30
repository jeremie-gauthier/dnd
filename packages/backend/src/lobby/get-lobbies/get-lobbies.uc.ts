import { GetLobbiesOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { UseCase } from "src/types/use-case.interface";
import { GetLobbiesRepository } from "./get-lobbies.repository";

@Injectable()
export class GetLobbiesUseCase implements UseCase {
  constructor(private readonly repository: GetLobbiesRepository) {}

  public async execute(): Promise<GetLobbiesOutput> {
    const lobbies = await this.repository.getLobbies();

    return lobbies.map((lobby) => ({
      ...lobby,
      nbPlayers: lobby.players.length,
    }));
  }
}
