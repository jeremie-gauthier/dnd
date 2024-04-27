import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VisibilityService {
  public getMapForHero({ game }: { game: GameEntity }): GameEntity {
    return {
      ...game,
      map: {
        ...game.map,
        tiles: game.map.tiles.map((tile) => {
          return {
            ...tile,
            entities: tile.entities.filter((entity) => {
              return !(
                entity.type === "non-playable-interactive-entity" &&
                !entity.isVisible
              );
            }),
          };
        }),
      },
    };
  }

  public getMapForGameMaster({ game }: { game: GameEntity }): GameEntity {
    return game;
  }
}
