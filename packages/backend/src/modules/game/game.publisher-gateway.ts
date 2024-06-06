import { GameEntity, ServerGameEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import type { WsServer } from "src/interfaces/socket.interface";
import { GameEvent } from "./events/game-event.enum";
import { LogService } from "./services/log/log.service";
import { LoggableAction } from "./services/log/loggable-action.interface";
import { PlayerStateService } from "./services/player-state/player-state.service";

@WebSocketGateway()
export class GamePublisherGateway {
  constructor(
    private readonly playerStateService: PlayerStateService,
    private readonly logService: LogService,
  ) {}

  @WebSocketServer()
  private readonly server: WsServer;

  @OnEvent(GameEvent.PlayableEntityMoved)
  @OnEvent(GameEvent.DoorOpened)
  @OnEvent(GameEvent.PlayableEntityTurnEnded)
  @OnEvent(GameEvent.EnemiesSpawned)
  @OnEvent(GameEvent.InitiativesRerolled)
  @OnEvent(GameEvent.PlayableEntityTurnStarted)
  @OnEvent(GameEvent.EntityAttacked)
  @OnEvent(GameEvent.EntityTookDamage)
  @OnEvent(GameEvent.EntityDied)
  protected async gameLogHandler(payload: LoggableAction) {
    const log = this.logService.createLog(payload);
    if (!log) {
      return;
    }

    this.server.to(payload.game.id).emit(ServerGameEvent.GameLogCreated, log);
  }

  @OnEvent(GameEvent.GameInitializationDone)
  @OnEvent(GameEvent.GameUpdated)
  protected gameChangesHandler({ game }: { game: GameEntity }) {
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
