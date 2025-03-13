import { AggregateRoot } from "src/modules/shared/domain/aggregate-root";
import { ArrayCollection } from "src/modules/shared/domain/collections/array.collection";
import { PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import {
  ItemType,
  ItemTypeType,
} from "../../infra/database/enums/item-type.enum";
import {
  StorageSpace,
  StorageSpaceType,
} from "../../infra/database/enums/storage-space.enum";
import { InventoryError } from "./inventory.error";
import { Item } from "./item/item.entity";
import { OwnerPlayable } from "./owner-playable/owner-playable.entity";

type Data = {
  readonly id: string;
  readonly ownerPlayable: OwnerPlayable;
  readonly storageCapacity: {
    nbArtifactSlots: number;
    nbSpellSlots: number;
    nbWeaponSlots: number;
    nbBackpackSlots: number;
  };
  [StorageSpace.GEAR]: ArrayCollection<Item>;
  [StorageSpace.BACKPACK]: ArrayCollection<Item>;
};

export class Inventory extends AggregateRoot<Data> {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    ownerPlayable: z.instanceof(OwnerPlayable),
    storageCapacity: z.object({
      nbArtifactSlots: z.number().min(0),
      nbSpellSlots: z.number().min(0),
      nbWeaponSlots: z.number().min(0),
      nbBackpackSlots: z.number().min(0),
    }),
    [StorageSpace.GEAR]: z.instanceof(ArrayCollection<Item>),
    [StorageSpace.BACKPACK]: z.instanceof(ArrayCollection<Item>),
  });

  constructor(rawData: Data) {
    const data = Inventory.schema.parse(rawData);
    super(data, data.id);
  }

  // #region Getters

  public get gear() {
    return this._data[StorageSpace.GEAR];
  }

  public get backpack() {
    return this._data[StorageSpace.BACKPACK];
  }

  public get ownerPlayable() {
    return this._data.ownerPlayable;
  }

  // #region Methods

  public addItemInStorageSpace({
    item,
    storageSpace,
  }: { item: Item; storageSpace: StorageSpaceType }) {
    this.mustHaveSpaceLeftInStorageSpace({ itemType: item.type, storageSpace });
    this._data[storageSpace].add(item);
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
    // const storageSpace = this.findItemInInventoryOrThrow({ item });
    // this._data[storageSpace] = this._data[storageSpace].filter(
    //   (storageItem) => !storageItem.equals(item),
    // );
  }

  public playerSwapItem({
    userId,
    backpackItemId,
    gearItemId,
  }: {
    userId: string;
    backpackItemId?: Item["id"];
    gearItemId?: Item["id"];
  }) {
    if (!gearItemId && !backpackItemId) {
      return;
    }

    this._data.ownerPlayable.mustBePlayedBy({ userId });
    this._data.ownerPlayable.actSwapItems();

    const backpackItem = backpackItemId
      ? this[StorageSpace.BACKPACK].getOneOrThrow(backpackItemId)
      : undefined;
    const gearItem = gearItemId
      ? this[StorageSpace.GEAR].getOneOrThrow(gearItemId)
      : undefined;

    this.swapItemsFromStorageSpaces({ backpackItem, gearItem });
  }

  private swapItemsFromStorageSpaces({
    backpackItem,
    gearItem,
  }: {
    backpackItem?: Item;
    gearItem?: Item;
  }) {
    // remove items before adding them to respect the inventory constraints
    if (backpackItem) {
      this.removeItemFromStorageSpace({
        item: backpackItem,
        storageSpace: StorageSpace.BACKPACK,
      });
    }
    if (gearItem) {
      this.removeItemFromStorageSpace({
        item: gearItem,
        storageSpace: StorageSpace.GEAR,
      });
    }

    if (backpackItem) {
      this.addItemInStorageSpace({
        item: backpackItem,
        storageSpace: StorageSpace.GEAR,
      });
    }
    if (gearItem) {
      this.addItemInStorageSpace({
        item: gearItem,
        storageSpace: StorageSpace.BACKPACK,
      });
    }
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

  private hasSpaceLeftInGear({ itemType }: { itemType: ItemTypeType }) {
    switch (itemType) {
      case ItemType.WEAPON:
        return (
          this._data[StorageSpace.GEAR].filter((item) => item.isWeapon())
            .length < this._data.storageCapacity.nbWeaponSlots
        );
      case ItemType.SPELL:
        return (
          this._data[StorageSpace.GEAR].filter((item) => item.isSpell())
            .length < this._data.storageCapacity.nbSpellSlots
        );
      case ItemType.ARTIFACT:
        return (
          this._data[StorageSpace.GEAR].filter((item) => item.isArtifact())
            .length < this._data.storageCapacity.nbArtifactSlots
        );
      default:
        return false;
    }
  }

  private mustHaveSpaceLeftInStorageSpace({
    itemType,
    storageSpace,
  }: { itemType: ItemTypeType; storageSpace: StorageSpaceType }) {
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

  public override toPlain(): PlainData<Data> {
    throw new Error("Method not implemented.");
  }
}
