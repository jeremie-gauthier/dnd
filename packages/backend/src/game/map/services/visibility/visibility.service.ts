import {
  Coord,
  GameEntity,
  Tile,
  TileEntity,
  getNeighbourCoords,
} from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { CoordService } from "../coord/coord.service";
import { MapService } from "../map/map.service";

@Injectable()
export class VisibilityService {
  constructor(
    private readonly coordService: CoordService,
    private readonly mapService: MapService,
  ) {}

  public getMapForHero({ game }: { game: GameEntity }): GameEntity {
    const exploredTiles = this.getExploredTiles({ game });
    const metadata = {
      height: Math.max(0, ...exploredTiles.map(({ coord }) => coord.row + 1)),
      width: Math.max(0, ...exploredTiles.map(({ coord }) => coord.column + 1)),
    };
    const tilesCompletedWithVoid =
      this.mapService.completePartialMapWithVoidTiles({
        ...metadata,
        partialMapTiles: exploredTiles,
      });

    return {
      ...game,
      map: {
        ...game.map,
        ...metadata,
        tiles: tilesCompletedWithVoid.map((tile) => {
          return {
            ...tile,
            entities: tile.entities.filter((entity) => {
              return this.canViewEntity({ entity });
            }),
          };
        }),
      },
    };
  }

  private canViewEntity({ entity }: { entity: TileEntity }): boolean {
    return (
      entity.type === "playable-entity" ||
      ((entity.type === "non-playable-non-interactive-entity" ||
        entity.type === "non-playable-interactive-entity") &&
        entity.isVisible)
    );
  }

  public getMapForGameMaster({ game }: { game: GameEntity }): GameEntity {
    return game;
  }

  private getExploredTiles({ game }: { game: GameEntity }): Tile[] {
    const heroesCoords = this.getHeroesCoords({ game });
    const startingCoords =
      heroesCoords.length > 0
        ? heroesCoords
        : this.getStartingTilesCoords({ game });

    const exploredTiles = new Set<Tile>();

    for (const startingCoord of startingCoords) {
      const tile = this.getTileFromCoord({ game, coord: startingCoord });
      if (!tile || (tile && exploredTiles.has(tile))) continue;

      const newExploredTiles = this.floodFill({ game, startingCoord });
      for (const newExploredTile of newExploredTiles) {
        if (!exploredTiles.has(newExploredTile)) {
          exploredTiles.add(newExploredTile);
        }
      }
    }

    return Array.from(exploredTiles);
  }

  private getHeroesCoords({ game }: { game: GameEntity }): Coord[] {
    return Object.values(game.playableEntities)
      .filter((playableEntity) => playableEntity.type === "hero")
      .map((hero) => hero.coord);
  }

  private getStartingTilesCoords({ game }: { game: GameEntity }): Coord[] {
    return game.map.tiles
      .filter((tile) => tile.isStartingTile)
      .map((tile) => tile.coord);
  }

  private floodFill({
    game,
    startingCoord,
  }: { game: GameEntity; startingCoord: Coord }): Tile[] {
    const startingTile = this.getTileFromCoord({ game, coord: startingCoord });
    if (!startingTile) {
      return [];
    }

    const tilesVisited = new Set([startingTile]);
    const tilesToVisit = getNeighbourCoords({
      coord: startingCoord,
    })
      .map((coord) => this.getTileFromCoord({ game, coord }))
      .filter((tile): tile is Tile => tile !== undefined);

    let currentTile = tilesToVisit.shift();
    while (currentTile !== undefined) {
      if (this.isVisitableTile({ tile: currentTile })) {
        const validNeighbouringTiles = getNeighbourCoords({
          coord: currentTile.coord,
        })
          .map((coord) => this.getTileFromCoord({ game, coord }))
          .filter(
            (tile): tile is Tile =>
              tile !== undefined && !tilesVisited.has(tile),
          );
        tilesToVisit.push(...validNeighbouringTiles);
      }

      tilesVisited.add(currentTile);

      currentTile = tilesToVisit.shift();
    }

    return Array.from(tilesVisited);
  }

  private getTileFromCoord({
    game,
    coord,
  }: { game: GameEntity; coord: Coord }): Tile | undefined {
    const tileIdx = this.coordService.coordToIndex({
      coord,
      metadata: {
        height: game.map.height,
        width: game.map.width,
      },
    });
    return game.map.tiles[tileIdx];
  }

  private isVisitableTile({ tile }: { tile: Tile }): boolean {
    return tile.entities.every(
      (entity) =>
        entity.type === "playable-entity" ||
        ((entity.type === "non-playable-interactive-entity" ||
          entity.type === "non-playable-non-interactive-entity") &&
          entity.isBlocking === false),
    );
  }
}
