import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artifact } from "src/modules/game/domain/item/artifact/artifact.abstract";
import { ChestTrap } from "src/modules/game/domain/item/chest-trap/chest-trap.abstract";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Potion } from "src/modules/game/domain/item/potion/potion.abstract";
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
            diceThrows: attack.dices.map((dice) => ({ dice })),
          };
        }),
      });
    }

    if (domain.isSpell()) {
      const plainSpell = domain.toPlain();
      return this.spellRepository.create({
        ...plainSpell,
        isLootableInChest,
        manaCosts: plainSpell.manaCosts.map((manaCost) => ({
          id: `${manaCost.class}_${manaCost.cost}`,
        })),
        attacks: plainSpell.attacks.map((attack) => {
          return {
            ...attack,
            diceThrows: attack.dices.map((dice) => {
              return {
                dice: {
                  name: dice.name,
                },
              };
            }),
          };
        }),
      });
    }

    const plainItem = (domain as Artifact | Potion | ChestTrap).toPlain();
    return this.itemRepository.create({
      ...plainItem,
      isLootableInChest,
      itemPerks: plainItem.itemPerks.map((itemPerk) => ({
        id: itemPerk.id,
        perk: itemPerk.perk,
        diceThrows: itemPerk.dices.map((dice) => ({
          dice,
        })),
      })),
    });
  }
}
