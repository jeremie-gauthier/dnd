import { Enemy } from '../../entities/playables/enemies/enemy.abstract';
import { Turn } from './turn.abstract';

export class EnemyTurn extends Turn {
  constructor(public readonly playableEntity: Enemy) {
    super();
  }
}
