import {
  EntityEvent,
  EntityInputByEventName,
  entityEventEmitter,
} from '../../entities/events/event-emitter.entity';
import { Enemy } from '../../entities/playables/enemies/enemy.abstract';
import { Player } from './player.abstract';

export class GameMaster extends Player {
  public readonly type: 'hero' | 'gm' = 'gm';
  public entities: Enemy[];

  constructor(entities: Enemy[] = []) {
    super();
    this.entities = entities;

    entityEventEmitter.addListener(
      EntityEvent.OnEntityDeath,
      this.onEntityDied.bind(this),
    );
  }

  public hasEnemyAlive() {
    return this.entities.some((entity) => entity.isAlive);
  }

  public addEntityControl(entity: Enemy) {
    this.entities.push(entity);
  }

  private onEntityDied({
    deadEntity,
  }: EntityInputByEventName[EntityEvent.OnEntityDeath]) {
    console.log(`GameMaster: ${EntityEvent.OnEntityDeath}`, deadEntity);

    this.entities = this.entities.filter((entity) => entity !== deadEntity);
  }
}
