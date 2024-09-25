import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as ItemPersistence } from "src/database/entities/item.entity";
import { ItemDevRepository } from "src/modules/game/application/repositories/item-dev-repository.interface";
import { Item } from "src/modules/game/domain/item/item.abstract";
import { Repository } from "typeorm";
import { ItemDevMapper } from "./item-dev.mapper";

@Injectable()
export class PostgresItemDevRepository implements ItemDevRepository {
  constructor(
    @InjectRepository(ItemPersistence)
    private readonly itemRepository: Repository<ItemPersistence>,
    private readonly mapper: ItemDevMapper,
  ) {}

  public async createMany({
    items,
  }: {
    items: Array<{ record: { is_lootable_in_chest: 0 | 1 }; item: Item }>;
  }): Promise<void> {
    const itemsPersistence = items.map(({ item, record }) =>
      this.mapper.toPersistence({
        domain: item,
        isLootableInChest: record.is_lootable_in_chest === 1,
      }),
    );
    await this.itemRepository.save(itemsPersistence);
  }
}
