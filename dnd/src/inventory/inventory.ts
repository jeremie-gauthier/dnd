import { Artifact } from '../items/artifacts/artifact.abstract';
import { Item } from '../items/item.abstract';
import { Spell } from '../items/spells/spell.abstract';
import { Weapon } from '../items/weapons/weapon.abstract';
import { InventoryError } from './errors/inventory-error';
import { ItemNotFoundError } from './errors/item-not-found-error';
import { NoSpaceLeftError } from './errors/no-space-left-error';

export interface InventoryOptions {
  readonly backpackSlots: number;
  readonly equipped: {
    readonly artifactSlots: number;
    readonly spellSlots: number;
    readonly weaponSlots: number;
  };
}

interface Bag<ItemType extends Item> {
  items: ItemType[];
  readonly slots: number;
}

export class Inventory {
  public readonly backpack: Bag<Item>;

  public readonly equipped: Readonly<{
    weapon: Bag<Weapon>;
    artifact: Bag<Artifact>;
    spell: Bag<Spell>;
  }>;

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

  public isItemEquipped(item: Item) {
    if (item.isWeapon()) {
      return this.hasItemInBag(item, this.equipped.weapon);
    } else if (item.isSpell()) {
      return this.hasItemInBag(item, this.equipped.spell);
    } else if (item.isArtifact()) {
      return this.hasItemInBag(item, this.equipped.artifact);
    } else {
      return false;
    }
  }

  private hasSpaceLeftInBag(bag: Bag<Item>) {
    return bag.items.length < bag.slots;
  }

  public addItemInBag<ItemToAdd extends Item>(
    item: ItemToAdd,
    bag: Bag<ItemToAdd>,
  ) {
    if (!this.hasSpaceLeftInBag(bag)) {
      throw new NoSpaceLeftError();
    }

    bag.items.push(item);
  }

  public removeItemFromBag<ItemToRemove extends Item>(
    itemToRemove: ItemToRemove,
    bag: Bag<ItemToRemove>,
  ) {
    bag.items = bag.items.filter((item) => item !== itemToRemove);
  }

  private hasItemInBag<ItemToFind extends Item>(
    item: ItemToFind,
    bag: Bag<ItemToFind>,
  ) {
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

    this.assertCanMoveItem({ backpackItem, equippedItem });

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

  private assertCanMoveItem({
    backpackItem,
    equippedItem,
  }: {
    backpackItem?: Item;
    equippedItem?: Item;
  }) {
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
  }

  private swapItemsFromBags(backpackItem: Item, equippedItem: Item) {
    this.removeItemFromBag(backpackItem, this.backpack);
    this.removeItemFromBag(equippedItem, this.equipped[equippedItem.type]);

    this.addItemInBag(equippedItem, this.backpack);
    this.addItemInBag(backpackItem, this.equipped[equippedItem.type]);
  }
}
