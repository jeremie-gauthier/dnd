import { Weapon } from '../weapons/weapon.abstract';
import { InventoryError } from './errors/inventory-error';
import { ItemNotFoundError } from './errors/item-not-found-error';
import { NoSpaceLeftError } from './errors/no-space-left-error';
import type { Item } from './item.abstract';

interface InventoryOptions {
  readonly backpackSlots: number;
  readonly equipped: {
    readonly artifactSlots: number;
    readonly spellSlots: number;
    readonly weaponSlots: number;
  };
}

interface Bag {
  items: Item[];
  readonly slots: number;
}

export class Inventory {
  public readonly backpack: Bag;

  public readonly equipped: Readonly<Record<Item['type'], Bag>>;

  constructor({
    backpackSlots,
    equipped: { artifactSlots, spellSlots, weaponSlots },
  }: InventoryOptions) {
    this.backpack = {
      items: [],
      slots: backpackSlots,
    };
    this.equipped = {
      weapon: {
        items: [],
        slots: weaponSlots,
      },
      artifact: {
        items: [],
        slots: artifactSlots,
      },
      spell: {
        items: [],
        slots: spellSlots,
      },
    };
  }

  public isWeaponEquipped(weapon: Weapon) {
    return this.equipped.weapon.items.includes(weapon);
  }

  public hasSpaceLeftInBag(bag: Bag) {
    return bag.items.length < bag.slots;
  }

  public addItemInBag(item: Item, bag: Bag) {
    if (!this.hasSpaceLeftInBag(bag)) {
      throw new NoSpaceLeftError();
    }

    bag.items.push(item);
  }

  public removeItemFromBag(itemToRemove: Item, bag: Bag) {
    bag.items = bag.items.filter((item) => item !== itemToRemove);
  }

  public hasItemInBag(item: Item, bag: Bag) {
    return bag.items.includes(item);
  }

  public moveItem({
    backpackItem,
    equippedItem,
  }: {
    backpackItem?: Item;
    equippedItem?: Item;
  }) {
    // if nothing needs to be changed
    if (!backpackItem && !equippedItem) {
      return;
    }

    // if backpackItem is not in your backpack
    if (backpackItem && !this.hasItemInBag(backpackItem, this.backpack)) {
      throw new ItemNotFoundError(backpackItem);
    }

    // if equippedItem is not equipped
    if (
      equippedItem &&
      !this.hasItemInBag(equippedItem, this.equipped[equippedItem.type])
    ) {
      throw new ItemNotFoundError(equippedItem);
    }

    // if it's a swap of 2 items
    if (backpackItem && equippedItem) {
      if (backpackItem.type !== equippedItem.type) {
        throw new InventoryError(`Cannot swap items of different types`);
      }

      this.swapItemsFromBags(backpackItem, equippedItem);
    }
    // if it's a move of an item to another bag
    else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = (backpackItem ?? equippedItem)!;
      const [bagToPickFrom, bagToAddTo] = backpackItem
        ? [this.backpack, this.equipped[item.type]]
        : [this.equipped[item.type], this.backpack];
      this.removeItemFromBag(item, bagToPickFrom);
      this.addItemInBag(item, bagToAddTo);
    }
  }

  private swapItemsFromBags(backpackItem: Item, equippedItem: Item) {
    this.removeItemFromBag(backpackItem, this.backpack);
    this.removeItemFromBag(equippedItem, this.equipped[equippedItem.type]);

    this.addItemInBag(equippedItem, this.backpack);
    this.addItemInBag(backpackItem, this.equipped[equippedItem.type]);
  }
}
