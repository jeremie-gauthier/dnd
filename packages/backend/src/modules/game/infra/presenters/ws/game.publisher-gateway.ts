import { ServerGameEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import type { WsServer } from "src/interfaces/socket.interface";
import { GetUserGameStateUseCase } from "src/modules/game/application/use-cases/get-user-game-state/get-user-game-state.uc";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameWonPayload } from "src/modules/shared/events/game/game-won.payload";
import { LogService } from "../../../domain/log/log.service";
import { LoggableAction } from "../../../domain/log/loggable-action.interface";
import { GamePresenter } from "../services/game.presenter";
import { LogPresenter } from "../services/log.presenter";

@WebSocketGateway()
export class GamePublisherGateway {
  constructor(
    private readonly logService: LogService,
    private readonly getUserGameStateUseCase: GetUserGameStateUseCase,
    private readonly gamePresenter: GamePresenter,
    private readonly logPresenter: LogPresenter,
  ) {}

  @WebSocketServer()
  private readonly server: WsServer;

  @OnEvent(GameEvent.PlayableEntityMoved)
  @OnEvent(GameEvent.DoorOpened)
  @OnEvent(GameEvent.PlayableEntityTurnEnded)
  @OnEvent(GameEvent.MonsterSpawned)
  @OnEvent(GameEvent.InitiativesRerolled)
  @OnEvent(GameEvent.PlayableEntityTurnStarted)
  @OnEvent(GameEvent.PlayableEntityAttacked)
  @OnEvent(GameEvent.PlayableEntityTookDamage)
  @OnEvent(GameEvent.EntityDied)
  @OnEvent(GameEvent.GameWon)
  @OnEvent(GameEvent.ChestTrapTriggered)
  @OnEvent(GameEvent.TrapTriggered)
  @OnEvent(GameEvent.PlayableEntityOpenedChest)
  @OnEvent(GameEvent.PlayableEntityDrankPotion)
  protected async gameLogHandler(payload: LoggableAction) {
    const log = this.logService.createLog(payload);
    if (!log) {
      return;
    }

    const formattedLog = await this.logPresenter.toView(log);

    this.server
      .to(payload.game.id)
      .emit(ServerGameEvent.GameLogCreated, formattedLog);
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
      const gameView = await this.gamePresenter.toView({
        ...game,
        board: playerGameState.game.board,
      });

      this.server.to(userId).emit(ServerGameEvent.GameChangesDetected, {
        ...playerGameState,
        game: gameView,
      });
    }
  }

  @OnEvent(GameEvent.GameWon)
  protected async gameEnds({ name, game }: GameWonPayload) {
    const userIds = new Set([
      game.gameMaster.userId,
      ...game.playableEntities.values.map(
        (playableEntity) => playableEntity.playedByUserId,
      ),
    ]);

    const gameConditionsStatus =
      name === GameEvent.GameWon ? "victory" : "defeat";
    for (const userId of userIds) {
      this.server
        .to(userId)
        .emit(ServerGameEvent.GameEnds, { gameConditionsStatus });
    }
  }
}
