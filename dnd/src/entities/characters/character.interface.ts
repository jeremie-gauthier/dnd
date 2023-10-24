import type { Entity } from '../entity.interface';

export interface Character extends Entity {
  readonly name: string;
  readonly level: number;
  readonly speed: number;
  readonly initiative: number;
  healthPoints: number;
  readonly healthPointsNatural: number;
  manaPoints: number;
  readonly manaPointsNatural: number;
  armorClass: number;
  readonly armorClassNatural: number;

  get isAlive(): boolean;
  takeDamage(amount: number): void;
  takeDirectDamage(amount: number): void;
}
