import { PlayableEntity } from '../playable.interface';

export interface Enemy extends PlayableEntity {
  getType(): string;
  getHP(): number;
  setHP(hp: number): void;
  takeDamage(amount: number): void;
}
