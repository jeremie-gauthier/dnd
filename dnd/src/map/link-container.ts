import { Coord } from '../interfaces/coord.interface';
import { equals } from '../utils/equals';
import { Link, LinkType } from './link';
import type { Tile } from './tile';

export class LinkContainer {
  constructor(public links: Link[] = []) {}

  public isLinkedTo(tile: Tile) {
    return this.links.some((link) => link.tile === tile);
  }

  public add(tile: Tile, type: LinkType = Link.Type.None) {
    this.links.push(new Link(tile, type));
  }

  public remove(tile: Tile) {
    this.links = this.links.filter((neighbour) => neighbour.tile === tile);
  }

  public getLinkFromTileCoord(coord: Coord): Link | undefined {
    return this.links.find((link) => equals(link.tile.coord, coord));
  }
}
