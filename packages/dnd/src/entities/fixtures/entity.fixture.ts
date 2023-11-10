import { Coord } from '../../map/coord';
import { Entity } from '../entity.abstract';

const coord = Coord.from({ x: 0, y: 0 });

export class MockPlayableEntity extends Entity {
  public name = 'mock-playable-entity';
  public type = 'mock-entity';
  public isPlayable = true;
  public isBlocking = true;
  public coord = coord;
}

export class MockNonPlayableEntity extends Entity {
  public name = 'mock-non-playable-entity';
  public type = 'mock-entity';
  public isPlayable = false;
  public isBlocking = true;
  public coord = coord;
}

export class MockNoNameEntity extends Entity {
  public name = '';
  public type = 'mock-entity';
  public isPlayable = true;
  public isBlocking = true;
  public coord = coord;
}
