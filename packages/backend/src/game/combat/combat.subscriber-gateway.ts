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
import { PlayableEntityAttackInputDto } from "./playable-entity-attack/playable-entity-attack.dto";
import { PlayableEntityAttackUseCase } from "./playable-entity-attack/playable-entity-attack.uc";

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})
export class CombatSubscriberGateway {
  constructor(
    private readonly playableEntityAttackUseCase: PlayableEntityAttackUseCase,
  ) {}

  @SubscribeMessage(ClientGameEvent.PlayableEntityAttacks)
  public async playableEntityAttacks(
    @MessageBody() playableEntityAttackInputDto: PlayableEntityAttackInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.playableEntityAttackUseCase.execute({
      ...playableEntityAttackInputDto,
      userId: client.data.userId,
    });
  }
}
