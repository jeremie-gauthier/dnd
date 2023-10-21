import { Link } from './link';
import type { Tile } from './tile';

export class LinkContainer {
  constructor(public links: Link[] = []) {}

  public isLinkedTo(tile: Tile) {
    return this.links.some((link) => link.tile === tile);
  }

  public add(tile: Tile, type = Link.Type.None) {
    this.links.push(new Link(tile, type));
  }

  public remove(tile: Tile) {
    this.links = this.links.filter((neighbour) => neighbour.tile === tile);
  }
}
