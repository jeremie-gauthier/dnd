import type { DiceRoll } from '../../dices/dice.abstract';
import { sum } from '../../utils/sum';
import type { Weapon } from '../../weapons/weapon.interface';
import type { Entity } from '../entity.interface';

export type AttackResult = [number, DiceRoll[]];

export abstract class Character implements Entity {
  public readonly type = 'character';
  public isBlocking = true;

  abstract readonly name: string;
  abstract readonly level: number;
  abstract readonly speed: number;
  abstract readonly initiative: number;
  abstract healthPoints: number;
  abstract readonly healthPointsNatural: number;
  abstract manaPoints: number;
  abstract readonly manaPointsNatural: number;
  abstract armorClass: number;
  abstract readonly armorClassNatural: number;

  get isAlive() {
    return this.healthPoints > 0;
  }

  public takeDamage(amount: number): void {
    const damageTaken = amount - this.armorClass;
    if (damageTaken > 0) {
      this.handleDamage(damageTaken);
    }
  }

  public takeDirectDamage(amount: number): void {
    this.handleDamage(amount);
  }

  private handleDamage(damageTaken: number): void {
    this.healthPoints -= damageTaken;
    if (this.healthPoints <= 0) {
      this.healthPoints = 0;
      this.isBlocking = false;
    }
  }

  protected abstract afterAttack(
    weapon: Weapon,
    attackResult: AttackResult,
  ): AttackResult;
  public attack(weapon: Weapon): [number, DiceRoll[]] {
    const diceRolls = weapon.rollAttack();
    const sumDiceRolls = sum(
      ...diceRolls
        .filter(({ type }) => type === 'attack')
        .map(({ value }) => value),
    );

    return this.afterAttack(weapon, [sumDiceRolls, diceRolls]);
  }

  public getRepresentation() {
    return `This is ${this.name} (${this.type})`;
  }

  public toString() {
    return this.name[0]?.toUpperCase() ?? '';
  }
}
