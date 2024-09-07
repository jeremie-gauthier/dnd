import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as ItemPersistence } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import { User } from "src/database/entities/user.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { GameItem } from "src/modules/game/application/factories/item.interface";
import { ItemRepository } from "src/modules/game/application/repositories/item-repository.interface";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Between, In, Not, Repository } from "typeorm";
import { ItemMapper } from "./item.mapper";

@Injectable()
export class PostgresItemRepository implements ItemRepository {
  constructor(
    @InjectRepository(ItemPersistence)
    private readonly itemRepository: Repository<ItemPersistence>,
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
    @InjectRepository(Spell)
    private readonly spellRepository: Repository<Spell>,
    private readonly mapper: ItemMapper,
  ) {}

  public async getOneOrThrow({ name }: { name: string }): Promise<ItemDomain> {
    const item = await this.itemRepository.findOneOrFail({
      select: { name: true, type: true },
      where: { name },
    });

    return this.getItemTypeDetails({ item });
  }

  public async getOneRandom({
    itemsLooted,
    maxLevelLoot,
    hostUserId,
  }: {
    itemsLooted: Array<GameItem["name"]>;
    maxLevelLoot: GameItem["level"];
    hostUserId: User["id"];
  }): Promise<ItemDomain> {
    const item = await this.itemRepository
      .createQueryBuilder()
      .where({ name: Not(In(itemsLooted)) })
      .andWhere({ level: Between(1, maxLevelLoot) })
      .andWhere({ isLootableInChest: true })
      .andWhere(
        `name NOT IN (
        SELECT
          name
        FROM
          item
          LEFT JOIN campaign_progression_items_looted_item ON campaign_progression_items_looted_item.item_name = item.name
          INNER JOIN campaign_progression ON campaign_progression.id = campaign_progression_items_looted_item.campaign_progression_id
          AND campaign_progression.user_id = :hostUserId
        )
      `,
        { hostUserId },
      )
      .orderBy("RANDOM()", "DESC")
      .getOneOrFail();
    return this.getItemTypeDetails({ item });
  }

  private async getItemTypeDetails({
    item,
  }: { item: ItemPersistence }): Promise<ItemDomain> {
    switch (item.type) {
      case "Weapon": {
        const weapon = await this.weaponRepository.findOneOrFail({
          where: { name: item.name },
          relations: { attacks: { attackDices: { dice: true } }, perks: true },
        });
        return this.mapper.toDomain(weapon);
      }
      case "Spell": {
        const spell = await this.spellRepository.findOneOrFail({
          where: { name: item.name },
          relations: { attacks: { attackDices: { dice: true } }, perks: true },
        });
        return this.mapper.toDomain(spell);
      }
      default:
        throw new Error(`Item '${item.name}' not found`);
    }
  }
}
