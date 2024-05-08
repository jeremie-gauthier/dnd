import { ClientGameEvent } from "@dnd/shared";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import type { ServerSocket } from "src/types/socket.type";
import type { ChangePositionInputDto } from "./change-position/change-position.dto";
import { ChangePositionUseCase } from "./change-position/change-position.uc";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class GameStartingPrivateGateway {
  constructor(private readonly changePositionUseCase: ChangePositionUseCase) {}

  @SubscribeMessage(ClientGameEvent.ChangeStartingPosition)
  public async changePosition(
    @MessageBody() changePositionInputDto: ChangePositionInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.changePositionUseCase.execute({
      userId: client.data.userId,
      changePositionInputDto,
    });
  }
}
