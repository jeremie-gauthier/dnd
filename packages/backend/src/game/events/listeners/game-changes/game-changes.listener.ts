import { GameEntity, ServerGameEvent } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PlayerStateService } from "src/game/state-machine/services/player-state/player-state.service";
import { MessageContext } from "src/types/socket.type";
import { GameEvent } from "../../emitters/game-events.enum";

@Injectable()
export class GameChangesListener {
  constructor(private readonly playerStateService: PlayerStateService) {}

  @OnEvent(GameEvent.GameChanged)
  @OnEvent(GameEvent.GameInitializationDone)
  public async handler({
    ctx,
    game,
  }: { ctx: MessageContext; game: GameEntity }) {
    const playableEntities = Object.values(game.playableEntities);
    const userIds = new Set(
      playableEntities.map((playableEntity) => playableEntity.playedByUserId),
    );

    for (const userId of userIds) {
      const playerGameState = this.playerStateService.getPlayerState({
        game,
        userId,
      });

      ctx.server
        .to(userId)
        .emit(ServerGameEvent.GameChangesDetected, playerGameState);
    }
  }
}
