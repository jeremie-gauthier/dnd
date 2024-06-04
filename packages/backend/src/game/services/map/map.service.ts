import { Coord, GameEntity, Tile, TileEntity } from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CoordService } from "../coord/coord.service";

@Injectable()
export class MapService {
  constructor(private readonly coordService: CoordService) {}

  public createDummyTiles({
    width,
    height,
  }: { width: number; height: number }): Tile[] {
    return Array.from({ length: width * height }).map((_, index) => ({
      coord: this.coordService.indexToCoord({
        index,
        metadata: { width, height },
      }),
      entities: [],
    }));
  }

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

  public addOffMapTileEntities({
    tiles,
    startingPositions,
    metadata,
  }: {
    tiles: Tile[];
    startingPositions: Coord[];
    metadata: { width: number; height: number };
  }): void {
    const isNonBlockingEntity = (entity: TileEntity) =>
      entity.type === "playable-entity" ||
      entity.kind === "door" ||
      entity.isBlocking === false;
    const addTileToExploreAt = (coord: Coord): Coord | undefined => {
      if (
        coord.column < 0 ||
        coord.column >= metadata.width ||
        coord.row < 0 ||
        coord.row >= metadata.height
      )
        return;

      const tileIndex = this.coordService.coordToIndex({ coord, metadata });
      const tile = tiles[tileIndex];
      if (!tile) return;

      if (
        !reachableTiles.has(tileIndex) &&
        tile.entities.every((entity) => isNonBlockingEntity(entity)) &&
        !coordsToExploreQueue.some(
          ({ row, column }) =>
            row === tile.coord.row && column === tile.coord.column,
        )
      ) {
        coordsToExploreQueue.push(coord);
      }
    };

    const reachableTiles = new Set();

    const coordsToExploreQueue: Coord[] = [];
    let currentCoordExplored: Coord | undefined = startingPositions[0];
    while (currentCoordExplored !== undefined) {
      reachableTiles.add(
        this.coordService.coordToIndex({
          coord: currentCoordExplored,
          metadata,
        }),
      );

      addTileToExploreAt({
        column: currentCoordExplored.column,
        row: currentCoordExplored.row + 1,
      });
      addTileToExploreAt({
        column: currentCoordExplored.column,
        row: currentCoordExplored.row - 1,
      });
      addTileToExploreAt({
        column: currentCoordExplored.column + 1,
        row: currentCoordExplored.row,
      });
      addTileToExploreAt({
        column: currentCoordExplored.column - 1,
        row: currentCoordExplored.row,
      });

      currentCoordExplored = coordsToExploreQueue.shift();
    }

    for (const tile of tiles) {
      const tileIndex = this.coordService.coordToIndex({
        coord: tile.coord,
        metadata,
      });
      if (reachableTiles.has(tileIndex) || tile.entities.length > 0) continue;

      tile.entities.push({
        type: "non-playable-non-interactive-entity",
        kind: "off-map",
        isVisible: true,
        isBlocking: true,
        canInteract: false,
      });
    }
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
