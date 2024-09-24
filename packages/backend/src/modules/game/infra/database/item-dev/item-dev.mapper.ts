import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as ItemPersistence } from "src/database/entities/item.entity";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Repository } from "typeorm";

@Injectable()
export class ItemDevMapper {
  constructor(
    @InjectRepository(ItemPersistence)
    private readonly repository: Repository<ItemPersistence>,
  ) {}

  public toPersistence({
    domain,
    isLootableInChest,
  }: { domain: ItemDomain; isLootableInChest: boolean }): ItemPersistence {
    return this.repository.create({
      ...domain.toPlain(),
      isLootableInChest,
    });
  }
}
