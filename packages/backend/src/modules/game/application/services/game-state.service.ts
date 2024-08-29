import { Injectable } from "@nestjs/common";
import { Game } from "../../domain/game/game.aggregate";
import { TileEntity } from "../../domain/tile/tile-entity/tile-entity.abstract";

@Injectable()
export class GameStateService {
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
    return {
      ...game,
      board: {
        ...game.board,
        tiles: game.board.tiles.map((tile) => {
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
}
