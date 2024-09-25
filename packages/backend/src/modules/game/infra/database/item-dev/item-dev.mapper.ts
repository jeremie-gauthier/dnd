import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as ItemPersistence } from "src/database/entities/item.entity";
import { Spell as SpellPersistence } from "src/database/entities/spell.entity";
import { Weapon as WeaponPersistence } from "src/database/entities/weapon.entity";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Repository } from "typeorm";

@Injectable()
export class ItemDevMapper {
  constructor(
    @InjectRepository(ItemPersistence)
    private readonly itemRepository: Repository<ItemPersistence>,
    @InjectRepository(WeaponPersistence)
    private readonly weaponRepository: Repository<WeaponPersistence>,
    @InjectRepository(SpellPersistence)
    private readonly spellRepository: Repository<SpellPersistence>,
  ) {}

  public toPersistence({
    domain,
    isLootableInChest,
  }: { domain: ItemDomain; isLootableInChest: boolean }): ItemPersistence {
    if (domain.isWeapon()) {
      const plainWeapon = domain.toPlain();
      return this.weaponRepository.create({
        ...plainWeapon,
        isLootableInChest,
        attacks: plainWeapon.attacks.map((attack) => {
          return {
            ...attack,
            attackDices: attack.dices.map((dice) => ({ dice })),
          };
        }),
      });
    }

    if (domain.isSpell()) {
      const plainSpell = domain.toPlain();
      return this.spellRepository.create({
        ...plainSpell,
        isLootableInChest,
        attacks: plainSpell.attacks.map((attack) => {
          return {
            ...attack,
            attackDices: attack.dices.map((dice) => {
              return {
                dice,
              };
            }),
          };
        }),
      });
    }

    return this.itemRepository.create({
      ...domain.toPlain(),
      isLootableInChest,
    });
  }
}
