import {
  type ChestEntity,
  type Coord,
  type DoorEntity,
  type GameView,
  type MapCompiledJson,
  type Room,
  type Tile,
  type TileEntity,
  type TileNonPlayableInteractiveEntity,
  type TileNonPlayableNonInteractiveEntity,
  type TrapEntity,
  type WinCondition,
  coordToIndex,
} from "@dnd/shared";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
import { GameBoardDeserialized } from "src/modules/shared/interfaces/game-board-deserialized.interface";
import {
  GameEventDeserialized,
  OnDoorOpeningGameEvent,
} from "src/modules/shared/interfaces/game-events-deserialized.interface";
import { CoordService } from "../coord/coord.service";

@Injectable()
export class MapSerializerService {
  private static readonly NON_PLAYABLE_NON_INTERACTIVE_TILE_ENTITY = [
    "wall",
    "pillar",
    "tree",
    "off-map",
  ];
  private static readonly NON_PLAYABLE_INTERACTIVE_TILE_ENTITY = [
    "door",
    "trap",
    "chest",
  ];

  constructor(private readonly coordService: CoordService) {}

  public serialize(_map: GameView["board"]): string {
    throw new Error("Not implemented");
  }

  public deserialize(mapCompiled: MapCompiledJson): {
    map: GameBoardDeserialized;
    events: GameEventDeserialized[];
    winConditions: WinCondition[];
    rooms: Room[];
  } {
    const metadata = {
      width: mapCompiled.width,
      height: mapCompiled.height,
    };
    this.assertsValidMetadata(metadata);

    const tiles = this.createDummyTiles(metadata);

    // adding starting positions
    this.assertsHasStartingPositions(mapCompiled);
    for (const startingPosition of mapCompiled.startingPositions) {
      const idx = this.coordService.coordToIndex({
        coord: startingPosition,
        metadata,
      });
      const tile = tiles[idx];
      this.assertsValidTile(tile);
      tile.isStartingTile = true;
    }

    // adding entities
    for (const { row, column, kind } of mapCompiled.entities) {
      const idx = this.coordService.coordToIndex({
        coord: { row, column },
        metadata,
      });
      const tile = tiles[idx];
      this.assertsValidTile(tile);

      const tileEntity = this.createTileEntity({ kind });
      tile.entities.push(tileEntity);
    }

    // infering the off-map tiles
    this.addOffMapTileEntities({
      tiles,
      startingPositions: mapCompiled.startingPositions,
      metadata,
    });

    // parsing rooms
    this.assertsValidRooms({ rooms: mapCompiled.rooms, tiles, metadata });

    this.assertsValidEvents({ tiles, events: mapCompiled.events, metadata });
    this.assertsValidWinConditions({
      winConditions: mapCompiled.winConditions,
    });

    return {
      map: { ...metadata, tiles },
      events: mapCompiled.events,
      winConditions: mapCompiled.winConditions,
      rooms: mapCompiled.rooms,
    };
  }

  private assertsValidRooms({
    rooms,
    tiles,
    metadata,
  }: {
    rooms: MapCompiledJson["rooms"];
    tiles: Tile[];
    metadata: { width: number; height: number };
  }) {
    const ids = new Set(rooms.map(({ id }) => id));
    if (ids.size < rooms.length) {
      throw new InternalServerErrorException("Duplicate room identifier found");
    }

    const boundingBoxCoords = rooms.flatMap(({ boundingBoxes }) =>
      boundingBoxes.flatMap(({ topLeft, bottomRight }) => [
        topLeft,
        bottomRight,
      ]),
    );
    const hasSomeInvalidBoundingBoxCoord = boundingBoxCoords.some(
      (boundingBoxCoord) => {
        const tileIdx = coordToIndex({ coord: boundingBoxCoord, metadata });
        return tiles[tileIdx] === undefined;
      },
    );
    if (hasSomeInvalidBoundingBoxCoord) {
      throw new InternalServerErrorException(
        "Invalid bounding box coord found in rooms",
      );
    }
  }

