import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as ItemPersistence } from "src/database/entities/item.entity";
import { Spell as SpellPersistence } from "src/database/entities/spell.entity";
import { Weapon as WeaponPersistence } from "src/database/entities/weapon.entity";
import { ItemFactory } from "src/modules/game/application/factories/item.factory";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Repository } from "typeorm";

@Injectable()
export class ItemMapper extends Mapper<ItemPersistence, ItemDomain> {
  constructor(
    @InjectRepository(ItemPersistence)
    private readonly repository: Repository<ItemPersistence>,
  ) {
    super();
  }

  public toDomain(
    persistence: WeaponPersistence | SpellPersistence,
  ): ItemDomain {
    return ItemFactory.create({
      ...persistence,
      attacks: persistence.attacks.map((attack) => ({
        ...attack,
        dices: attack.attackDices.map((attackDice) => attackDice.dice),
      })),
    });
  }

  public toPersistence(domain: ItemDomain): ItemPersistence {
    return this.repository.create(domain.toPlain());
  }
}
