import { Link } from './link';
import { LinkContainer } from './link-container';
import { TileContent, TileContentType } from './tile-content';

export class Tile {
  public readonly content: TileContent;

  constructor(
    contentType: TileContentType,
    entityType?: string,
    public readonly label?: string,
    public readonly linkContainer = new LinkContainer(),
  ) {
    this.content = new TileContent(contentType, entityType);
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
}
