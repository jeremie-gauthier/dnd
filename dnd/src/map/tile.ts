import { Coord } from '../interfaces/coord.interface';
import { Link } from './link';
import { LinkContainer } from './link-container';
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
    public readonly linkContainer = new LinkContainer(),
  ) {
    this.content = new TileContent(content.type, content.entity?.type);
  }

  public addUnidirectionalConnexion(tile: Tile, type = Link.Type.None) {
    if (!this.linkContainer.isLinkedTo(tile)) {
      this.linkContainer.add(tile, type);
    }
  }

  public addBidirectionalConnexion(tile: Tile, type = Link.Type.None) {
    if (!this.linkContainer.isLinkedTo(tile)) {
      this.addUnidirectionalConnexion(tile, type);
      tile.addUnidirectionalConnexion(this, type);
    }
  }

  public removeConnexion(tile: Tile) {
    this.linkContainer.remove(tile);
  }

  get links() {
    return this.linkContainer.links;
  }

  public toString() {
    return this.content.toString();
  }
}
