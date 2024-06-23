import { StartGameInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { HostRequestedGameStartPayload } from "src/modules/shared/events/lobby/host-requested-game-start.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class StartGameUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: StartGameInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.lobbiesRepository.getDomainOneOrThrow({
      lobbyId: new UniqueId(lobbyId),
    });

    lobby.gameInitializationStarted({ userId: new UniqueId(userId) });
    await this.lobbiesRepository.update({ lobby });

    this.eventEmitter.emitAsync(
      LobbyEvent.HostRequestedGameStart,
      new HostRequestedGameStartPayload({ userId, lobby }),
    );
  }
}
