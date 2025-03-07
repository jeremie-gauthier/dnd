import {
  PlayableEntityRaceType,
  coordToIndex,
  indexToCoord,
} from "@dnd/shared";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import { Board } from "src/modules/game/domain/board/board.entity";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { OnDoorOpeningSpawnMonsters } from "src/modules/game/domain/game-events/game-event/on-door-opening/spawn-monsters.entity";
import { GameEvents } from "src/modules/game/domain/game-events/game-events.aggregate";
import { BoundingBox } from "src/modules/game/domain/rooms/room/bounding-box/bounding-box.entity";
import { Room } from "src/modules/game/domain/rooms/room/room.entity";
import { Rooms } from "src/modules/game/domain/rooms/rooms.aggregate";
import { Chest } from "src/modules/game/domain/tile/tile-entity/interactive/chest.entity";
import { Door } from "src/modules/game/domain/tile/tile-entity/interactive/door.entity";
import { Trap } from "src/modules/game/domain/tile/tile-entity/interactive/trap.entity";
import { TileNonInteractiveEntity } from "src/modules/game/domain/tile/tile-entity/non-interactive/non-interactive.entity";
import { Tile } from "src/modules/game/domain/tile/tile.entity";
import { DefeatAllMonsters } from "src/modules/game/domain/win-conditions/win-condition/defeat-all-monsters.win-condition";
import { WinConditions } from "src/modules/game/domain/win-conditions/win-conditions.aggregate";
import {
  GAME_TEMPLATE_DEV_REPOSITORY,
  GameTemplateDevRepository,
} from "../../repositories/game-template-dev-repository.interface";
import { GameTemplateJson } from "./create-game-template-from-json.interface";

@Injectable()
export class CreateGameTemplateFromJsonUseCase implements UseCase {
  constructor(
    @Inject(GAME_TEMPLATE_DEV_REPOSITORY)
    private readonly gameTemplateDevRepository: GameTemplateDevRepository,
  ) {}

  public async execute({
    gameTemplate,
  }: { gameTemplate: GameTemplateJson }): Promise<void> {
    const tiles = this.createBoardTiles({ gameTemplate });

    const board = new Board({
      height: gameTemplate.board.height,
      width: gameTemplate.board.width,
      rooms: new Rooms({
        values: gameTemplate.board.rooms.map(
          (room) =>
            new Room({
              id: room.id,
              hasBeenVisited: room.hasBeenVisited,
              boundingBoxes: room.boundingBoxes.map(
                (boundingBox) =>
                  new BoundingBox({
                    topLeft: new Coord(boundingBox.topLeft),
                    bottomRight: new Coord(boundingBox.bottomRight),
                  }),
              ),
            }),
        ),
      }),
      tiles,
    });

    const gameEvents = new GameEvents({
      values: gameTemplate.board.events.map(
        (event) =>
          new OnDoorOpeningSpawnMonsters({
            data: {
              doorCoord: new Coord(event.doorCoord),
              monsters: event.monsters as Array<PlayableEntityRaceType>,
              startingRooms: event.startingRooms,
            },
          }),
      ),
    });

    const winConditions = new WinConditions({
      values: gameTemplate.board.winConditions.map(
        (winCondition) =>
          new DefeatAllMonsters({
            nbMonstersRemaining: winCondition.nbMonstersRemaining,
          }),
      ),
    });

    await this.gameTemplateDevRepository.create({
      campaignId: gameTemplate.campaignId,
      board,
      gameEvents,
      winConditions,
    });
  }

  private createBoardTiles({
    gameTemplate,
  }: { gameTemplate: GameTemplateJson }): Array<Tile> {
    const startingPositionCoords = gameTemplate.board.startingPositions.map(
      (pos) => new Coord(pos),
    );
    const metadata = {
      height: gameTemplate.board.height,
      width: gameTemplate.board.width,
    };

    const tiles = this.createDummyTiles(metadata, startingPositionCoords);

    // adding entities
    for (const { row, column, kind } of gameTemplate.board.entities) {
      const idx = coordToIndex({ coord: { row, column }, metadata });
      const tile = tiles[idx]!;

      const tileEntity = this.createTileEntity({ kind });
      tile.entities.push(tileEntity);
    }

    // infering the off-map tiles
    this.addOffMapTileEntities({
      tiles,
      startingPositions: startingPositionCoords,
      metadata,
    });

    return tiles;
  }

  private createDummyTiles(
    metadata: { width: number; height: number },
    startingPositionCoords: Array<Coord>,
  ) {
    return Array.from({ length: metadata.width * metadata.height }).map(
      (_, index) => {
        const coord = new Coord(indexToCoord({ index, metadata }));
        return new Tile({
          coord,
          entities: [],
          isStartingTile: startingPositionCoords.some((startingPosCoord) =>
            startingPosCoord.equals(coord),
          ),
        });
      },
    );
  }

  private createTileEntity({
    kind,
  }: { kind: string }): Trap | Chest | Door | TileNonInteractiveEntity {
    switch (kind) {
      case "wall":
      case "pillar":
      case "tree":
      case "off_map":
        return new TileNonInteractiveEntity({ kind });
      case "door":
        return new Door({
          canInteract: true,
          isBlocking: true,
          isVisible: true,
        });
      case "trap":
        return new Trap({
          canInteract: true,
          isBlocking: false,
          isVisible: false,
          name: "pit",
        });
      case "chest":
        return new Chest({
          canInteract: true,
          isBlocking: true,
          isVisible: true,
        });
      default:
        throw new InternalServerErrorException(
          `Error while parsing tile entity kind (${kind})`,
        );
    }
  }

  public addOffMapTileEntities({
    tiles,
    startingPositions,
    metadata,
  }: {
    tiles: Tile[];
    startingPositions: Coord[];
    metadata: { width: number; height: number };
  }): void {
    const addTileToExploreAt = (coord: Coord): Coord | undefined => {
      if (coord.column >= metadata.width || coord.row >= metadata.height)
        return;

      const tileIndex = coordToIndex({ coord, metadata });
      const tile = tiles[tileIndex];
      if (!tile) return;

      if (
        !reachableTiles.has(tileIndex) &&
        tile.entities.every((entity) => entity.isBlocking === false) &&
        !coordsToExploreQueue.some((coordToExplore) =>
          coordToExplore.equals(tile.coord),
        )
      ) {
        coordsToExploreQueue.push(coord);
      }
    };

    const reachableTiles = new Set();

    const coordsToExploreQueue: Coord[] = [];
    let currentCoordExplored: Coord | undefined = startingPositions[0];
    while (currentCoordExplored !== undefined) {
      reachableTiles.add(currentCoordExplored.toIndex(metadata));

      const neighbours = currentCoordExplored.getNeighbours();
      for (const neighbour of neighbours) {
        addTileToExploreAt(neighbour);
      }

      currentCoordExplored = coordsToExploreQueue.shift();
    }

    for (const tile of tiles) {
      const tileIndex = tile.coord.toIndex(metadata);
      if (reachableTiles.has(tileIndex) || tile.entities.length > 0) continue;

      tile.addEntity({
        tileEntity: new TileNonInteractiveEntity({
          kind: "off_map",
        }),
      });
    }
  }
}
