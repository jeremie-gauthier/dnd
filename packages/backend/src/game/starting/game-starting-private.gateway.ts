import { ClientGameEvent } from "@dnd/shared";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { ServerSocket, WsServer } from "src/types/socket.type";
import type { ChangePositionInputDto } from "./private/change-position/change-position.dto";
import { ChangePositionUseCase } from "./private/change-position/change-position.uc";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class GameStartingPrivateGateway {
  constructor(private readonly changePositionUseCase: ChangePositionUseCase) {}

  @WebSocketServer()
  private readonly server: WsServer;

  private getMessageContext(client: ServerSocket) {
    return {
      server: this.server,
      client,
    };
  }

  @SubscribeMessage(ClientGameEvent.ChangeStartingPosition)
  public async changePosition(
    @MessageBody() changePositionInputDto: ChangePositionInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.changePositionUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      changePositionInputDto,
    });
  }
}
