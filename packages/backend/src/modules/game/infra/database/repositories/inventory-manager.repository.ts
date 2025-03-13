import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InventoryManagerRepository } from "src/modules/game/application/repositories/inventory-manager-repository.interface";
import { Inventory as InventoryDomain } from "src/modules/game/domain/_inventory/inventory.aggregate";
import { Repository } from "typeorm";
import { Inventory as InventoryPersistence } from "../entities/game-entity/playable-entity/inventory/inventory.entity";
import { PlayableEntity as PlayableEntityPersistence } from "../entities/game-entity/playable-entity/playable-entity.entity";
import { CurrentPhase } from "../enums/current-phase.enum";
import { InventoryAggregateMapper } from "../mappers/inventory-aggregate.mapper";

@Injectable()
export class InventoryManagerPostgresRepository
  implements InventoryManagerRepository
{
  constructor(
    @InjectRepository(InventoryPersistence)
    private readonly inventoryRepository: Repository<InventoryPersistence>,
    @InjectRepository(PlayableEntityPersistence)
    private readonly playableEntityRepository: Repository<PlayableEntityPersistence>,
    private readonly inventoryAggregateMapper: InventoryAggregateMapper,
  ) {}

  public async getOneOrThrow({
    gameId,
    userId,
  }: { gameId: string; userId: string }): Promise<InventoryDomain> {
    const game = await this.inventoryRepository.findOneOrFail({
      where: {
        id: gameId,
        playableEntity: {
          currentPhase: CurrentPhase.ACTION,
          playedByUserId: userId,
        },
      },
      relations: {
        inventoryItems: {
          item: true,
        },
        playableEntity: true,
      },
    });

    return this.inventoryAggregateMapper.toDomain(game);
  }

  public async update({
    inventory,
  }: { inventory: InventoryDomain }): Promise<void> {
    const persistence = this.inventoryAggregateMapper.toPersistence(inventory);

    await this.playableEntityRepository.save({
      id: persistence.playableEntity.id,
      actionsDoneThisTurn: persistence.playableEntity.actionsDoneThisTurn,
      inventory: {
        inventoryItems: persistence.inventoryItems,
      },
    });
  }
}
