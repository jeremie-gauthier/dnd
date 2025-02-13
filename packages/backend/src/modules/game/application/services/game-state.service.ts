import { Injectable } from "@nestjs/common";
import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
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
      entity.type === TileEntityType.PLAYABLE_ENTITY ||
      ((entity.type === TileEntityType.NON_INTERACTIVE_ENTITY ||
        entity.type === TileEntityType.INTERACTIVE_ENTITY) &&
        entity.isVisible)
    );
  }
}
