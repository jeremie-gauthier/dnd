import { LobbyEntityStatus } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import type { GameInitializationDonePayload } from "src/modules/game/events/game-initialization-done.payload";
import { GameReadyPayload } from "src/modules/lobby/events/game-ready.payload";
import { LobbyEvent } from "src/modules/lobby/events/lobby-event.enum";
import { BackupService } from "src/modules/lobby/services/backup/backup.service";

@Injectable()
export class GameInitializationDoneUseCase implements UseCase {
  constructor(
    private readonly emitter: EventEmitter2,
    private readonly backupService: BackupService,
  ) {}

  public async execute({ game, lobby }: GameInitializationDonePayload) {
    lobby.status = LobbyEntityStatus.GAME_STARTED;
    await this.backupService.updateLobby({ lobby });

    this.emitter.emitAsync(
      LobbyEvent.GameReady,
      new GameReadyPayload({ lobby, game }),
    );
  }
}
