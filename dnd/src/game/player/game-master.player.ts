import { Enemy } from '../../entities/playables/enemies/enemy.abstract';
import { Player } from './player.abstract';

export class GameMaster extends Player {
  public readonly type: 'hero' | 'gm' = 'gm';
  public entities: Enemy[];

  constructor(entities: Enemy[] = []) {
    super();
    this.entities = entities;
  }

  public addEntityControl(entity: Enemy) {
    this.entities.push(entity);
  }
}
