import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artifact as ArtifactPersistence } from "src/database/entities/artifact.entity";
import { AttackDice } from "src/database/entities/attack-dice.entity";
import { ChestTrap as ChestTrapPersistence } from "src/database/entities/chest-trap.entity";
import { Item as ItemPersistence } from "src/database/entities/item.entity";
import { Potion as PotionPersistence } from "src/database/entities/potion.entity";
import { Spell as SpellPersistence } from "src/database/entities/spell.entity";
import { Weapon as WeaponPersistence } from "src/database/entities/weapon.entity";
import { ItemFactory } from "src/modules/game/application/factories/item.factory";
import { GameItem } from "src/modules/game/application/factories/item.interface";
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

  public override toDomain(
    persistence:
      | WeaponPersistence
      | SpellPersistence
      | ChestTrapPersistence
      | PotionPersistence
      | ArtifactPersistence,
  ): ItemDomain {
    return ItemFactory.create({
      ...persistence,
      attacks:
        persistence.type === "Weapon" || persistence.type === "Spell"
          ? persistence.attacks?.map((attack) => ({
              ...attack,
              dices: attack.attackDices.map(
                (attackDice: AttackDice) => attackDice.dice,
              ),
            }))
          : undefined,
    } as GameItem);
  }

  public toPersistence(domain: ItemDomain): ItemPersistence {
    return this.repository.create(domain.toPlain());
  }
}
