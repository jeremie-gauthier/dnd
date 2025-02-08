import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemRepository } from "src/modules/game/application/repositories/item-repository.interface";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import { Between, In, Not, Repository } from "typeorm";
import { Artifact as ArtifactPersistence } from "../entities/item/artifact.entity";
import { Spell as SpellPersistence } from "../entities/item/attack-item/spell/spell.entity";
import { Weapon as WeaponPersistence } from "../entities/item/attack-item/weapon.entity";
import { ChestTrap as ChestTrapPersistence } from "../entities/item/chest-trap.entity";
import { Item as ItemPersistence } from "../entities/item/item.entity";
import { Potion as PotionPersistence } from "../entities/item/potion.entity";
import { ItemType } from "../enums/item-type.enum";
import { ItemMapper } from "../mappers/item.mapper";

@Injectable()
export class ItemPostgresRepository implements ItemRepository {
  constructor(
    @InjectRepository(ItemPersistence)
    private readonly itemRepository: Repository<ItemPersistence>,
    @InjectRepository(WeaponPersistence)
    private readonly weaponRepository: Repository<WeaponPersistence>,
    @InjectRepository(SpellPersistence)
    private readonly spellRepository: Repository<SpellPersistence>,
    @InjectRepository(ChestTrapPersistence)
    private readonly chestTrapRepository: Repository<ChestTrapPersistence>,
    @InjectRepository(PotionPersistence)
    private readonly potionRepository: Repository<PotionPersistence>,
    @InjectRepository(ArtifactPersistence)
    private readonly artifactRepository: Repository<ArtifactPersistence>,
    private readonly mapper: ItemMapper,
  ) {}

  public async getOneOrThrow({
    name,
  }: { name: ItemPersistence["name"] }): Promise<ItemDomain> {
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
    itemsLooted: Array<ItemPersistence["name"]>;
    maxLevelLoot: ItemPersistence["level"];
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
      case ItemType.WEAPON: {
        const weapon = await this.weaponRepository.findOneOrFail({
          where: { name: item.name },
          relations: { attacks: { diceThrows: { dice: true }, perks: true } },
        });
        return this.mapper.toDomain(weapon);
      }
      case ItemType.SPELL: {
        const spell = await this.spellRepository.findOneOrFail({
          where: { name: item.name },
          relations: { attacks: { diceThrows: { dice: true }, perks: true } },
        });
        return this.mapper.toDomain(spell);
      }
      case ItemType.CHESTTRAP: {
        const chestTrap = await this.chestTrapRepository.findOneOrFail({
          where: { name: item.name },
        });
        return this.mapper.toDomain(chestTrap);
      }
      case ItemType.POTION: {
        const potion = await this.potionRepository.findOneOrFail({
          where: { name: item.name },
        });
        return this.mapper.toDomain(potion);
      }
      case ItemType.ARTIFACT: {
        const artifact = await this.artifactRepository.findOneOrFail({
          where: { name: item.name },
        });
        return this.mapper.toDomain(artifact);
      }
    }
  }
}
