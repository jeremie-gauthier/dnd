import { ClientGameEvent } from "@dnd/shared";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { ZodValidationPipe } from "nestjs-zod";
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import { WsExceptionFilter } from "src/errors/ws-exception-filter";
import type { ServerSocket } from "src/types/socket.type";
import { EndPlayerTurnUseCase } from "./end-player-turn/end-player-turn.uc";

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class StateMachineSubscriberGateway {
  constructor(private readonly endPlayerTurnUseCase: EndPlayerTurnUseCase) {}

  @SubscribeMessage(ClientGameEvent.PlayableEntityTurnEnds)
  public async endPlayerTurn(
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.endPlayerTurnUseCase.execute({ userId: client.data.userId });
  }
}
