import {
  Coord,
  GameEntity,
  Tile,
  TileEntity,
  TileNonPlayableInteractiveEntity,
  TileNonPlayableNonInteractiveEntity,
} from '@dnd/shared';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MapSerializerService {
  private readonly NON_PLAYABLE_NON_INTERACTIVE_TILE_ENTITY = ['wall', 'pillar', 'tree', 'off-map'];
  private readonly NON_PLAYABLE_INTERACTIVE_TILE_ENTITY = ['door', 'trap'];

  constructor() {}

  public serialize(map: GameEntity['map']): string {
    void map;
    throw new Error('Not implemented');
  }

  public deserialize(mapCompiled: string): GameEntity['map'] {
    const [metadataCompiled, startingPositionsCompiled, ...entitiesCompiled] =
      this.sanitize(mapCompiled).split('\n');

    const metadata = this.parseMetadata(metadataCompiled);

    const tiles = this.createDummyTiles(metadata);
    const startingPositions = this.parseStartingPositions(startingPositionsCompiled);
    this.addStartingPositions({ tiles, startingPositions, metadata });

    const tileEntities = this.parseTileEntities(entitiesCompiled);
    this.addTileEntities({ tiles, tileEntities, metadata });

    return { ...metadata, tiles };
  }

  private parseMetadata(metadataCompiled?: string): { width: number; height: number } {
    if (!metadataCompiled) {
      throw new InternalServerErrorException('Error while parsing map metadata (not found)');
    }

    const [height, width] = this.sanitize(metadataCompiled).split(';');

    const metadata = {
      width: Number(width),
      height: Number(height),
    };

    if (Object.values(metadata).some((data) => !Number.isInteger(data) || data <= 0)) {
      throw new InternalServerErrorException('Error while parsing map metadata (type)');
    }

    return metadata;
  }

  private parseStartingPositions(startingPositionsCompiled?: string): Coord[] {
    if (!startingPositionsCompiled) {
      throw new InternalServerErrorException('Error while parsing starting positions (not found)');
    }

    const startingPositions = this.sanitize(startingPositionsCompiled).split(';');
    return startingPositions.map((startingPosition) => this.parseCoord(startingPosition));
  }

  private addStartingPositions({
    tiles,
    startingPositions,
    metadata,
  }: {
    tiles: Tile[];
    startingPositions: Coord[];
    metadata: { width: number; height: number };
  }): void {
    for (const startingPosition of startingPositions) {
      const idx = this.translateCoordToIndex({ coord: startingPosition, metadata });
      const tile = tiles[idx];
      if (!tile) {
        throw new InternalServerErrorException(
          'Error while registering a starting position (out of range)',
        );
      }

      tile.isStartingTile = true;
    }
  }

  private translateCoordToIndex({
    coord,
    metadata,
  }: {
    coord: Coord;
    metadata: { width: number; height: number };
  }): number {
    return coord.row * metadata.width + coord.column;
  }

  private parseTileEntities(
    entitiesCompiled: string[],
  ): { coord: Coord; tileEntity: TileEntity }[] {
    return entitiesCompiled.map((entityCompiled) => {
      const [coordCompiled, tileEntityCompiled] = this.sanitize(entityCompiled).split(';');

      const coord = this.parseCoord(coordCompiled);
      const tileEntity = this.parseTileEntity(tileEntityCompiled);

      return { coord, tileEntity };
    });
  }

  private parseCoord(coordCompiled?: string): Coord {
    if (!coordCompiled) {
      throw new InternalServerErrorException('Error while parsing tile coord (not found)');
    }

    const [row, column] = this.sanitize(coordCompiled).split(',');

    const coord = {
      row: Number(row),
      column: Number(column),
    };

    if (Object.values(coord).some((data) => !Number.isInteger(data) || data < 0)) {
      throw new InternalServerErrorException('Error while parsing tile coord (type)');
    }

    return coord;
  }

  private parseTileEntity(entityCompiled?: string): TileEntity {
    if (!entityCompiled) {
      throw new InternalServerErrorException('Error while parsing tile entity (not found)');
    }

    const [kind, ...extras] = this.sanitize(entityCompiled).split(',');
    if (!kind) {
      throw new InternalServerErrorException('Error while parsing tile entity kind (not found)');
    }

    if (this.isNonPlayableNonInteractiveTileEntity(kind)) {
      return {
        type: 'non-playable-non-interactive-entity',
        kind,
        isVisible: true,
        isBlocking: true,
        canInteract: false,
      };
    } else if (this.isNonPlayableInteractiveTileEntity(kind)) {
      return {
        type: 'non-playable-interactive-entity',
        kind,
        ...this.getNonPlayableInteractiveEntityAttributes(kind),
      };
    } else if (this.isPlayableTileEntity(kind)) {
      return { type: 'playable-entity', ...this.parsePlayableEntityAttributes(extras) };
    } else {
      throw new InternalServerErrorException('Error while parsing tile entity kind (unknown)');
    }
  }

  private isNonPlayableNonInteractiveTileEntity(
    kind: string,
  ): kind is TileNonPlayableNonInteractiveEntity['kind'] {
    return this.NON_PLAYABLE_NON_INTERACTIVE_TILE_ENTITY.includes(kind);
  }

  private isNonPlayableInteractiveTileEntity(
    kind: string,
  ): kind is TileNonPlayableInteractiveEntity['kind'] {
    return this.NON_PLAYABLE_INTERACTIVE_TILE_ENTITY.includes(kind);
  }

  private isPlayableTileEntity(kind: string): boolean {
    return kind === 'playable';
  }

  private getNonPlayableInteractiveEntityAttributes(
    kind: TileNonPlayableInteractiveEntity['kind'],
  ): { canInteract: boolean; isBlocking: boolean; isVisible: boolean } {
    switch (kind) {
      case 'door':
        return { canInteract: true, isBlocking: true, isVisible: true };
      case 'trap':
        return { canInteract: true, isBlocking: false, isVisible: false };
    }
  }

  private parsePlayableEntityAttributes(extras: string[]): { id: string } {
    const [id] = extras;
    if (!id) {
      throw new InternalServerErrorException('Error while parsing playable entity (id not found)');
    }

    return { id: this.sanitize(id) };
  }

  private translateIndexToCoord({
    index,
    metadata,
  }: {
    index: number;
    metadata: { width: number; height: number };
  }): Coord {
    return { row: Math.floor(index / metadata.width), column: index % metadata.width };
  }

  private createDummyTiles({ width, height }: { width: number; height: number }): Tile[] {
    return Array.from({ length: width * height }).map((_, index) => ({
      // rely only on width even if the height is different
      // as the resulting array is just a "`height` chunks of `width` size"
      coord: this.translateIndexToCoord({ index, metadata: { width, height } }),
      entities: [],
    }));
  }

  private addTileEntities({
    tiles,
    tileEntities,
    metadata,
  }: {
    tiles: Tile[];
    tileEntities: { coord: Coord; tileEntity: TileEntity }[];
    metadata: { width: number; height: number };
  }): void {
    for (const { coord, tileEntity } of tileEntities) {
      const idx = this.translateCoordToIndex({ coord, metadata });
      const tile = tiles[idx];
      if (!tile) {
        throw new InternalServerErrorException(
          'Error while registering a tile entity (out of range)',
        );
      }

      tile.entities.push(tileEntity);
    }
  }

  private sanitize(input: string): string {
    return input.trim();
  }
}
