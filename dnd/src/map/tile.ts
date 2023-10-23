import { Coord } from '../interfaces/coord.interface';
import { TileContent, TileContentType } from './tile-content';

export class Tile {
  public readonly content: TileContent;

  constructor(
    content: {
      type: TileContentType;
      entity?: {
        type: string;
      };
    },
    public readonly coord: Coord,
    public readonly label?: string,
  ) {
    this.content = new TileContent(content.type, content.entity?.type);
  }

  public toString() {
    return this.content.toString();
  }
}
