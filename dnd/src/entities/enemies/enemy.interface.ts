import type { Entity } from '../entity.interface';

export interface Enemy extends Entity {
  getType(): string;
  getHP(): number;
  setHP(hp: number): void;
  takeDamage(amount: number): void;
}
