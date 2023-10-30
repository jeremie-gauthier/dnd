import { Enemy } from '../../entities/playables/enemies/enemy.abstract';
import { Turn } from './turn.abstract';

export class EnemyTurn extends Turn {
  public actionPoints = 2;

  constructor(public readonly playableEntity: Enemy) {
    super();
  }
}
