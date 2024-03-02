import { ChangePositionInput, Coord, GameEntity } from "@dnd/shared";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { GameChangedPayload } from "src/game/events/emitters/game-changed.payload";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { translateCoordToIndex } from "src/game/map/utils/translate-coord-to-index.util";
import { MessageContext } from "src/types/socket.type";
import { UseCase } from "src/types/use-case.interface";
import { ChangePositionRepository } from "./change-position.repository";

@Injectable()
export class ChangePositionUseCase implements UseCase {
  constructor(
    private readonly repository: ChangePositionRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    ctx,
    userId,
    changePositionInputDto: { gameId, heroId, requestedPosition },
  }: {
    ctx: MessageContext;
    userId: User["id"];
    changePositionInputDto: ChangePositionInput;
  }): Promise<void> {
    const game = await this.repository.getGameById(gameId);

    this.assertsCanChangePosition(game, { userId, heroId, requestedPosition });

    this.moveHeroToRequestedPosition({ game, heroId, requestedPosition });
    await this.repository.updateGame(game);

    this.eventEmitter.emitAsync(
      GameEvent.GameChanged,
      new GameChangedPayload({ ctx, gameId }),
    );
  }

  private assertsCanChangePosition(
    game: GameEntity | null,
    {
      userId,
      heroId,
      requestedPosition,
    }: { userId: User["id"]; heroId: Hero["id"]; requestedPosition: Coord },
  ): asserts game is GameEntity {
    if (!game) {
      throw new NotFoundException("Game not found");
    }

    const isUserOwningTheHero =
      game.playableEntities[heroId]?.playedByUserId === userId;
    if (!isUserOwningTheHero) {
      throw new ForbiddenException("Cannot move a hero that you does not own");
    }

    const requestedTileIdx = translateCoordToIndex({
      coord: requestedPosition,
      metadata: { width: game.map.width, height: game.map.height },
    });
    const tile = game.map.tiles[requestedTileIdx];
    if (!tile) {
      throw new BadRequestException("Requested position is out of map");
    }

    if (!tile.isStartingTile) {
      throw new ForbiddenException("Not a valid starting position");
    }

    const isTileFree = tile.entities.every(
      (entity) =>
        entity.type !== "playable-entity" && entity.isBlocking === false,
    );
    if (!isTileFree) {
      throw new ForbiddenException(
        "Requested position is blocked by an entity",
      );
    }
  }

  private moveHeroToRequestedPosition({
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
    const oldTileIdx = translateCoordToIndex({ coord: hero.coord, metadata });
    const requestedTileIdx = translateCoordToIndex({
      coord: requestedPosition,
      metadata,
    });

    const oldTile = game.map.tiles[oldTileIdx]!;
    oldTile.entities = oldTile.entities.filter(
      (entity) => entity.type === "playable-entity" && entity.id === hero.id,
    );

    const requestedTile = game.map.tiles[requestedTileIdx]!;
    requestedTile.entities.push({
      type: "playable-entity",
      id: hero.id,
    });

    hero.coord = requestedPosition;
  }
}
