import { Dice } from '../../dices/dice.abstract';
import { RedDice } from '../../dices/red.dice';
import { YellowDice } from '../../dices/yellow.dice';
import { AttackType } from '../../interfaces/attack-type.enum';
import type { SpellCaster } from '../../interfaces/character-class.type';
import { Spell } from './spell.abstract';

export class FieryArrows extends Spell {
  name = 'Flèches enflammées';
  description = `Des flèches incandescentes qui continuent à brûler quand elles touchent leur cible.`;
  attackType: AttackType = AttackType.Range;
  perks?: 're-roll' | 'super attack' | undefined = 're-roll';
  dices: Dice[] = [new YellowDice(), new YellowDice(), new RedDice()];
  superAttackDices?: Dice[] | undefined = undefined;
  manaCost: Readonly<Record<SpellCaster, number>> = {
    sorcerer: 3,
    cleric: 4,
  };
}
