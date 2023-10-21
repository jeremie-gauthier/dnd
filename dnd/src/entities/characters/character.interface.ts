import type { Entity } from '../entity.interface';

export interface Character extends Entity {
  getName(): string;
  getHP(): number;
  setHP(hp: number): void;
  getMana(): number;
  setMana(mana: number): void;
  takeDamage(amount: number): void;
}
