import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemUI as ItemUIPersistence } from "src/database/entities/item-ui.entity";
import { ItemUIRepository } from "src/modules/game/application/repositories/item-ui-repository.interface";
import { Repository } from "typeorm";

@Injectable()
export class PostgresItemUIRepository implements ItemUIRepository {
  constructor(
    @InjectRepository(ItemUIPersistence)
    private readonly itemUIRepository: Repository<ItemUIPersistence>,
  ) {}

  public async getOneOrThrow({
    name,
  }: { name: string }): Promise<ItemUIPersistence> {
    return this.itemUIRepository.findOneOrFail({
      select: { itemName: true, imgUrl: true },
      where: {
        itemName: name,
      },
    });
  }

  public async createMany({
    items,
  }: { items: Array<{ itemName: string; imgUrl: string }> }): Promise<void> {
    await this.itemUIRepository.save(items);
  }
}
