import type { DiceRoll } from '../dices/dice.abstract';

type TotalDamages = number;
export type AttackResult = [TotalDamages, DiceRoll[]];
