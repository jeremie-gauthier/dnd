import { PlayableEntity, PlayableEntityType } from '../playable.abstract';

export abstract class Enemy extends PlayableEntity {
  public readonly type = PlayableEntityType.Enemy;
}
