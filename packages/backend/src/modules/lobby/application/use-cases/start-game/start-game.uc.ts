import { StartGameInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { UseCase } from "src/interfaces/use-case.interface";
import { HostRequestedGameStartPayload } from "src/modules/shared/events/lobby/host-requested-game-start.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import {
  LOBBY_REPOSITORY,
  LobbyRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class StartGameUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(LOBBY_REPOSITORY)
    private readonly lobbiesRepository: LobbyRepository,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: StartGameInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.lobbiesRepository.getOneOrThrow({ lobbyId });

    lobby.gameInitializationStarted({ userId });
    await this.lobbiesRepository.update({ lobby });

    this.eventEmitter.emitAsync(
      LobbyEvent.HostRequestedGameStart,
      new HostRequestedGameStartPayload({ userId, lobby: lobby.toPlain() }),
    );
  }
}
