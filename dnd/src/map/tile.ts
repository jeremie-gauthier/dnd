import { Coord } from '../interfaces/coord.interface';
import { Link, LinkType } from './link';
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

  public addUnidirectionalConnexion(
    tile: Tile,
    type: LinkType = Link.Type.None,
  ) {
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
    const linkTop = this.linkContainer.getLinkFromTileCoord({
      ...this.coord,
      y: this.coord.y - 1,
    });
    const top = linkTop?.toString() ?? '\u2191';

    const linkRight = this.linkContainer.getLinkFromTileCoord({
      ...this.coord,
      x: this.coord.x + 1,
    });
    const right = linkRight?.toString() ?? '\u2192';

    const linkBottom = this.linkContainer.getLinkFromTileCoord({
      ...this.coord,
      y: this.coord.y + 1,
    });
    const bottom = linkBottom?.toString() ?? '\u2193';

    const linkLeft = this.linkContainer.getLinkFromTileCoord({
      ...this.coord,
      x: this.coord.x - 1,
    });
    const left = linkLeft?.toString() ?? '\u2190';

    return `${left}${top}${this.content.toString()}${bottom}${right}`;
  }
}
