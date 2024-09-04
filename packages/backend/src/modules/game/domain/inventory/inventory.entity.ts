import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Spell } from "../item/spell/spell.entity";
import { Weapon } from "../item/weapon/weapon.entity";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { InventoryError } from "./inventory.error";

type StorageSpace = "gear" | "backpack";

type Data = {
  readonly playableId: Playable["id"];
  readonly storageCapacity: {
    nbArtifactSlots: number;
    nbSpellSlots: number;
    nbWeaponSlots: number;
    nbBackpackSlots: number;
  };
  gear: Array<Item>;
  backpack: Array<Item>;
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

  public getItemInInventoryOrThrow({ itemId }: { itemId: Item["id"] }) {
    const gearItem = this._data.gear.find(({ id }) => id === itemId);
    if (gearItem) {
      return gearItem;
    }

    const backpackItem = this._data.backpack.find(({ id }) => id === itemId);
    if (backpackItem) {
      return backpackItem;
    }

    throw new InventoryError({
      name: "ITEM_NOT_FOUND_IN_INVENTORY",
      message: `${itemId} not found in inventory`,
    });
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

  public addItemInStorageSpace({
    item,
    storageSpace,
  }: { item: Item; storageSpace: StorageSpace }) {
    this.mustHaveSpaceLeftInStorageSpace({ itemType: item.type, storageSpace });
    this._data[storageSpace].push(item);
  }

  private removeItemFromStorageSpace({
    item,
    storageSpace,
  }: { item: Item; storageSpace: StorageSpace }) {
    this._data[storageSpace] = this._data[storageSpace].filter(
      (storageItem) => !storageItem.equals(item),
    );
  }

  public removeItemFromInventory({ item }: { item: Item }) {
    const storageSpace = this.findItemInInventoryOrThrow({ item });
    this._data[storageSpace] = this._data[storageSpace].filter(
      (storageItem) => !storageItem.equals(item),
    );
  }

  public swapItemsFromStorageSpaces({
    backpackItem,
    gearItem,
  }: {
    backpackItem?: Item;
    gearItem?: Item;
  }) {
    if (backpackItem) {
      this.mustHaveItemInStorageSpace({
        item: backpackItem,
        storageSpace: "backpack",
      });
    }
    if (gearItem) {
      this.mustHaveItemInStorageSpace({
        item: gearItem,
        storageSpace: "gear",
      });
    }

    if (backpackItem && gearItem) {
      this.removeItemFromStorageSpace({ item: gearItem, storageSpace: "gear" });
      this.removeItemFromStorageSpace({
        item: backpackItem,
        storageSpace: "backpack",
      });

      this.addItemInStorageSpace({ item: gearItem, storageSpace: "backpack" });
      this.addItemInStorageSpace({ item: backpackItem, storageSpace: "gear" });
    } else if (backpackItem && !gearItem) {
      this.removeItemFromStorageSpace({
        item: backpackItem,
        storageSpace: "backpack",
      });
      this.addItemInStorageSpace({ item: backpackItem, storageSpace: "gear" });
    } else if (!backpackItem && gearItem) {
      this.removeItemFromStorageSpace({ item: gearItem, storageSpace: "gear" });
      this.addItemInStorageSpace({ item: gearItem, storageSpace: "backpack" });
    }
  }

  private findItemInInventoryOrThrow({ item }: { item: Item }): StorageSpace {
    if (this._data.gear.some((gearItem) => gearItem.equals(item))) {
      return "gear";
    }

    if (this._data.backpack.some((backpackItem) => backpackItem.equals(item))) {
      return "backpack";
    }

    throw new InventoryError({
      name: "ITEM_NOT_FOUND_IN_INVENTORY",
      message: `${item.id} not found in inventory`,
    });
  }

  private mustHaveItemInStorageSpace({
    item,
    storageSpace,
  }: { item: Item; storageSpace: StorageSpace }) {
    const hasItem = this._data[storageSpace].some((storageItem) =>
      storageItem.equals(item),
    );
    if (!hasItem) {
      throw new InventoryError({
        name:
          storageSpace === "backpack"
            ? "ITEM_NOT_FOUND_IN_BACKPACK_STUFF"
            : "ITEM_NOT_FOUND_IN_GEAR_STUFF",
        message: `Item not found in ${storageSpace} stuff`,
      });
    }
  }

  private hasSpaceLeftInBackpack() {
    return (
      this._data.backpack.length < this._data.storageCapacity.nbBackpackSlots
    );
  }

  private hasSpaceLeftInGear({ itemType }: { itemType: Item["type"] }) {
    switch (itemType) {
      case "Weapon":
        return (
          this._data.gear.filter((item) => item.isWeapon()).length <
          this._data.storageCapacity.nbWeaponSlots
        );
      case "Spell":
        return (
          this._data.gear.filter((item) => item.isSpell()).length <
          this._data.storageCapacity.nbSpellSlots
        );
      default:
        return false;
    }
  }

  private mustHaveSpaceLeftInStorageSpace({
    itemType,
    storageSpace,
  }: { itemType: Item["type"]; storageSpace: StorageSpace }) {
    const hasSpaceLeft =
      storageSpace === "backpack"
        ? this.hasSpaceLeftInBackpack()
        : this.hasSpaceLeftInGear({ itemType });
    if (!hasSpaceLeft) {
      throw new InventoryError({
        name: "NO_SPACE_LEFT_IN_INVENTORY",
        message: `No space left in ${storageSpace}`,
      });
    }
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
