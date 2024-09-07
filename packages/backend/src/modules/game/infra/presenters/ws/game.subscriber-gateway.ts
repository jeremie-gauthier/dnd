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
import { PlayableEntityDeleteItemInputDto } from "src/modules/game/application/use-cases/playable-entity-delete-item/playable-entity-delete-item.dto";
import { PlayableEntityDeleteItemUseCase } from "src/modules/game/application/use-cases/playable-entity-delete-item/playable-entity-delete-item.uc";
import {
  PlayableEntityOpenChestInputDto,
  PlayableEntityOpenChestOutputDto,
} from "src/modules/game/application/use-cases/playable-entity-open-chest/playable-entity-open-chest.dto";
import { PlayableEntityOpenChestUseCase } from "src/modules/game/application/use-cases/playable-entity-open-chest/playable-entity-open-chest.uc";
import { PlayableEntitySwapItemsInputDto } from "src/modules/game/application/use-cases/playable-entity-swap-items/playable-entity-swap-items.dto";
import { PlayableEntitySwapItemsUseCase } from "src/modules/game/application/use-cases/playable-entity-swap-items/playable-entity-swap-items.uc";
import { Spell } from "src/modules/game/domain/item/spell/spell.entity";
import { Weapon } from "src/modules/game/domain/item/weapon/weapon.entity";
import { EndPlayerTurnInputDto } from "../../../application/use-cases/end-player-turn/end-player-turn.dto";
import { EndPlayerTurnUseCase } from "../../../application/use-cases/end-player-turn/end-player-turn.uc";
import { OpenDoorInputDto } from "../../../application/use-cases/open-door/open-door.dto";
import { OpenDoorUseCase } from "../../../application/use-cases/open-door/open-door.uc";
import { PlayableEntityAttackInputDto } from "../../../application/use-cases/playable-entity-attack/playable-entity-attack.dto";
import { PlayableEntityAttackUseCase } from "../../../application/use-cases/playable-entity-attack/playable-entity-attack.uc";
import { PlayableEntityMoveInputDto } from "../../../application/use-cases/playable-entity-move/playable-entity-move.dto";
import { PlayableEntityMoveUseCase } from "../../../application/use-cases/playable-entity-move/playable-entity-move.uc";
import { ItemPresenter } from "../services/item.presenter";

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
    private readonly itemPresenter: ItemPresenter,
    private readonly endPlayerTurnUseCase: EndPlayerTurnUseCase,
    private readonly playableEntityMoveUseCase: PlayableEntityMoveUseCase,
    private readonly openDoorUseCase: OpenDoorUseCase,
    private readonly playableEntityAttackUseCase: PlayableEntityAttackUseCase,
    private readonly playableEntityDeleteItemUseCase: PlayableEntityDeleteItemUseCase,
    private readonly playableEntitySwapItemsUseCase: PlayableEntitySwapItemsUseCase,
    private readonly playableEntityOpenChestUseCase: PlayableEntityOpenChestUseCase,
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

  @SubscribeMessage(ClientGameEvent.PlayableEntityDeleteItem)
  public async playableEntityDeleteItem(
    @MessageBody()
    playableEntityDeleteItemInputDto: PlayableEntityDeleteItemInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.playableEntityDeleteItemUseCase.execute({
      ...playableEntityDeleteItemInputDto,
      userId: client.data.userId,
    });
  }

  @SubscribeMessage(ClientGameEvent.PlayableEntitySwapItems)
  public async playableEntitySwapItems(
    @MessageBody()
    playableEntitySwapItemsInputDto: PlayableEntitySwapItemsInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    await this.playableEntitySwapItemsUseCase.execute({
      ...playableEntitySwapItemsInputDto,
      userId: client.data.userId,
    });
  }

  @SubscribeMessage(ClientGameEvent.PlayableEntityOpenChest)
  public async playableEntityOpenChest(
    @MessageBody()
    playableEntitySwapItemsInputDto: PlayableEntityOpenChestInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<PlayableEntityOpenChestOutputDto> {
    const { itemFound } = await this.playableEntityOpenChestUseCase.execute({
      ...playableEntitySwapItemsInputDto,
      userId: client.data.userId,
    });

    const itemView = await this.itemPresenter.toView({
      item: itemFound as ReturnType<(Weapon | Spell)["toPlain"]>,
    });

    return { itemFound: itemView };
  }
}
