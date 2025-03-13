import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { User } from "src/modules/lobby/domain/user/user.entity";
import {
  INVENTORY_MANAGER_REPOSITORY,
  InventoryManagerRepository,
} from "../../repositories/inventory-manager-repository.interface";
import { PlayableEntitySwapItemsInputDto } from "./playable-entity-swap-items.dto";

@Injectable()
export class PlayableEntitySwapItemsUseCase implements UseCase {
  constructor(
    @Inject(INVENTORY_MANAGER_REPOSITORY)
    private readonly inventoryManagerRepository: InventoryManagerRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    gameId,
    userId,
    gearItemId,
    backpackItemId,
  }: PlayableEntitySwapItemsInputDto & { userId: User["id"] }): Promise<void> {
    const inventory = await this.inventoryManagerRepository.getOneOrThrow({
      gameId,
      userId,
    });
    inventory.playerSwapItem({ userId, gearItemId, backpackItemId });

    await this.inventoryManagerRepository.update({ inventory });

    // const plainGame = inventory.toPlain();
    // await this.eventEmitter.emitAsync(
    //   GameEvent.GameUpdated,
    //   new GameUpdatedPayload({ game: plainGame }),
    // );
  }
}
