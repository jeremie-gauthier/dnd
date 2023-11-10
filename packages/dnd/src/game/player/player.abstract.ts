import { PlayableEntity } from '../../entities/playables/playable.abstract';
import type { GameMaster } from './game-master.player';
import type { Hero } from './hero.player';

export abstract class Player {
  abstract readonly type: 'hero' | 'gm';
  abstract entities: PlayableEntity[];

  public isGameMaster(): this is GameMaster {
    return this.type === 'gm';
  }

  public isHero(): this is Hero {
    return this.type === 'hero';
  }
}
