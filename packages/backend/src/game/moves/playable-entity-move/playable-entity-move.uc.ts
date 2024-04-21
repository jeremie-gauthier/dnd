import {
  Coord,
  GameEntity,
  PlayableEntity,
  PlayableEntityMoveInput,
  Tile,
  coordToIndex,
  getNeighbourCoords,
  unfoldTilePath,
} from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { PlayableEntityMovedPayload } from "src/game/events/emitters/playable-entity-moved.payload";
import { MessageContext } from "src/types/socket.type";
import { UseCase } from "src/types/use-case.interface";
import { MovesService } from "../services/moves.service";
import { PlayableEntityMoveRepository } from "./playable-entity-move.repository";

@Injectable()
export class PlayableEntityMoveUseCase implements UseCase {
  constructor(
    private readonly repository: PlayableEntityMoveRepository,
    private readonly movesSerivce: MovesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    ctx,
    gameId,
    pathToTile,
    playableEntityId,
    userId,
  }: PlayableEntityMoveInput & {
    ctx: MessageContext;
    userId: User["id"];
  }): Promise<void> {
    const game = await this.repository.getGameById({ gameId });

    this.assertCanMovePlayableEntity(game, {
      playableEntityId,
      userId,
    });

    this.getPlayableEntityPath({ game, pathToTile, playableEntityId });

    await this.repository.updateGame({ game });

    this.eventEmitter.emitAsync(
      GameEvent.PlayableEntityMoved,
      new PlayableEntityMovedPayload({ ctx, game }),
    );
  }

  private assertCanMovePlayableEntity(
    game: GameEntity | null,
    {
      playableEntityId,
      userId,
    }: {
      userId: User["id"];
      playableEntityId: PlayableEntity["id"];
    },
  ): asserts game is GameEntity {
    if (!game) {
      throw new NotFoundException("Game not found");
    }

    const playableEntity = game.playableEntities[playableEntityId];
    if (!playableEntity) {
      throw new NotFoundException("Playable entity not found in this game");
    }

    if (playableEntity.playedByUserId !== userId) {
      throw new ForbiddenException(
        "Cannot move a playable entity that you does not own",
      );
    }

    if (playableEntity.currentPhase !== "action") {
      throw new ForbiddenException(
        "Cannot move a playable entity that is not in action phase",
      );
    }

    if (playableEntity.healthPoints === 0) {
      throw new ForbiddenException(
        "Cannot move a playable entity that is not alive",
      );
    }

    if (playableEntity.movementPoints === 0) {
      throw new ForbiddenException(
        "Playable entity has no movement points left",
      );
    }
  }

  private getPlayableEntityPath({
    game,
    pathToTile,
    playableEntityId,
  }: {
    game: GameEntity;
    pathToTile: PlayableEntityMoveInput["pathToTile"];
    playableEntityId: PlayableEntityMoveInput["playableEntityId"];
  }): Tile[] {
    const validTiles: Tile[] = [];

    const playableEntity = game.playableEntities[
      playableEntityId
    ] as PlayableEntity;
    const startingPlayableEntityTile = this.getPlayableEntityTile({
      game,
      playableEntity,
    });

    // slice to remove the entity self position (which is the origin in the bfs algo)
    const pathTiles = unfoldTilePath(pathToTile).slice(1);
    for (const pathTile of pathTiles) {
      if (
        !this.isPlayableEntityAbleToMoveToTile({
          game,
          playableEntity,
          tile: pathTile,
        })
      ) {
        break;
      }

      // TODO: FUTUR: traps management

      playableEntity.coord = pathTile.coord;
      playableEntity.movementPoints -= 1;

      validTiles.push(pathTile);
    }

    const finalPlayableEntityTile = this.getPlayableEntityTile({
      game,
      playableEntity,
    });

    if (startingPlayableEntityTile) {
      startingPlayableEntityTile.entities =
        startingPlayableEntityTile.entities.filter(
          (tileEntity) =>
            !(
              tileEntity.type === "playable-entity" &&
              tileEntity.id === playableEntity.id
            ),
        );
    }

    finalPlayableEntityTile?.entities.push({
      type: "playable-entity",
      id: playableEntity.id,
    });

    return validTiles;
  }

  private isPlayableEntityAbleToMoveToTile({
    game,
    playableEntity,
    tile,
  }: {
    game: GameEntity;
    playableEntity: PlayableEntity;
    tile: Tile;
  }): boolean {
    if (playableEntity.movementPoints <= 0) {
      return false;
    }

    if (
      !this.isNeighbourTiles({
        tileCoord: playableEntity.coord,
        tileToCompareCoord: tile.coord,
      })
    ) {
      return false;
    }

    if (
      !this.movesSerivce.canMoveToRequestedPosition({
        game,
        requestedPosition: tile.coord,
      })
    ) {
      return false;
    }

    return true;
  }

  private isNeighbourTiles({
    tileCoord,
    tileToCompareCoord,
  }: { tileCoord: Coord; tileToCompareCoord: Coord }): boolean {
    const neighbourCoords = getNeighbourCoords({ coord: tileCoord });
    return neighbourCoords.some(
      ({ row, column }) =>
        row === tileToCompareCoord.row && column === tileToCompareCoord.column,
    );
  }

  private getPlayableEntityTile({
    game,
    playableEntity,
  }: { game: GameEntity; playableEntity: PlayableEntity }): Tile | undefined {
    const coord = playableEntity.coord;
    const tileIdx = coordToIndex({
      coord,
      metadata: { height: game.map.height, width: game.map.width },
    });
    const tile = game.map.tiles[tileIdx];
    return tile;
  }
}
