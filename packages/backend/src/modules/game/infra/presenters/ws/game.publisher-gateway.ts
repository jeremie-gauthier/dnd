import { ServerGameEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import type { WsServer } from "src/interfaces/socket.interface";
import { GetUserGameStateUseCase } from "src/modules/game/application/use-cases/get-user-game-state/get-user-game-state.uc";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { LogService } from "../../../domain/log/log.service";
import { LoggableAction } from "../../../domain/log/loggable-action.interface";
import { GamePresenter } from "../services/game.presenter";

@WebSocketGateway()
export class GamePublisherGateway {
  constructor(
    private readonly logService: LogService,
    private readonly getUserGameStateUseCase: GetUserGameStateUseCase,
    private readonly presenter: GamePresenter,
  ) {}

  @WebSocketServer()
  private readonly server: WsServer;

  @OnEvent(GameEvent.PlayableEntityMoved)
  @OnEvent(GameEvent.DoorOpened)
  @OnEvent(GameEvent.PlayableEntityTurnEnded)
  @OnEvent(GameEvent.MonstersSpawned)
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
  protected async gameChangesHandler({
    game,
  }: { game: ReturnType<Game["toPlain"]> }) {
    const userIds = new Set([
      game.gameMaster.userId,
      ...game.playableEntities.values.map(
        (playableEntity) => playableEntity.playedByUserId,
      ),
    ]);

    for (const userId of userIds) {
      const playerGameState = await this.getUserGameStateUseCase.execute({
        gameId: game.id,
        userId,
      });
      const gameView = await this.presenter.toView(game);

      return {
        ...playerGameState,
        game: gameView,
      };
    }
  }
}
