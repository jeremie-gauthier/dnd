import { ClientGameEvent } from "@dnd/shared";
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { ServerSocket, WsServer } from "src/types/socket.type";
import { EndPlayerTurnUseCase } from "./end-player-turn/end-player-turn.uc";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class StateMachinePrivateGateway {
  constructor(private readonly endPlayerTurnUseCase: EndPlayerTurnUseCase) {}

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
    await this.endPlayerTurnUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
    });
  }
}
