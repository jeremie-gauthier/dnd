import type { PickPlayableCharacterInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";

import { UniqueId } from "src/modules/shared/domain/unique-id";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class PickPlayableCharacterUseCase implements UseCase {
  constructor(
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async execute({
    userId,
    lobbyId,
    playableCharacterId,
  }: PickPlayableCharacterInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = (
      await this.lobbiesRepository.getOneOrThrow({
        lobbyId: new UniqueId(lobbyId),
      })
    ).toDomain();

    lobby.pickPlayableCharacter({
      playableCharacterId: new UniqueId(playableCharacterId),
      userId: new UniqueId(userId),
    });
    await this.lobbiesRepository.update({ lobby });
  }
}
