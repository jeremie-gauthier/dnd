import { Enemy } from '../../entities/playables/enemies/enemy.abstract';
import { mapEventEmitter } from '../../events/event-emitter';
import { Player } from './player.abstract';

export class GameMaster extends Player {
  public readonly type: 'hero' | 'gm' = 'gm';
  public entities: Enemy[];

  constructor(entities: Enemy[] = []) {
    super();
    this.entities = entities;
    mapEventEmitter.addListener('entity-died', this.onEntityDied.bind(this));
  }

  public hasEnemyAlive() {
    return this.entities.some((entity) => entity.isAlive);
  }

  public addEntityControl(entity: Enemy) {
    this.entities.push(entity);
  }

  private onEntityDied(data: any) {
    console.log('GameMaster: on entity-died');

    this.entities = this.entities.filter(
      (entity) => entity.name !== data.entityName,
    );
  }
}
