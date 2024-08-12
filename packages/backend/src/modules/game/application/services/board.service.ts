import { Injectable } from "@nestjs/common";
import { Coord } from "../../domain/coord/coord.vo";
import { Tile } from "../../domain/tile/tile.entity";

@Injectable()
export class BoardService {
  public completePartialMapWithVoidTiles({
    height,
    width,
    partialMapTiles,
  }: {
    height: number;
    width: number;
    partialMapTiles: Array<ReturnType<Tile["toPlain"]>>;
  }): Array<ReturnType<Tile["toPlain"]>> {
    return Array.from({ length: width * height }).map((_, index) => {
      const tileCoord = Coord.fromIndex(index, { width, height });

      const existingTile = partialMapTiles.find(
        ({ coord }) =>
          coord.column === tileCoord.column && coord.row === tileCoord.row,
      );

      if (existingTile) {
        return existingTile;
      }

      return {
        isStartingTile: undefined,
        coord: tileCoord,
        entities: [
          {
            type: "non-interactive-entity",
            kind: "off-map",
            canInteract: false,
            isBlocking: true,
            isVisible: true,
          },
        ],
      };
    });
  }
}
