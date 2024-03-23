import { GameEntity, Tile } from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { MovesService } from "src/game/moves/moves.service";
import { GameEvent } from "../../emitters/game-events.enum";
import type { GameInitializationDonePayload } from "../../emitters/game-initialization-done.payload";
import { GamePreparationPhaseStartedPayload } from "../../emitters/game-preparation-phase-started.payload";
import { GamePreparationPhaseRepository } from "./game-preparation-phase.repository";

@Injectable()
export class GamePreparationPhaseListener {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: GamePreparationPhaseRepository,
    private readonly movesService: MovesService,
  ) {}

  @OnEvent(GameEvent.GameInitializationDone)
  public async handler({ game, ctx, lobbyId }: GameInitializationDonePayload) {
    this.randomlyPlaceHeroesOnStartingTiles(game);
    await this.repository.saveGame(game);

    this.eventEmitter.emitAsync(
      GameEvent.GamePreparationPhaseStarted,
      new GamePreparationPhaseStartedPayload({ ctx, game, lobbyId }),
    );
  }

  private randomlyPlaceHeroesOnStartingTiles(game: GameEntity): void {
    const playableEntities = Object.values(game.playableEntities);
    for (const playableEntity of playableEntities) {
      if (playableEntity.type !== "hero") continue;

      const firstFreeStartingTile = this.getFirstFreeStartingTileOrThrow(game);
      this.movesService.moveHeroToRequestedPosition({
        game,
        heroId: playableEntity.id,
        requestedPosition: firstFreeStartingTile.coord,
      });
    }
  }

  private getFirstFreeStartingTileOrThrow(game: GameEntity): Tile {
    const firstFreeStartingTile = game.map.tiles.find(
      (tile) => tile.isStartingTile,
    );
    if (!firstFreeStartingTile) {
      throw new NotFoundException("No free starting tile found");
    }

    return firstFreeStartingTile;
  }
}
