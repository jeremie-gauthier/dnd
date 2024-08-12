import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as ItemPersistence } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { ItemRepository } from "src/modules/game/application/repositories/item-repository.interface";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Repository } from "typeorm";
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
      select: { type: true },
      where: { name },
    });

    switch (item.type) {
      case "Weapon": {
        const weapon = await this.weaponRepository.findOneOrFail({
          where: { name },
          relations: { attacks: { attackDices: { dice: true } }, perks: true },
        });
        return this.mapper.toDomain(weapon);
      }
      case "Spell": {
        const spell = await this.spellRepository.findOneOrFail({
          where: { name },
          relations: { attacks: { attackDices: { dice: true } }, perks: true },
        });
        return this.mapper.toDomain(spell);
      }
      default:
        throw new Error(`Item '${name}' not found`);
    }
  }
}
