import { ClientGameEvent } from "@dnd/shared";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import type { ServerSocket } from "src/types/socket.type";
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

  @SubscribeMessage(ClientGameEvent.PlayableEntityMoves)
  public async movePlayableEntity(
    @MessageBody() playableEntityMoveInputDto: PlayableEntityMoveInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.playableEntityMoveUseCase.execute({
      userId: client.data.userId,
      ...playableEntityMoveInputDto,
    });
  }
}
