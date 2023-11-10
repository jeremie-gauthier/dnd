import { describe, expect, it } from 'vitest';
import {
  MockArtifactItem,
  MockSpellItem,
  MockWeaponItem,
} from './fixtures/item.fixture';

describe('items: Item', () => {
  describe('method: isWeapon', () => {
    it("should returns true if the item type is 'weapon'", () => {
      const item = new MockWeaponItem();

      const result = item.isWeapon();
      const expected = true;

      expect(result).toEqual(expected);
    });

    it("should returns false if the item type is not 'weapon'", () => {
      const item = new MockSpellItem();

      const result = item.isWeapon();
      const expected = false;

      expect(result).toEqual(expected);
    });
  });

  describe('method: isSpell', () => {
    it("should returns true if the item type is 'spell'", () => {
      const item = new MockSpellItem();

      const result = item.isSpell();
      const expected = true;

      expect(result).toEqual(expected);
    });

    it("should returns false if the item type is not 'spell'", () => {
      const item = new MockArtifactItem();

      const result = item.isSpell();
      const expected = false;

      expect(result).toEqual(expected);
    });
  });

  describe('method: isArtifact', () => {
    it("should returns true if the item type is 'artifact'", () => {
      const item = new MockArtifactItem();

      const result = item.isArtifact();
      const expected = true;

      expect(result).toEqual(expected);
    });

    it("should returns false if the item type is not 'artifact'", () => {
      const item = new MockWeaponItem();

      const result = item.isArtifact();
      const expected = false;

      expect(result).toEqual(expected);
    });
  });
});
