import { Dice } from '../../../dices/dice.abstract';
import {
  MOCK_DICE_VALUES,
  MockDiceWithRoll,
} from '../../../dices/fixtures/dice.fixture';
import { AttackType } from '../../../interfaces/attack-type.enum';
import { SpellCaster } from '../../../interfaces/character-class.type';
import { Spell } from '../spell.abstract';

const ATTACK_DICES = [new MockDiceWithRoll(), new MockDiceWithRoll()];
export const DICE_MOCK_RETURNED_VALUE = MOCK_DICE_VALUES[1];
export const DICES_ROLL_SUM = DICE_MOCK_RETURNED_VALUE * ATTACK_DICES.length;
export class MockSpell extends Spell {
  manaCost: Readonly<Record<SpellCaster, number>> = {
    cleric: 4,
    sorcerer: 3,
  };
  name = 'mock';
  description = 'This is a mocked spell';
  attackType: AttackType = AttackType.Range;
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
export class MockSpellWithSuperAttack extends Spell {
  manaCost: Readonly<Record<SpellCaster, number>> = {
    cleric: 4,
    sorcerer: 3,
  };
  name = 'mock';
  description = 'This is a mocked spell';
  attackType: AttackType = AttackType.Range;
  perks?: 're-roll' | 'super attack' | undefined = undefined;
  dices: Dice[] = ATTACK_DICES;
  superAttackDices?: Dice[] | undefined = SUPER_ATTACK_DICES;
}
