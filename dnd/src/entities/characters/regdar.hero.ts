import type { Character } from './character.interface';

export class Regdar implements Character {
  public readonly type = 'character';
  public isBlocking = true;

  public readonly name = 'Regdar';

  public readonly level = 1;
  public readonly speed = 4;
  public readonly initiative = 0;
  public healthPoints = 8;
  public readonly healthPointsNatural = 8;
  public manaPoints = 0;
  public readonly manaPointsNatural = 0;
  public armorClass = 2;
  public readonly armorClassNatural = 2;

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

  public getRepresentation() {
    return `This is ${this.name} (${this.type})`;
  }

  public toString() {
    return 'R';
  }
}