  private assertsValidWinConditions({
    winConditions,
  }: { winConditions: MapCompiledJson["winConditions"] }) {
    for (const winCondition of winConditions) {
      if (
        winCondition.name === "defeat_all_monsters" &&
        winCondition.nbMonstersRemaining <= 0
      ) {
        throw new InternalServerErrorException(
          `Invalid win condition detected. The 'defeat_all_monsters' objective must have a positive number of monsters remaining declared. Found ${winCondition.nbMonstersRemaining}.`,
        );
      }
    }
  }

  private createTileEntity({
    kind,
  }: Pick<
    Extract<
      TileEntity,
      { type: "NON_INTERACTIVE_ENTITY" | "INTERACTIVE_ENTITY" }
    >,
    "kind"
  >): TileEntity {
    if (this.isNonPlayableNonInteractiveTileEntity(kind)) {
      return {
        type: TileEntityType.NON_INTERACTIVE_ENTITY,
        kind,
        isVisible: true,
        isBlocking: true,
        canInteract: false,
      };
    } else if (this.isNonPlayableInteractiveTileEntity(kind)) {
      return {
        type: TileEntityType.INTERACTIVE_ENTITY,
        ...this.getNonPlayableInteractiveEntityAttributes(kind),
      } as TileNonPlayableInteractiveEntity;
    } else {
      throw new InternalServerErrorException(
        `Error while parsing tile entity kind (${kind})`,
      );
    }
  }

  private getNonPlayableInteractiveEntityAttributes(
    kind: TileNonPlayableInteractiveEntity["kind"],
  ): Omit<TileNonPlayableInteractiveEntity, "type"> {
    switch (kind) {
      case "door":
        return {
          kind,
          canInteract: true,
          isBlocking: true,
          isVisible: true,
        } as Omit<DoorEntity, "type">;
      case "trap":
        return {
          kind,
          canInteract: true,
          isBlocking: false,
          isVisible: false,
          name: "pit",
        } as Omit<TrapEntity, "type">;
      case "chest":
        return {
          kind: "chest",
          canInteract: true,
          isBlocking: true,
          isVisible: true,
        } as Omit<ChestEntity, "type">;
    }
  }

  private isNonPlayableNonInteractiveTileEntity(
    kind: string,
  ): kind is TileNonPlayableNonInteractiveEntity["kind"] {
    return MapSerializerService.NON_PLAYABLE_NON_INTERACTIVE_TILE_ENTITY.includes(
      kind,
    );
  }

  private isNonPlayableInteractiveTileEntity(
    kind: string,
  ): kind is TileNonPlayableInteractiveEntity["kind"] {
    return MapSerializerService.NON_PLAYABLE_INTERACTIVE_TILE_ENTITY.includes(
      kind,
    );
  }
  private assertsValidMetadata({
    height,
    width,
  }: Pick<MapCompiledJson, "height" | "width">): void {
    if (
      !Number.isInteger(height) ||
      height <= 0 ||
      !Number.isInteger(width) ||
      width <= 0
    ) {
      throw new InternalServerErrorException(
        "Error while parsing map metadata (type)",
      );
    }
  }

  private assertsHasStartingPositions({
    startingPositions,
  }: Pick<MapCompiledJson, "startingPositions">): void {
    if (startingPositions.length <= 0) {
      throw new InternalServerErrorException(
        "Error while parsing starting positions (not found). A valid map must have at least one starting position",
      );
    }
  }

  private assertsValidTile(tile: Tile | undefined): asserts tile is Tile {
    if (!tile) {
      throw new InternalServerErrorException(
        "Error while registering a starting position (out of range)",
      );
    }
  }

  private assertsValidEvents({
    tiles,
    events,
    metadata,
  }: Pick<MapCompiledJson, "events"> & {
    tiles: Tile[];
    metadata: { width: number; height: number };
  }): void {
    for (const event of events) {
      if (event.name === "on_door_opening") {
        this.assertValidDoorOpeningEvent({ tiles, event, metadata });
      } else {
        throw new InternalServerErrorException("Game event not recognized");
      }
    }
  }

