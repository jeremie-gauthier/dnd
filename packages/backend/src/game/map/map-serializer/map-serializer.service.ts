import { GameEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapSerializerService {
  constructor() {}

  public serialize(map: GameEntity['map']): string {
    void map;
    throw new Error('Not implemented');
  }

  public deserialize(_mapCompiled: string): GameEntity['map'] {
    void _mapCompiled;
    throw new Error('Not implemented');
  }
}
