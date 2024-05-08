import { LobbyEntityStatus, ServerLobbyEvent } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import type { GameInitializationDonePayload } from "src/game/events/emitters/game-initialization-done.payload";
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
  public async handler({ ctx, game, lobbyId }: GameInitializationDonePayload) {
    const lobby = await this.repository.getLobbyById(lobbyId);
    if (!lobby) {
      return;
    }

    lobby.status = LobbyEntityStatus.GAME_STARTED;
    await this.repository.updateLobby(lobby);

    // TODO: tmp - need refactoring to properly remove these ctx
    if (!ctx) return;

    this.emitter.emitAsync(
      LobbyEvent.LobbyChanged,
      new LobbyChangedPayload({ ctx, lobbyId }),
    );

    ctx.server
      .to(lobbyId)
      .emit(ServerLobbyEvent.GameInitializationDone, { game });
  }
}
