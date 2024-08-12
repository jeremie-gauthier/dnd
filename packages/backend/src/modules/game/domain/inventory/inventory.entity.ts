import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Spell } from "../item/spell/spell.entity";
import { Weapon } from "../item/weapon/weapon.entity";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { InventoryError } from "./inventory.error";

type Data = {
  readonly playableId: Playable["id"];
  readonly storageCapacity: {
    nbArtifactSlots: number;
    nbSpellSlots: number;
    nbWeaponSlots: number;
    nbBackpackSlots: number;
  };
  readonly gear: Array<Item>;
  readonly backpack: Array<Item>;
};

export class Inventory extends Entity<Data> {
  private static schema = z.object({
    playableId: z.string(),
    storageCapacity: z.object({
      nbArtifactSlots: z.number().min(0),
      nbSpellSlots: z.number().min(0),
      nbWeaponSlots: z.number().min(0),
      nbBackpackSlots: z.number().min(0),
    }),
    gear: z.array(z.instanceof(Item)),
    backpack: z.array(z.instanceof(Item)),
  });

  constructor(rawData: Data) {
    const data = Inventory.schema.parse(rawData);
    super(data, data.playableId);
  }

  public getAttackItemInGearOrThrow({ attackId }: { attackId: Attack["id"] }) {
    const attackItem = this._data.gear.find(
      (item): item is Spell | Weapon =>
        (item.isWeapon() || item.isSpell()) && item.hasAttack({ attackId }),
    );
    if (!attackItem) {
      throw new InventoryError({
        name: "ITEM_NOT_FOUND_IN_GEAR_STUFF",
        message: "Item not found in gear stuff",
      });
    }
    return attackItem;
  }

  public toPlain() {
    return {
      playableId: this._data.playableId,
      storageCapacity: {
        nbArtifactSlots: this._data.storageCapacity.nbArtifactSlots,
        nbSpellSlots: this._data.storageCapacity.nbSpellSlots,
        nbWeaponSlots: this._data.storageCapacity.nbWeaponSlots,
        nbBackpackSlots: this._data.storageCapacity.nbBackpackSlots,
      },
      gear: this._data.gear.map((item: Weapon | Spell) => item.toPlain()),
      backpack: this._data.backpack.map((item: Weapon | Spell) =>
        item.toPlain(),
      ),
    };
  }
}
