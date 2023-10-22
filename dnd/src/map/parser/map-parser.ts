import { ParsingError } from '../errors/parsing-error';
import { LinkType } from '../link';
import { Tile } from '../tile';
import { TileContentType } from '../tile-content';
import type { MapReader } from './map-reader';

enum MapGrammar {
  SECTION_SEPARATOR = ';',
  LINK_SEPARATOR = ',',
  CONTEXT_SYMBOL = ':',
}

type LinkedTilesMap = Map<number, string[]>;

export class MapParser {
  private width = 0;
  private height = 0;

  constructor(private readonly mapReader: MapReader) {}

  public async run(): Promise<[number, number, Tile[]]> {
    const [tiles, linkedTilesMap] = await this.parseFile();
    this.parseTilesLinks(tiles, linkedTilesMap);
    return [this.width, this.height, tiles];
  }

  private async parseFile(): Promise<[Tile[], LinkedTilesMap]> {
    const tiles: Tile[] = [];
    const linkedTilesMap = new Map<number, string[]>();

    for await (const [line, lineIndex] of this.mapReader.readLines()) {
      if (lineIndex === this.mapReader.HEADER_METADATA_LINE) {
        this.parseMetadataHeader(line);
      } else {
        const tile = this.parseTile(line, lineIndex, linkedTilesMap);
        tiles.push(tile);
      }
    }

    return [tiles, linkedTilesMap];
  }

  private parseMetadataHeader(line: string) {
    const metadata = line.split(MapGrammar.SECTION_SEPARATOR);
    if (metadata.length !== 2) {
      throw new ParsingError(
        `Metadata header is not of the form "<width>;<height>"`,
        this.mapReader.HEADER_METADATA_LINE,
      );
    }

    const dimensions = metadata.map(Number) as [number, number];
    const hasSomeNaNDimensions = dimensions.some((element) =>
      Number.isNaN(element),
    );
    if (hasSomeNaNDimensions) {
      throw new ParsingError(
        `Metadata header have some NaN dimensions`,
        this.mapReader.HEADER_METADATA_LINE,
      );
    }

    const [width, height] = dimensions;
    this.width = width;
    this.height = height;
  }

  private parseTile(
    line: string,
    lineIndex: number,
    linkedTilesMap: LinkedTilesMap,
  ): Tile {
    const [tileContentType, linkedTiles, entityType] = line.split(
      MapGrammar.SECTION_SEPARATOR,
    );

    if (!tileContentType) {
      throw new ParsingError(
        `The tile content type token is missing`,
        lineIndex,
      );
    }
    if (!['free', 'blocked'].includes(tileContentType)) {
      throw new ParsingError(
        `The tile content type token "${tileContentType}" is not recognized`,
        lineIndex,
      );
    }

    const tileIndex = lineIndex - this.mapReader.MAP_DATA_STARTING_LINE;

    if (linkedTiles) {
      linkedTilesMap.set(tileIndex, linkedTiles.split(','));
    }

    const tileContent = {
      type: tileContentType as TileContentType,
      entity: entityType ? { type: entityType } : undefined,
    };
    const tileCoord = {
      x: tileIndex % this.width,
      y: Math.floor(tileIndex / this.height),
    };
    return new Tile(tileContent, tileCoord, `${tileIndex}`);
  }

  private parseTilesLinks(tiles: Tile[], linkedTilesMap: LinkedTilesMap) {
    for (let index = 0; index < tiles.length; index++) {
      const linkedTiles = linkedTilesMap.get(index);
      if (!linkedTiles) {
        continue;
      }

      for (const link of linkedTiles) {
        const [linkedTileString, linkType] = link.split(
          MapGrammar.CONTEXT_SYMBOL,
        );
        const linkedTileIndex = Number(linkedTileString);
        if (Number.isNaN(linkedTileIndex)) {
          throw new ParsingError(
            `The tile mentioned in the links section is not a number`,
            index,
          );
        }

        const linkedTile = tiles[linkedTileIndex - 1];
        if (!linkedTile) {
          throw new ParsingError(
            `The tile "${linkedTileIndex}" mentioned in the links section does not exists`,
            index,
          );
        }

        tiles[index]?.addUnidirectionalConnexion(
          linkedTile,
          linkType as LinkType | undefined,
        );
      }
    }
  }
}
