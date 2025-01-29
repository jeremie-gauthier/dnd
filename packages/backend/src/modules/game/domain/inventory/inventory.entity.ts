import {
  StorageSpace,
  StorageSpaceType,
} from "src/database/enums/storage-space.enum";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Attack } from "../attack/attack.entity";
import { Artifact } from "../item/artifact/artifact.abstract";
import { Item } from "../item/item.abstract";
import { Potion } from "../item/potion/potion.abstract";
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
  [StorageSpace.GEAR]: Array<Item>;
  [StorageSpace.BACKPACK]: Array<Item>;
};

export class Inventory extends Entity<Data> {
  private static readonly schema = z.object({
    playableId: z.string(),
    storageCapacity: z.object({
      nbArtifactSlots: z.number().min(0),
      nbSpellSlots: z.number().min(0),
      nbWeaponSlots: z.number().min(0),
      nbBackpackSlots: z.number().min(0),
    }),
    [StorageSpace.GEAR]: z.array(z.instanceof(Item)),
    [StorageSpace.BACKPACK]: z.array(z.instanceof(Item)),
  });

  constructor(rawData: Data) {
    const data = Inventory.schema.parse(rawData);
    super(data, data.playableId);
  }

  public getFirstWeaponInGear() {
    return this._data[StorageSpace.GEAR].find(
      (item) => item.isWeapon() && item.canAttackInMelee(),
    ) as Weapon | undefined;
  }

  public getItemInInventoryOrThrow({ itemId }: { itemId: Item["id"] }) {
    const gearItem = this._data[StorageSpace.GEAR].find(
      ({ id }) => id === itemId,
    );
    if (gearItem) {
      return gearItem;
    }

    const backpackItem = this._data[StorageSpace.BACKPACK].find(
      ({ id }) => id === itemId,
    );
    if (backpackItem) {
      return backpackItem;
    }

    throw new InventoryError({
      name: "ITEM_NOT_FOUND_IN_INVENTORY",
      message: `${itemId} not found in inventory`,
    });
  }

  public getAttackItemInGearOrThrow({ attackId }: { attackId: Attack["id"] }) {
    const attackItem = this._data[StorageSpace.GEAR].find(
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
  }: { item: Item; storageSpace: StorageSpaceType }) {
    this.mustHaveSpaceLeftInStorageSpace({ itemType: item.type, storageSpace });
    this._data[storageSpace].push(item);
  }

  private removeItemFromStorageSpace({
    item,
    storageSpace,
  }: { item: Item; storageSpace: StorageSpaceType }) {
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
        storageSpace: StorageSpace.BACKPACK,
      });
    }
    if (gearItem) {
      this.mustHaveItemInStorageSpace({
        item: gearItem,
        storageSpace: StorageSpace.GEAR,
      });
    }

    if (backpackItem && gearItem) {
      this.removeItemFromStorageSpace({
        item: gearItem,
        storageSpace: StorageSpace.GEAR,
      });
      this.removeItemFromStorageSpace({
        item: backpackItem,
        storageSpace: StorageSpace.BACKPACK,
      });

      this.addItemInStorageSpace({
        item: gearItem,
        storageSpace: StorageSpace.BACKPACK,
      });
      this.addItemInStorageSpace({
        item: backpackItem,
        storageSpace: StorageSpace.GEAR,
      });
    } else if (backpackItem && !gearItem) {
      this.removeItemFromStorageSpace({
        item: backpackItem,
        storageSpace: StorageSpace.BACKPACK,
      });
      this.addItemInStorageSpace({
        item: backpackItem,
        storageSpace: StorageSpace.GEAR,
      });
    } else if (!backpackItem && gearItem) {
      this.removeItemFromStorageSpace({
        item: gearItem,
        storageSpace: StorageSpace.GEAR,
      });
      this.addItemInStorageSpace({
        item: gearItem,
        storageSpace: StorageSpace.BACKPACK,
      });
    }
  }

  private findItemInInventoryOrThrow({
    item,
  }: { item: Item }): StorageSpaceType {
    if (
      this._data[StorageSpace.GEAR].some((gearItem) => gearItem.equals(item))
    ) {
      return StorageSpace.GEAR;
    }

    if (
      this._data[StorageSpace.BACKPACK].some((backpackItem) =>
        backpackItem.equals(item),
      )
    ) {
      return StorageSpace.BACKPACK;
    }

    throw new InventoryError({
      name: "ITEM_NOT_FOUND_IN_INVENTORY",
      message: `${item.id} not found in inventory`,
    });
  }

  public mustHaveItemInStorageSpace({
    item,
    storageSpace,
  }: { item: Item; storageSpace: StorageSpaceType }) {
    const hasItem = this._data[storageSpace].some((storageItem) =>
      storageItem.equals(item),
    );
    if (!hasItem) {
      throw new InventoryError({
        name:
          storageSpace === StorageSpace.BACKPACK
            ? "ITEM_NOT_FOUND_IN_BACKPACK_STUFF"
            : "ITEM_NOT_FOUND_IN_GEAR_STUFF",
        message: `Item not found in ${storageSpace} stuff`,
      });
    }
  }

  private hasSpaceLeftInBackpack() {
    return (
      this._data[StorageSpace.BACKPACK].length <
      this._data.storageCapacity.nbBackpackSlots
    );
  }

  private hasSpaceLeftInGear({ itemType }: { itemType: Item["type"] }) {
    switch (itemType) {
      case "Weapon":
        return (
          this._data[StorageSpace.GEAR].filter((item) => item.isWeapon())
            .length < this._data.storageCapacity.nbWeaponSlots
        );
      case "Spell":
        return (
          this._data[StorageSpace.GEAR].filter((item) => item.isSpell())
            .length < this._data.storageCapacity.nbSpellSlots
        );
      default:
        return false;
    }
  }

  private mustHaveSpaceLeftInStorageSpace({
    itemType,
    storageSpace,
  }: { itemType: Item["type"]; storageSpace: StorageSpaceType }) {
    const hasSpaceLeft =
      storageSpace === StorageSpace.BACKPACK
        ? this.hasSpaceLeftInBackpack()
        : this.hasSpaceLeftInGear({ itemType });
    if (!hasSpaceLeft) {
      throw new InventoryError({
        name: "NO_SPACE_LEFT_IN_INVENTORY",
        message: `No space left in ${storageSpace}`,
      });
    }
  }

  public override toPlain() {
    return {
      playableId: this._data.playableId,
      storageCapacity: {
        nbArtifactSlots: this._data.storageCapacity.nbArtifactSlots,
        nbSpellSlots: this._data.storageCapacity.nbSpellSlots,
        nbWeaponSlots: this._data.storageCapacity.nbWeaponSlots,
        nbBackpackSlots: this._data.storageCapacity.nbBackpackSlots,
      },
      [StorageSpace.GEAR]: this._data[StorageSpace.GEAR].map(
        (item: Weapon | Spell | Artifact) => item.toPlain(),
      ),
      [StorageSpace.BACKPACK]: this._data[StorageSpace.BACKPACK].map(
        (item: Weapon | Spell | Artifact | Potion) => item.toPlain(),
      ),
    };
  }
}
