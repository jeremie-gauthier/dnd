import { Coord, GameEntity, Tile } from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CoordService } from "../coord/coord.service";

@Injectable()
export class MapService {
  constructor(private readonly coordService: CoordService) {}

  public completePartialMapWithVoidTiles({
    height,
    width,
    partialMapTiles,
  }: {
    height: number;
    width: number;
    partialMapTiles: GameEntity["map"]["tiles"];
  }): GameEntity["map"]["tiles"] {
    return Array.from({ length: width * height }).map((_, index) => {
      const tileCoord = this.coordService.indexToCoord({
        index,
        metadata: { width, height },
      });
      const existingTile = partialMapTiles.find(
        ({ coord }) =>
          coord.column === tileCoord.column && coord.row === tileCoord.row,
      );

      return (
        existingTile ?? {
          coord: tileCoord,
          entities: [
            {
              type: "non-playable-non-interactive-entity",
              kind: "off-map",
              canInteract: false,
              isBlocking: true,
              isVisible: true,
            },
          ],
        }
      );
    });
  }

  public getTile({
    coord,
    game,
  }: { coord: Coord; game: GameEntity }): Tile | undefined {
    const metadata = this.getMetadata({ game });
    const tileIdx = this.coordService.coordToIndex({ coord, metadata });
    const tile = game.map.tiles[tileIdx];
    return tile;
  }

  public getTileOrThrow({
    coord,
    game,
  }: { coord: Coord; game: GameEntity }): Tile {
    const tile = this.getTile({ coord, game });
    if (!tile) {
      throw new NotFoundException("No tile found at these coordinates");
    }
    return tile;
  }

  public getMetadata({ game }: { game: GameEntity }): {
    width: number;
    height: number;
  } {
    return {
      width: game.map.width,
      height: game.map.height,
    };
  }
}
