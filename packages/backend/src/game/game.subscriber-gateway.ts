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
import type { ServerSocket } from "src/interfaces/socket.type";
import { EndPlayerTurnUseCase } from "./end-player-turn/end-player-turn.uc";
import { OpenDoorInputDto } from "./open-door/open-door.dto";
import { OpenDoorUseCase } from "./open-door/open-door.uc";
import { PlayableEntityAttackInputDto } from "./playable-entity-attack/playable-entity-attack.dto";
import { PlayableEntityAttackUseCase } from "./playable-entity-attack/playable-entity-attack.uc";
import { PlayableEntityMoveInputDto } from "./playable-entity-move/playable-entity-move.dto";
import { PlayableEntityMoveUseCase } from "./playable-entity-move/playable-entity-move.uc";

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})
export class GameSubscriberGateway {
  constructor(
    private readonly endPlayerTurnUseCase: EndPlayerTurnUseCase,
    private readonly playableEntityMoveUseCase: PlayableEntityMoveUseCase,
    private readonly openDoorUseCase: OpenDoorUseCase,
    private readonly playableEntityAttackUseCase: PlayableEntityAttackUseCase,
  ) {}

  @SubscribeMessage(ClientGameEvent.PlayableEntityTurnEnds)
  public async endPlayerTurn(
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.endPlayerTurnUseCase.execute({ userId: client.data.userId });
  }

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
