import type { Entity } from '../entity.interface';

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

  public getRepresentation() {
    return `This is ${this.name} (${this.type})`;
  }

  public toString() {
    return this.name[0]?.toUpperCase() ?? '';
  }
}
