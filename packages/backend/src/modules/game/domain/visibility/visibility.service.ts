import {
  Coord,
  GameView,
  Tile,
  TileEntity,
  getNeighbourCoords,
} from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { MapService } from "../map/map.service";

@Injectable()
export class VisibilityService {
  constructor(private readonly mapService: MapService) {}

  public getMapForHero({ game }: { game: GameView }): GameView {
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
      ((entity.type === "non-interactive-entity" ||
        entity.type === "interactive-entity") &&
        entity.isVisible)
    );
  }

  public getMapForGameMaster({ game }: { game: GameView }): GameView {
    return game;
  }

  private getExploredTiles({ game }: { game: GameView }): Tile[] {
    const heroesCoords = this.getHeroesCoords({ game });
    const startingCoords =
      heroesCoords.length > 0
        ? heroesCoords
        : this.getStartingTilesCoords({ game });

    const exploredTiles = new Set<Tile>();

    for (const startingCoord of startingCoords) {
      const tile = this.mapService.getTileOrThrow({
        game,
        coord: startingCoord,
      });
      if (exploredTiles.has(tile)) continue;

      const newExploredTiles = this.floodFill({ game, startingCoord });
      for (const newExploredTile of newExploredTiles) {
        if (!exploredTiles.has(newExploredTile)) {
          exploredTiles.add(newExploredTile);
        }
      }
    }

    return Array.from(exploredTiles);
  }

  private getHeroesCoords({ game }: { game: GameView }): Coord[] {
    return Object.values(game.playableEntities)
      .filter((playableEntity) => playableEntity.faction === "hero")
      .map((hero) => hero.coord);
  }

  private getStartingTilesCoords({ game }: { game: GameView }): Coord[] {
    return game.map.tiles
      .filter((tile) => tile.isStartingTile)
      .map((tile) => tile.coord);
  }

  private floodFill({
    game,
    startingCoord,
  }: { game: GameView; startingCoord: Coord }): Tile[] {
    const startingTile = this.mapService.getTileOrThrow({
      game,
      coord: startingCoord,
    });
    const tilesVisited = new Set([startingTile]);
    const tilesToVisit = getNeighbourCoords({
      coord: startingCoord,
    })
      .map((coord) => this.mapService.getTile({ game, coord }))
      .filter((tile): tile is Tile => tile !== undefined);

    let currentTile = tilesToVisit.shift();
    while (currentTile !== undefined) {
      if (this.isVisitableTile({ tile: currentTile })) {
        const validNeighbouringTiles = getNeighbourCoords({
          coord: currentTile.coord,
        })
          .map((coord) => this.mapService.getTile({ game, coord }))
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

  private isVisitableTile({ tile }: { tile: Tile }): boolean {
    return tile.entities.every(
      (entity) =>
        entity.type === "playable-entity" ||
        ((entity.type === "interactive-entity" ||
          entity.type === "non-interactive-entity") &&
          entity.isBlocking === false),
    );
  }
}
