import { ClientGameEvent, GameEntity, ServerGameEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { ServerSocket, WsServer } from "src/types/socket.type";
import { GameEvent } from "../events/emitters/game-events.enum";
import { EndPlayerTurnUseCase } from "./end-player-turn/end-player-turn.uc";
import { PlayerStateService } from "./services/player-state/player-state.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class StateMachinePrivateGateway {
  constructor(
    private readonly endPlayerTurnUseCase: EndPlayerTurnUseCase,
    private readonly playerStateService: PlayerStateService,
  ) {}

  @WebSocketServer()
  private readonly server: WsServer;

  private getMessageContext(client: ServerSocket) {
    return {
      server: this.server,
      client,
    };
  }

  @SubscribeMessage(ClientGameEvent.PlayableEntityTurnEnds)
  public async endPlayerTurn(
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.endPlayerTurnUseCase.execute({ userId: client.data.userId });
  }

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
