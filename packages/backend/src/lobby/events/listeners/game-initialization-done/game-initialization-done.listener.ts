import { LobbyEntityStatus, ServerLobbyEvent } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import type { GameInitializationDonePayload } from "src/game/events/emitters/game-initialization-done.payload";
import type { GameInitializationDoneRepository } from "./game-initialization-done.repository";

@Injectable()
export class GameInitializationDoneListener {
  constructor(private readonly repository: GameInitializationDoneRepository) {}

  @OnEvent(GameEvent.GameInitializationDone)
  public async handler({ ctx, game, lobbyId }: GameInitializationDonePayload) {
    const lobby = await this.repository.getLobbyById(lobbyId);
    if (!lobby) {
      return;
    }

    lobby.status = LobbyEntityStatus.GAME_STARTED;
    await this.repository.updateLobby(lobby);

    ctx.server
      .to(lobbyId)
      .emit(ServerLobbyEvent.GameInitializationDone, { game });
  }
}
