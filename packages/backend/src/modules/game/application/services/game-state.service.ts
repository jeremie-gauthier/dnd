import { Injectable } from "@nestjs/common";
import { Coord } from "../../domain/coord/coord.vo";
import { Game } from "../../domain/game/game.aggregate";
import { TileEntity } from "../../domain/tile-entity/tile-entity.abstract";
import { Tile } from "../../domain/tile/tile.entity";
import { BoardService } from "./board.service";

@Injectable()
export class GameStateService {
  constructor(private readonly boardService: BoardService) {}

  public getGameStateFromPlayerPerspective({
    game,
    userId,
  }: { game: ReturnType<Game["toPlain"]>; userId: string }): ReturnType<
    Game["toPlain"]
  > {
    const isGameMaster = game.gameMaster.userId === userId;

    if (isGameMaster) {
      return this.getGameStateForGameMaster({ game });
    } else {
      return this.getGameStateForHero({ game });
    }
  }

  private getGameStateForGameMaster({
    game,
  }: { game: ReturnType<Game["toPlain"]> }): ReturnType<Game["toPlain"]> {
    return game;
  }

  private getGameStateForHero({
    game,
  }: { game: ReturnType<Game["toPlain"]> }): ReturnType<Game["toPlain"]> {
    const exploredTiles = this.getExploredTiles({ game });
    const metadata = {
      height: Math.max(0, ...exploredTiles.map(({ coord }) => coord.row + 1)),
      width: Math.max(0, ...exploredTiles.map(({ coord }) => coord.column + 1)),
    };
    const tilesCompletedWithVoid =
      this.boardService.completePartialMapWithVoidTiles({
        ...metadata,
        partialMapTiles: exploredTiles,
      });

    return {
      ...game,
      board: {
        ...game.board,
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

  private canViewEntity({
    entity,
  }: { entity: ReturnType<TileEntity["toPlain"]> }): boolean {
    return (
      entity.type === "playable-entity" ||
      ((entity.type === "non-interactive-entity" ||
        entity.type === "interactive-entity") &&
        entity.isVisible)
    );
  }

  private getExploredTiles({
    game,
  }: { game: ReturnType<Game["toPlain"]> }): Array<
    ReturnType<Tile["toPlain"]>
  > {
    const metadata = { width: game.board.width, height: game.board.height };
    const heroesCoords = this.getHeroesCoords({ game });
    const startingCoords =
      heroesCoords.length > 0
        ? heroesCoords
        : this.getStartingTilesCoords({ game });

    const exploredTiles = new Set<ReturnType<Tile["toPlain"]>>();

    for (const startingCoord of startingCoords) {
      const tile = game.board.tiles[startingCoord.toIndex(metadata)];
      if (!tile) {
        throw new Error("Tile not found");
      }

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

  private getHeroesCoords({
    game,
  }: { game: ReturnType<Game["toPlain"]> }): Array<Coord> {
    return game.playableEntities.values
      .filter((playableEntity) => playableEntity.type === "hero")
      .map((hero) => new Coord(hero.coord));
  }

  private getStartingTilesCoords({
    game,
  }: { game: ReturnType<Game["toPlain"]> }): Array<Coord> {
    return game.board.tiles
      .filter((tile) => tile.isStartingTile)
      .map((tile) => new Coord(tile.coord));
  }

  private floodFill({
    game,
    startingCoord,
  }: {
    game: ReturnType<Game["toPlain"]>;
    startingCoord: ReturnType<Coord["toPlain"]>;
  }): Array<ReturnType<Tile["toPlain"]>> {
    const metadata = { width: game.board.width, height: game.board.height };
    const startingTile =
      game.board.tiles[new Coord(startingCoord).toIndex(metadata)];
    if (!startingTile) {
      throw new Error("Tile not found");
    }

    const tilesVisited = new Set([startingTile]);
    const tilesToVisit = new Coord(startingCoord)
      .getNeighbours()
      .map((coord) => game.board.tiles[coord.toIndex(metadata)])
      .filter(
        (tile): tile is ReturnType<Tile["toPlain"]> =>
          tile !== undefined && tilesVisited.has(tile),
      );

    let currentTile = tilesToVisit.shift();
    while (currentTile !== undefined) {
      if (this.isVisitableTile({ tile: currentTile })) {
        const validNeighbouringTiles = new Coord(currentTile.coord)
          .getNeighbours()
          .map((coord) => game.board.tiles[coord.toIndex(metadata)])
          .filter(
            (tile): tile is ReturnType<Tile["toPlain"]> =>
              tile !== undefined && tilesVisited.has(tile),
          );
        tilesToVisit.push(...validNeighbouringTiles);
      }

      tilesVisited.add(currentTile);

      currentTile = tilesToVisit.shift();
    }

    return Array.from(tilesVisited);
  }

  private isVisitableTile({
    tile,
  }: { tile: ReturnType<Tile["toPlain"]> }): boolean {
    return tile.entities.every(
      (entity) =>
        entity.type === "playable-entity" ||
        ((entity.type === "interactive-entity" ||
          entity.type === "non-interactive-entity") &&
          entity.isBlocking === false),
    );
  }
}
