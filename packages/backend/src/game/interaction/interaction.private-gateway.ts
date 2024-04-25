import { ClientGameEvent } from "@dnd/shared";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { ServerSocket, WsServer } from "src/types/socket.type";
import { OpenDoorInputDto } from "./open-door/open-door.dto";
import { OpenDoorUseCase } from "./open-door/open-door.uc";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class InteractionPrivateGateway {
  constructor(private readonly openDoorUseCase: OpenDoorUseCase) {}

  @WebSocketServer()
  private readonly server: WsServer;

  private getMessageContext(client: ServerSocket) {
    return {
      server: this.server,
      client,
    };
  }

  @SubscribeMessage(ClientGameEvent.PlayableEntityOpenDoor)
  public async openDoor(
    @MessageBody() openDoorInputDto: OpenDoorInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.openDoorUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      ...openDoorInputDto,
    });
  }
}
