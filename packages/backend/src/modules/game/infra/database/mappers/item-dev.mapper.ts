import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Repository } from "typeorm";
import { Spell as SpellPersistence } from "../entities/item/attack-item/spell/spell.entity";
import { Weapon as WeaponPersistence } from "../entities/item/attack-item/weapon.entity";
import { Item as ItemPersistence } from "../entities/item/item.entity";

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
