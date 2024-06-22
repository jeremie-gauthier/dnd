import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import type { GameInitializationDonePayload } from "src/modules/game/events/game-initialization-done.payload";
import { GameReadyPayload } from "src/modules/shared/events/lobby/game-ready.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class GameInitializationDoneUseCase implements UseCase {
  constructor(
    private readonly emitter: EventEmitter2,
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async execute(payload: GameInitializationDonePayload) {
    const { lobby } = payload;

    lobby.gameInitializationDone();
    await this.lobbiesRepository.update({ lobby });

    this.emitter.emitAsync(LobbyEvent.GameReady, new GameReadyPayload(payload));
  }
}
