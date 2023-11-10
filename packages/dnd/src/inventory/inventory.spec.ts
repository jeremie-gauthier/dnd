import { beforeEach, describe, expect, it } from 'vitest';
import {
  MockArtifactItem,
  MockSpellItem,
  MockUnknownItem,
  MockWeaponItem,
} from '../items/fixtures/item.fixture';
import { MockWeapon } from '../items/weapons/fixtures/weapon.fixture';
import { InventoryError } from './errors/inventory-error';
import { ItemNotFoundError } from './errors/item-not-found-error';
import { NoSpaceLeftError } from './errors/no-space-left-error';
import { MOCK_INVENTORY_OPTIONS } from './fixtures/inventory.fixture';
import { Inventory } from './inventory';

describe('inventory: Inventory', () => {
  let inventory: Inventory;

  beforeEach(() => {
    inventory = new Inventory(MOCK_INVENTORY_OPTIONS);
  });

  describe('method: addItemInBag', () => {
    it('should adds the item in the backpack', () => {
      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.backpack.items).toStrictEqual([]);

      const weapon = new MockWeapon();
      inventory.addItemInBag(weapon, inventory.backpack);

      const expected = [weapon];

      expect(inventory.backpack.items).toHaveLength(1);
      expect(inventory.backpack.items).toStrictEqual(expected);
    });

    it('should adds the item in the equipped bag', () => {
      expect(inventory.equipped.weapon.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toStrictEqual([]);

      const weapon = new MockWeapon();
      inventory.addItemInBag(weapon, inventory.equipped.weapon);

      const expected = [weapon];

      expect(inventory.equipped.weapon.items).toHaveLength(1);
      expect(inventory.equipped.weapon.items).toStrictEqual(expected);
    });

    it('should throws an error if the bag is full', () => {
      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.backpack.items).toStrictEqual([]);

      const throwableMethod = () => {
        for (
          let index = 0;
          index <= MOCK_INVENTORY_OPTIONS.backpackSlots;
          index++
        ) {
          inventory.addItemInBag(new MockWeaponItem(), inventory.backpack);
        }
      };
      const expected = new NoSpaceLeftError().message;

      expect(throwableMethod).toThrowError(expected);
    });
  });

  describe('method: isItemEquipped', () => {
    it('should returns true when the weapon is equipped', () => {
      const weapon = new MockWeaponItem();
      inventory.addItemInBag(weapon, inventory.equipped.weapon);

      const result = inventory.isItemEquipped(weapon);
      const expected = true;

      expect(result).toEqual(expected);
    });

    it('should returns true when the spell is equipped', () => {
      const spell = new MockSpellItem();
      inventory.addItemInBag(spell, inventory.equipped.spell);

      const result = inventory.isItemEquipped(spell);
      const expected = true;

      expect(result).toEqual(expected);
    });

    it('should returns true when the artifact is equipped', () => {
      const artifact = new MockArtifactItem();
      inventory.addItemInBag(artifact, inventory.equipped.artifact);

      const result = inventory.isItemEquipped(artifact);
      const expected = true;

      expect(result).toEqual(expected);
    });

    it('should returns false when the weapon is not equipped', () => {
      const weapon = new MockWeaponItem();

      const result = inventory.isItemEquipped(weapon);
      const expected = false;

      expect(result).toEqual(expected);
    });

    it('should returns false if the item type is not recognized', () => {
      const weapon = new MockUnknownItem();

      const result = inventory.isItemEquipped(weapon);
      const expected = false;

      expect(result).toEqual(expected);
    });
  });

  describe('method: removeItemFromBag', () => {
    it('should remove the item from the bag', () => {
      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.backpack.items).toStrictEqual([]);

      const weapon = new MockWeaponItem();
      inventory.addItemInBag(weapon, inventory.backpack);

      expect(inventory.backpack.items).toHaveLength(1);
      expect(inventory.backpack.items).toStrictEqual([weapon]);

      inventory.removeItemFromBag(weapon, inventory.backpack);

      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.backpack.items).toStrictEqual([]);
    });

    it('should do nothing if the item is not in the bag', () => {
      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.backpack.items).toStrictEqual([]);

      const weapon = new MockWeaponItem();
      inventory.addItemInBag(weapon, inventory.backpack);

      expect(inventory.backpack.items).toHaveLength(1);
      expect(inventory.backpack.items).toStrictEqual([weapon]);

      inventory.removeItemFromBag(new MockWeaponItem(), inventory.backpack);

      expect(inventory.backpack.items).toHaveLength(1);
      expect(inventory.backpack.items).toStrictEqual([weapon]);
    });
  });

  describe('method: moveItem', () => {
    it('should do nothing if nothing needs to be changed', () => {
      const weapon = new MockWeapon();
      inventory.addItemInBag(weapon, inventory.equipped.weapon);
      const expected = [weapon];

      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.equipped.artifact.items).toHaveLength(0);
      expect(inventory.equipped.spell.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toHaveLength(1);
      expect(inventory.equipped.weapon.items).toStrictEqual(expected);

      inventory.moveItem({});

      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.equipped.artifact.items).toHaveLength(0);
      expect(inventory.equipped.spell.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toHaveLength(1);
      expect(inventory.equipped.weapon.items).toStrictEqual(expected);
    });

    it('should move the equipped item to the backpack', () => {
      const weapon = new MockWeapon();
      inventory.addItemInBag(weapon, inventory.equipped.weapon);
      const expected = [weapon];

      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.equipped.artifact.items).toHaveLength(0);
      expect(inventory.equipped.spell.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toHaveLength(1);
      expect(inventory.equipped.weapon.items).toStrictEqual(expected);

      inventory.moveItem({ equippedItem: weapon });

      expect(inventory.backpack.items).toHaveLength(1);
      expect(inventory.backpack.items).toStrictEqual(expected);
      expect(inventory.equipped.artifact.items).toHaveLength(0);
      expect(inventory.equipped.spell.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toHaveLength(0);
    });

    it('should move the backpack item to the equipped', () => {
      const weapon = new MockWeapon();
      inventory.addItemInBag(weapon, inventory.backpack);
      const expected = [weapon];

      expect(inventory.backpack.items).toHaveLength(1);
      expect(inventory.backpack.items).toStrictEqual(expected);
      expect(inventory.equipped.artifact.items).toHaveLength(0);
      expect(inventory.equipped.spell.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toHaveLength(0);

      inventory.moveItem({ backpackItem: weapon });

      expect(inventory.backpack.items).toHaveLength(0);
      expect(inventory.equipped.artifact.items).toHaveLength(0);
      expect(inventory.equipped.spell.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toHaveLength(1);
      expect(inventory.equipped.weapon.items).toStrictEqual(expected);
    });

    it('should swap the backpack item and the equipped item', () => {
      const weaponA = new MockWeapon();
      inventory.addItemInBag(weaponA, inventory.backpack);
      const expectedInBackpackAtInit = [weaponA];
      const weaponB = new MockWeapon();
      inventory.addItemInBag(weaponB, inventory.equipped.weapon);
      const expectedInquippedAtInit = [weaponB];

      expect(inventory.backpack.items).toHaveLength(1);
      expect(inventory.backpack.items).toStrictEqual(expectedInBackpackAtInit);
      expect(inventory.equipped.artifact.items).toHaveLength(0);
      expect(inventory.equipped.spell.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toHaveLength(1);
      expect(inventory.equipped.weapon.items).toStrictEqual(
        expectedInquippedAtInit,
      );

      inventory.moveItem({ backpackItem: weaponA, equippedItem: weaponB });

      const expectedInBackpack = expectedInquippedAtInit;
      const expectedInEquipped = expectedInBackpackAtInit;

      expect(inventory.backpack.items).toHaveLength(1);
      expect(inventory.backpack.items).toStrictEqual(expectedInBackpack);
      expect(inventory.equipped.artifact.items).toHaveLength(0);
      expect(inventory.equipped.spell.items).toHaveLength(0);
      expect(inventory.equipped.weapon.items).toHaveLength(1);
      expect(inventory.equipped.weapon.items).toStrictEqual(expectedInEquipped);
    });

    it('should throws an error when item is not in bag', () => {
      const weapon = new MockWeaponItem();

      {
        const result = () => {
          inventory.moveItem({ backpackItem: weapon });
        };
        const expected = new ItemNotFoundError(weapon).message;

        expect(result).toThrowError(expected);
      }

      {
        const result = () => {
          inventory.moveItem({ equippedItem: weapon });
        };
        const expected = new ItemNotFoundError(weapon).message;

        expect(result).toThrowError(expected);
      }
    });

    it('should throws an error when items are not of the same types', () => {
      const weapon = new MockWeaponItem();
      inventory.addItemInBag(weapon, inventory.backpack);
      const spell = new MockSpellItem();
      inventory.addItemInBag(spell, inventory.equipped.spell);

      const result = () => {
        inventory.moveItem({ backpackItem: weapon, equippedItem: spell });
      };
      const expected = new InventoryError(
        `Cannot swap items of different types`,
      ).message;

      expect(result).toThrowError(expected);
    });
  });
});
