import { DiscardPlayableCharacterInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class DiscardPlayableCharacterUseCase implements UseCase {
  constructor(
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
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
