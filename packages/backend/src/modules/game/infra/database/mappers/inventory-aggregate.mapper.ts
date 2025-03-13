import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Inventory as InventoryDomain } from "src/modules/game/domain/_inventory/inventory.aggregate";
import { Item } from "src/modules/game/domain/_inventory/item/item.entity";
import { OwnerPlayable } from "src/modules/game/domain/_inventory/owner-playable/owner-playable.entity";
import { ArrayCollection } from "src/modules/shared/domain/collections/array.collection";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Repository } from "typeorm";
import { Inventory as InventoryPersistence } from "../entities/game-entity/playable-entity/inventory/inventory.entity";
import { StorageSpace } from "../enums/storage-space.enum";

@Injectable()
export class InventoryAggregateMapper extends Mapper<
  InventoryPersistence,
  InventoryDomain
> {
  constructor(
    @InjectRepository(InventoryPersistence)
    private readonly inventoryRepository: Repository<InventoryPersistence>,
  ) {
    super();
  }

  public toDomain(persistence: InventoryPersistence): InventoryDomain {
    return new InventoryDomain({
      id: persistence.id,
      storageCapacity: persistence.storageCapacity,
      ownerPlayable: new OwnerPlayable({
        id: persistence.playableEntity.id,
        playedByUserId: persistence.playableEntity.playedByUserId,
        characteristic: persistence.playableEntity.characteristic,
        actionsDoneThisTurn: persistence.playableEntity.actionsDoneThisTurn.map(
          (action) => ({
            name: action.name,
          }),
        ),
      }),
      backpack: new ArrayCollection(
        persistence.inventoryItems
          .filter((item) => item.storageSpace === StorageSpace.BACKPACK)
          .map(({ item }) => new Item({ name: item.name, type: item.type })),
      ),
      gear: new ArrayCollection(
        persistence.inventoryItems
          .filter((item) => item.storageSpace === StorageSpace.GEAR)
          .map(({ item }) => new Item({ name: item.name, type: item.type })),
      ),
    });
  }

  public toPersistence(domain: InventoryDomain): InventoryPersistence {
    const persistence = this.inventoryRepository.create({
      id: domain.id,
      inventoryItems: [...domain.backpack.getAll(), ...domain.gear.getAll()],
    });

    return persistence;
  }
}
