import type { ChangePositionInput, Coord, GameEntity } from "@dnd/shared";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { Hero } from "src/database/entities/hero.entity";
import type { User } from "src/database/entities/user.entity";
import { translateCoordToIndex } from "src/game/map/utils/translate-coord-to-index.util";
import { MovesService } from "src/game/moves/services/moves.service";
import type { MessageContext } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import { ChangePositionRepository } from "./change-position.repository";

@Injectable()
export class ChangePositionUseCase implements UseCase {
  constructor(
    private readonly movesService: MovesService,
    private readonly repository: ChangePositionRepository,
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

    this.movesService.moveHeroToRequestedPosition({
      game,
      heroId,
      requestedPosition,
    });
    await this.repository.updateGame(game);

    // TODO: add emitter "entity position changed" or smthg like that
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
}
