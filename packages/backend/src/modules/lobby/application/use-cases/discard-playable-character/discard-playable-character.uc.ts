import { DiscardPlayableCharacterInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import type { UseCase } from "src/interfaces/use-case.interface";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import {
  LOBBY_REPOSITORY,
  LobbyRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class DiscardPlayableCharacterUseCase implements UseCase {
  constructor(
    @Inject(LOBBY_REPOSITORY)
    private readonly lobbiesRepository: LobbyRepository,
  ) {}

  public async execute({
    playableCharacterId,
    userId,
    lobbyId,
  }: DiscardPlayableCharacterInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.lobbiesRepository.getOneOrThrow({ lobbyId });

    lobby.discardPlayableCharacter({ playableCharacterId, userId });
    await this.lobbiesRepository.update({ lobby });
  }
}
