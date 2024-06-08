import { Coord, GameEntity, canMoveToRequestedPosition } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { Hero } from "src/database/entities/hero.entity";
import { MapService } from "../map/map.service";

@Injectable()
export class MoveService {
  constructor(private readonly mapService: MapService) {}

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

    // remove hero from its origin position
    const oldTile = this.mapService.getTile({ coord: hero.coord, game });
    // can be null during game creation, where heroes are not yet positioned
    if (oldTile) {
      oldTile.entities = oldTile.entities.filter(
        (entity) =>
          !(entity.type === "playable-entity" && entity.id === hero.id),
      );
    }

    // add hero to its destination position
    const requestedTile = this.mapService.getTileOrThrow({
      coord: requestedPosition,
      game,
    });
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
    const tile = this.mapService.getTileOrThrow({
      coord: requestedPosition,
      game,
    });
    return canMoveToRequestedPosition({ game, tile });
  }
}
