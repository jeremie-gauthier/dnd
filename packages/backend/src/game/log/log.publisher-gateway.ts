import { ServerGameEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import type { WsServer } from "src/types/socket.type";
import { GameEvent } from "../events/emitters/game-events.enum";
import { LogService } from "./services/log/log.service";
import { LoggableAction } from "./services/log/loggable-action.interface";

@WebSocketGateway()
export class LogPublisherGateway {
  constructor(private readonly logService: LogService) {}

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
}
