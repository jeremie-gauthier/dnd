import { ClientGameEvent } from "@dnd/shared";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import type { ServerSocket } from "src/types/socket.type";
import { OpenDoorInputDto } from "./open-door/open-door.dto";
import { OpenDoorUseCase } from "./open-door/open-door.uc";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class InteractionPrivateGateway {
  constructor(private readonly openDoorUseCase: OpenDoorUseCase) {}

  @SubscribeMessage(ClientGameEvent.PlayableEntityOpenDoor)
  public async openDoor(
    @MessageBody() openDoorInputDto: OpenDoorInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.openDoorUseCase.execute({
      userId: client.data.userId,
      ...openDoorInputDto,
    });
  }
}
