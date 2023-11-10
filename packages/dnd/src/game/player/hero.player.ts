import { Character } from '../../entities/playables/characters/character.abstract';
import { Player } from './player.abstract';

export class Hero extends Player {
  public readonly type: 'hero' | 'gm' = 'hero';
  public entities: Character[];

  constructor(entities: Character[] = []) {
    super();
    this.entities = entities;
  }

  public addEntityControl(entity: Character) {
    this.entities.push(entity);
  }
}
