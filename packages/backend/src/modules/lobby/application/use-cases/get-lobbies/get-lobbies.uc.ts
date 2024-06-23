import { GetLobbiesOutput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import type { UseCase } from "src/interfaces/use-case.interface";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class GetLobbiesUseCase implements UseCase {
  constructor(
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async execute(): Promise<GetLobbiesOutput> {
    const lobbies = await this.lobbiesRepository.getMany();

    return lobbies.map((lobby) => ({
      ...lobby.toPlain(),
      nbPlayers: lobby.players.length,
    }));
  }
}
