import { GameEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import {
  addStartingPositions,
  addTileEntities,
  createDummyTiles,
  inferOffMapTileEntities,
  parseFile,
  parseMetadata,
  parseStartingPositions,
  parseTileEntities,
  sanitize,
} from './deserialize.helper';

@Injectable()
export class MapSerializerService {
  constructor() {}

  public serialize(map: GameEntity['map']): string {
    void map;
    throw new Error('Not implemented');
  }

  public deserialize(mapCompiled: string): GameEntity['map'] {
    const mapCompiledSanitized = sanitize(mapCompiled);
    const [metadataCompiled, startingPositionsCompiled, ...entitiesCompiled] =
      parseFile(mapCompiledSanitized);

    const metadata = parseMetadata(metadataCompiled);

    const tiles = createDummyTiles(metadata);
    const startingPositions = parseStartingPositions(startingPositionsCompiled);
    addStartingPositions({ tiles, startingPositions, metadata });

    const tileEntities = parseTileEntities(entitiesCompiled);
    addTileEntities({ tiles, tileEntities, metadata });

    inferOffMapTileEntities({ tiles, startingPositions, metadata });

    return { ...metadata, tiles };
  }
}