  private assertValidDoorOpeningEvent({
    tiles,
    event,
    metadata,
  }: {
    tiles: Tile[];
    event: OnDoorOpeningGameEvent;
    metadata: { width: number; height: number };
  }): void {
    const doorCoordIdx = this.coordService.coordToIndex({
      coord: event.doorCoord,
      metadata,
    });
    const tile = tiles[doorCoordIdx];

    if (!tile) {
      throw new InternalServerErrorException(
        "Bad event coord (tile not found)",
      );
    }

    if (
      !tile.entities.some(
        (entity) =>
          entity.type === TileEntityType.INTERACTIVE_ENTITY &&
          entity.kind === "door",
      )
    ) {
      throw new InternalServerErrorException(
        "Bad event coord (door not found)",
      );
    }

    if (
      event.action === "spawn_monsters" &&
      event.startingTiles.length < event.monsters.length
    ) {
      throw new InternalServerErrorException(
        "Not enough starting tiles defined",
      );
    }

    if (
      event.action === "spawn_monsters" &&
      event.startingTiles.some((startingTile) => {
        const startingTileIdx = this.coordService.coordToIndex({
          coord: startingTile,
          metadata,
        });
        const tile = tiles[startingTileIdx];
        return tile === undefined;
      })
    ) {
      throw new InternalServerErrorException("Bad starting tile coord");
    }
  }

  private createDummyTiles({
    width,
    height,
  }: { width: number; height: number }): Tile[] {
    return Array.from({ length: width * height }).map((_, index) => ({
      coord: this.coordService.indexToCoord({
        index,
        metadata: { width, height },
      }),
      entities: [],
      isStartingTile: false,
    }));
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
    const isNonBlockingEntity = (entity: TileEntity) =>
      entity.type === TileEntityType.PLAYABLE_ENTITY ||
      entity.kind === "door" ||
      entity.isBlocking === false;
    const addTileToExploreAt = (coord: Coord): Coord | undefined => {
      if (
        coord.column < 0 ||
        coord.column >= metadata.width ||
        coord.row < 0 ||
        coord.row >= metadata.height
      )
        return;

      const tileIndex = this.coordService.coordToIndex({ coord, metadata });
      const tile = tiles[tileIndex];
      if (!tile) return;

      if (
        !reachableTiles.has(tileIndex) &&
        tile.entities.every((entity) => isNonBlockingEntity(entity)) &&
        !coordsToExploreQueue.some(
          ({ row, column }) =>
            row === tile.coord.row && column === tile.coord.column,
        )
      ) {
        coordsToExploreQueue.push(coord);
      }
    };

    const reachableTiles = new Set();

    const coordsToExploreQueue: Coord[] = [];
    let currentCoordExplored: Coord | undefined = startingPositions[0];
    while (currentCoordExplored !== undefined) {
      reachableTiles.add(
        this.coordService.coordToIndex({
          coord: currentCoordExplored,
          metadata,
        }),
      );

      addTileToExploreAt({
        column: currentCoordExplored.column,
        row: currentCoordExplored.row + 1,
      });
      addTileToExploreAt({
        column: currentCoordExplored.column,
        row: currentCoordExplored.row - 1,
      });
      addTileToExploreAt({
        column: currentCoordExplored.column + 1,
        row: currentCoordExplored.row,
      });
      addTileToExploreAt({
        column: currentCoordExplored.column - 1,
        row: currentCoordExplored.row,
      });

      currentCoordExplored = coordsToExploreQueue.shift();
    }

    for (const tile of tiles) {
      const tileIndex = this.coordService.coordToIndex({
        coord: tile.coord,
        metadata,
      });
      if (reachableTiles.has(tileIndex) || tile.entities.length > 0) continue;

      tile.entities.push({
        type: TileEntityType.NON_INTERACTIVE_ENTITY,
        kind: "off-map",
        isVisible: true,
        isBlocking: true,
        canInteract: false,
      });
    }
  }
}
