import { Dice } from '../../../dices/dice.abstract';
import {
  MOCK_DICE_VALUES,
  MockDiceWithRoll,
} from '../../../dices/fixtures/dice.fixture';
import { AttackType } from '../../../interfaces/attack-type.enum';
import { Weapon } from '../weapon.abstract';

const ATTACK_DICES = [new MockDiceWithRoll(), new MockDiceWithRoll()];
export const DICE_MOCK_RETURNED_VALUE = MOCK_DICE_VALUES[1];
export const DICES_ROLL_SUM = DICE_MOCK_RETURNED_VALUE * ATTACK_DICES.length;
export class MockWeapon extends Weapon {
  name = 'mock';
  description = 'This is a mocked weapon';
  attackType: AttackType = AttackType.Melee;
  perks?: 're-roll' | 'super attack' | undefined = undefined;
  dices: Dice[] = ATTACK_DICES;
  superAttackDices?: Dice[] | undefined = undefined;
}

const SUPER_ATTACK_DICES = [
  new MockDiceWithRoll(),
  new MockDiceWithRoll(),
  new MockDiceWithRoll(),
];
export const SUPER_ATTACK_DICES_ROLL_SUM =
  DICE_MOCK_RETURNED_VALUE * SUPER_ATTACK_DICES.length;
export class MockWeaponWithSuperAttack extends Weapon {
  name = 'mock';
  description = 'This is a mocked weapon';
  attackType: AttackType = AttackType.Melee;
  perks?: 're-roll' | 'super attack' | undefined = undefined;
  dices: Dice[] = ATTACK_DICES;
  superAttackDices?: Dice[] | undefined = SUPER_ATTACK_DICES;
}
