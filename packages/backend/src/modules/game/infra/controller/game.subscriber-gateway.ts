import { ClientGameEvent } from "@dnd/shared";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { ZodValidationPipe } from "nestjs-zod";
import { WsExceptionFilter } from "src/errors/ws-exception-filter";
import { AuthGuard } from "src/guards/auth.guard";
import type { ServerSocket } from "src/interfaces/socket.interface";
import { EndPlayerTurnInputDto } from "../../use-cases/end-player-turn/end-player-turn.dto";
import { EndPlayerTurnUseCase } from "../../use-cases/end-player-turn/end-player-turn.uc";
import { OpenDoorInputDto } from "../../use-cases/open-door/open-door.dto";
import { OpenDoorUseCase } from "../../use-cases/open-door/open-door.uc";
import { PlayableEntityAttackInputDto } from "../../use-cases/playable-entity-attack/playable-entity-attack.dto";
import { PlayableEntityAttackUseCase } from "../../use-cases/playable-entity-attack/playable-entity-attack.uc";
import { PlayableEntityMoveInputDto } from "../../use-cases/playable-entity-move/playable-entity-move.dto";
import { PlayableEntityMoveUseCase } from "../../use-cases/playable-entity-move/playable-entity-move.uc";

@UseGuards(AuthGuard)
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
    @MessageBody() endPlayerTurnInputDto: EndPlayerTurnInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.endPlayerTurnUseCase.execute({
      ...endPlayerTurnInputDto,
      userId: client.data.userId,
    });
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
