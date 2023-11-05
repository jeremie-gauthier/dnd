import { describe, expect, it } from 'vitest';
import {
  MockNoNameEntity,
  MockNonPlayableEntity,
  MockPlayableEntity,
} from './fixtures/entity.fixture';

describe('entities: Entity', () => {
  describe('method: isNonPlayable', () => {
    it('should returns true when the entity is non playable', () => {
      const entity = new MockNonPlayableEntity();

      const result = entity.isNonPlayable();
      const expected = true;

      expect(result).toEqual(expected);
    });

    it('should returns false when the entity is playable', () => {
      const entity = new MockPlayableEntity();

      const result = entity.isNonPlayable();
      const expected = false;

      expect(result).toEqual(expected);
    });
  });

  describe('method: toString', () => {
    it('should returns the stringified entity', () => {
      const entity = new MockNonPlayableEntity();

      const result = entity.toString();
      const expected = 'm';

      expect(result).toEqual(expected);
    });

    it('should returns a fallback value when name is empty', () => {
      const entity = new MockNoNameEntity();

      const result = entity.toString();
      const expected = '?';

      expect(result).toEqual(expected);
    });
  });
});
