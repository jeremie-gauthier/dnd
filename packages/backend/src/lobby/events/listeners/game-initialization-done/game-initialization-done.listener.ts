import { LobbyEntityStatus } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import type { GameInitializationDonePayload } from "src/game/events/emitters/game-initialization-done.payload";
import { GameReadyPayload } from "../../emitters/game-ready.payload";
import { LobbyChangedPayload } from "../../emitters/lobby-changed.payload";
import { LobbyEvent } from "../../emitters/lobby-events.enum";
import { GameInitializationDoneRepository } from "./game-initialization-done.repository";

@Injectable()
export class GameInitializationDoneListener {
  constructor(
    private readonly repository: GameInitializationDoneRepository,
    private readonly emitter: EventEmitter2,
  ) {}

  @OnEvent(GameEvent.GameInitializationDone)
  public async handler({ game, lobby }: GameInitializationDonePayload) {
    lobby.status = LobbyEntityStatus.GAME_STARTED;
    await this.repository.updateLobby(lobby);

    this.emitter.emitAsync(
      LobbyEvent.LobbyChanged,
      new LobbyChangedPayload({ lobby }),
    );

    this.emitter.emitAsync(
      LobbyEvent.GameReady,
      new GameReadyPayload({ lobby, game }),
    );
  }
}
