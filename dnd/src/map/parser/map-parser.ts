import { EntityFactory } from '../../entities/entity.factory';
import { ParsingError } from '../errors/parsing-error';
import { Tile } from '../tile';
import type { MapReader } from './map-reader';

enum MapGrammar {
  SECTION_SEPARATOR = ';',
  ENUMERATION_SYMBOL = ',',
  CONTEXT_SYMBOL = ':',
}

export class MapParser {
  private width = 0;
  private height = 0;

  constructor(private readonly mapReader: MapReader) {}

  public async run(): Promise<[number, number, Tile[]]> {
    const tiles = await this.parseFile();
    return [this.width, this.height, tiles];
  }

  private async parseFile() {
    const tiles: Tile[] = [];

    for await (const [line, lineIndex] of this.mapReader.readLines()) {
      if (lineIndex === this.mapReader.HEADER_METADATA_LINE) {
        this.parseMetadataHeader(line);
      } else {
        const tile = this.parseTile(line, lineIndex);
        tiles.push(tile);
      }
    }

    return tiles;
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

  private parseTile(line: string, lineIndex: number): Tile {
    const [tileContentType, entityType] = line.split(
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
    const tileCoord = {
      x: tileIndex % this.width,
      y: Math.floor(tileIndex / this.height),
    };
    const entities = entityType
      ?.split(MapGrammar.ENUMERATION_SYMBOL)
      .filter((entityType) => entityType !== '')
      .map((entityType) => EntityFactory.create(entityType));
    return new Tile(tileCoord, JSON.stringify(tileCoord), entities);
  }
}
