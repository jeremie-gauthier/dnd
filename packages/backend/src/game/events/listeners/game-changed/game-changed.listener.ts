import { ServerGameEvent } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type { GameChangedPayload } from "../../emitters/game-changed.payload";
import { GameEvent } from "../../emitters/game-events.enum";
import type { GameChangedRepository } from "./game-changed.repository";

@Injectable()
export class GameChangedListener {
  constructor(private readonly repository: GameChangedRepository) {}

  @OnEvent(GameEvent.GameChanged)
  public async handler({ ctx, gameId }: GameChangedPayload) {
    const game = await this.repository.getGameById(gameId);
    if (!game) {
      return;
    }

    // TODO: hide entities that are not visible (traps)
    ctx.server.to(gameId).emit(ServerGameEvent.GameChangesDetected, {
      game,
    });
  }
}
