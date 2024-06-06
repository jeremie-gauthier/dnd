import { LobbyEntityStatus } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { GameEvent } from "src/game/events/emitters/game-event.enum";
import type { GameInitializationDonePayload } from "src/game/events/emitters/game-initialization-done.payload";
import { BackupService } from "src/lobby/services/backup/backup.service";
import { GameReadyPayload } from "../../emitters/game-ready.payload";
import { LobbyEvent } from "../../emitters/lobby-event.enum";

@Injectable()
export class GameInitializationDoneListener {
  constructor(
    private readonly emitter: EventEmitter2,
    private readonly backupService: BackupService,
  ) {}

  @OnEvent(GameEvent.GameInitializationDone)
  public async handler({ game, lobby }: GameInitializationDonePayload) {
    lobby.status = LobbyEntityStatus.GAME_STARTED;
    await this.backupService.updateLobby({ lobby });

    this.emitter.emitAsync(
      LobbyEvent.GameReady,
      new GameReadyPayload({ lobby, game }),
    );
  }
}
