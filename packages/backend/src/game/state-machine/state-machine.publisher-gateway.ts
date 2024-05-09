import { GameEntity, ServerGameEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import type { WsServer } from "src/types/socket.type";
import { GameEvent } from "../events/emitters/game-events.enum";
import { PlayerStateService } from "./services/player-state/player-state.service";

@WebSocketGateway()
export class StateMachinePublisherGateway {
  constructor(private readonly playerStateService: PlayerStateService) {}

  @WebSocketServer()
  private readonly server: WsServer;

  @OnEvent(GameEvent.EnemiesSpawned)
  @OnEvent(GameEvent.DoorOpened)
  @OnEvent(GameEvent.PlayableEntityMoved)
  @OnEvent(GameEvent.PlayableEntityTurnEnded)
  @OnEvent(GameEvent.GameInitializationDone)
  protected async gameChangesHandler({ game }: { game: GameEntity }) {
    const playableEntities = Object.values(game.playableEntities);
    const userIds = new Set([
      game.gameMaster.userId,
      ...playableEntities.map(
        (playableEntity) => playableEntity.playedByUserId,
      ),
    ]);

    for (const userId of userIds) {
      const playerGameState = this.playerStateService.getPlayerState({
        game,
        userId,
      });

      this.server
        .to(userId)
        .emit(ServerGameEvent.GameChangesDetected, playerGameState);
    }
  }
}
