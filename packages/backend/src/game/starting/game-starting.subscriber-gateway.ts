import { ClientGameEvent } from "@dnd/shared";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { ZodValidationPipe } from "nestjs-zod";
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import { WsExceptionFilter } from "src/errors/ws-exception-filter";
import type { ServerSocket } from "src/types/socket.type";
import type { ChangePositionInputDto } from "./change-position/change-position.dto";
import { ChangePositionUseCase } from "./change-position/change-position.uc";

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})
export class GameStartingSubscriberGateway {
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
