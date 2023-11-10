import { describe, expect, it } from 'vitest';
import { MOCK_EXPECTED_DICE_ROLL } from '../../dices/fixtures/dice.fixture';
import { AttackResult } from '../../interfaces/attack-result.type';
import {
  DICES_ROLL_SUM,
  MockWeapon,
  MockWeaponWithSuperAttack,
  SUPER_ATTACK_DICES_ROLL_SUM,
} from './fixtures/weapon.fixture';

describe('weapons: Weapon', () => {
  describe('inherited typeguard methods', () => {
    it('should returns true on isWeapon', () => {
      const weapon = new MockWeapon();

      const result = weapon.isWeapon();
      const expected = true;

      expect(result).toEqual(expected);
    });

    it('should returns false on isSpell', () => {
      const weapon = new MockWeapon();

      const result = weapon.isSpell();
      const expected = false;

      expect(result).toEqual(expected);
    });

    it('should returns false on isArtifact', () => {
      const weapon = new MockWeapon();

      const result = weapon.isArtifact();
      const expected = false;

      expect(result).toEqual(expected);
    });
  });

  describe('method: rollAttack', () => {
    it('should returns a tuple with the results of the attack', () => {
      const weapon = new MockWeapon();

      const result = weapon.rollAttack();
      const expected: AttackResult = [
        DICES_ROLL_SUM,
        [MOCK_EXPECTED_DICE_ROLL, MOCK_EXPECTED_DICE_ROLL],
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('method: rollSuperAttack', () => {
    it('should returns a tuple with the results of the super attack', () => {
      const weapon = new MockWeaponWithSuperAttack();

      const result = weapon.rollSuperAttack();
      const expected: AttackResult = [
        SUPER_ATTACK_DICES_ROLL_SUM,
        [
          MOCK_EXPECTED_DICE_ROLL,
          MOCK_EXPECTED_DICE_ROLL,
          MOCK_EXPECTED_DICE_ROLL,
        ],
      ];

      expect(result).toEqual(expected);
    });

    it('should throws an error if the weapon has no super attack', () => {
      const weapon = new MockWeapon();

      const result = () => weapon.rollSuperAttack();
      const expected = /^No super attack for this weapon$/;

      expect(result).toThrowError(expected);
    });
  });
});
