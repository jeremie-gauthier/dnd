import { ClientGameEvent } from "@dnd/shared";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { ServerSocket, WsServer } from "src/types/socket.type";
import { PlayableEntityMoveInputDto } from "./playable-entity-move/playable-entity-move.dto";
import { PlayableEntityMoveUseCase } from "./playable-entity-move/playable-entity-move.uc";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class MovesPrivateGateway {
  constructor(
    private readonly playableEntityMoveUseCase: PlayableEntityMoveUseCase,
  ) {}

  @WebSocketServer()
  private readonly server: WsServer;

  private getMessageContext(client: ServerSocket) {
    return {
      server: this.server,
      client,
    };
  }

  @SubscribeMessage(ClientGameEvent.PlayableEntityMoves)
  public async movePlayableEntity(
    @MessageBody() playableEntityMoveInputDto: PlayableEntityMoveInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.playableEntityMoveUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      ...playableEntityMoveInputDto,
    });
  }
}
