import { ServerLobbyEvent } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import type { GameInitializationStartedPayload } from "src/game/events/emitters/game-initialization-started.payload";

@Injectable()
export class GameInitializationStartedListener {
  @OnEvent(GameEvent.GameInitializationStarted)
  public async handler({ ctx, lobbyId }: GameInitializationStartedPayload) {
    ctx.server.to(lobbyId).emit(ServerLobbyEvent.GameInitializationStarted);
  }
}
