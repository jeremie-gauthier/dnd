// ! This class is a bonus.
// ? Check if it's not easier to deal with single map before thinking about modular chunks

import { MapChunk } from './map-chunk';

interface Map {
  coord: {
    x: number;
    y: number;
  };
  chunk: MapChunk;
}

/**
 * assembler des chunks:
 * chaque chunk possede une coord. le plus en haut a gauche = { x: 0, y: 0 }
 *
 */
export class MapBuilder {
  private map: Map[];

  constructor() {
    this.map = [];
  }
}
