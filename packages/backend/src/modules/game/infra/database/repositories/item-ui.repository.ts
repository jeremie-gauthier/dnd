import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemUIRepository } from "src/modules/game/application/repositories/item-ui-repository.interface";
import { Repository } from "typeorm";
import { ItemUI as ItemUIPersistence } from "../entities/item/item-ui.entity";

@Injectable()
export class ItemUIPostgresRepository implements ItemUIRepository {
  constructor(
    @InjectRepository(ItemUIPersistence)
    private readonly itemUIRepository: Repository<ItemUIPersistence>,
  ) {}

  public async getOneOrThrow({
    name,
  }: { name: ItemUIPersistence["itemName"] }): Promise<ItemUIPersistence> {
    return this.itemUIRepository.findOneOrFail({
      select: { itemName: true, imgUrl: true },
      where: {
        itemName: name,
      },
    });
  }

  public async createMany({
    items,
  }: {
    items: Array<{
      itemName: ItemUIPersistence["itemName"];
      imgUrl: ItemUIPersistence["imgUrl"];
    }>;
  }): Promise<void> {
    await this.itemUIRepository.save(items);
  }
}
