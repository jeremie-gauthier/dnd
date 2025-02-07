import type { TogglePlayerReadyStateInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import type { UseCase } from "src/interfaces/use-case.interface";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import {
  LOBBY_REPOSITORY,
  LobbyRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class TogglePlayerReadyStateUseCase implements UseCase {
  constructor(
    @Inject(LOBBY_REPOSITORY)
    private readonly lobbiesRepository: LobbyRepository,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: TogglePlayerReadyStateInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.lobbiesRepository.getOneOrThrow({ lobbyId });

    lobby.toggleUserStatus({ userId });
    await this.lobbiesRepository.update({ lobby });
  }
}
