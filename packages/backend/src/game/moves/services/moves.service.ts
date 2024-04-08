import type { Coord, GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { Hero } from "src/database/entities/hero.entity";
import { CoordService } from "src/game/map/services/coord/coord.service";

@Injectable()
export class MovesService {
  constructor(private readonly coordService: CoordService) {}

  public moveHeroToRequestedPosition({
    game,
    heroId,
    requestedPosition,
  }: {
    game: GameEntity;
    heroId: Hero["id"];
    requestedPosition: Coord;
  }): void {
    const hero = game.playableEntities[heroId]!;

    const metadata = { width: game.map.width, height: game.map.height };
    const oldTileIdx = this.coordService.coordToIndex({
      coord: hero.coord,
      metadata,
    });
    const requestedTileIdx = this.coordService.coordToIndex({
      coord: requestedPosition,
      metadata,
    });

    // remove hero from its origin position
    const oldTile = game.map.tiles[oldTileIdx];
    // can be null during game creation, where heroes are not yet positioned
    if (oldTile) {
      oldTile.entities = oldTile.entities.filter(
        (entity) => entity.type === "playable-entity" && entity.id === hero.id,
      );
    }

    // add hero to its destination position
    const requestedTile = game.map.tiles[requestedTileIdx]!;
    requestedTile.entities.push({
      type: "playable-entity",
      id: hero.id,
    });

    // update hero coords
    hero.coord = requestedPosition;
  }

  public canMoveToRequestedPosition({
    game,
    requestedPosition,
  }: {
    game: GameEntity;
    requestedPosition: Coord;
  }): boolean {
    const metadata = { width: game.map.width, height: game.map.height };
    const requestedTileIdx = this.coordService.coordToIndex({
      coord: requestedPosition,
      metadata,
    });

    const tile = game.map.tiles[requestedTileIdx];
    if (!tile) {
      return false;
    }

    return tile.entities.every(
      (entity) => entity.type !== "playable-entity" && !entity.isBlocking,
    );
  }
}
