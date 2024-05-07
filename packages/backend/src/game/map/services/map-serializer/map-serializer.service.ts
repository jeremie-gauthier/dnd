import type {
  GameEntity,
  MapCompiledJson,
  OnDoorOpeningGameEvent,
  Tile,
  TileEntity,
  TileNonPlayableInteractiveEntity,
  TileNonPlayableNonInteractiveEntity,
} from "@dnd/shared";
import {
  DoorEntity,
  TrapEntity,
} from "@dnd/shared/dist/database/game/interactive-entities.type";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CoordService } from "../coord/coord.service";
import { MapService } from "../map/map.service";

@Injectable()
export class MapSerializerService {
  private static NON_PLAYABLE_NON_INTERACTIVE_TILE_ENTITY = [
    "wall",
    "pillar",
    "tree",
    "off-map",
  ];
  private static NON_PLAYABLE_INTERACTIVE_TILE_ENTITY = ["door", "trap"];

  constructor(
    private readonly mapService: MapService,
    private readonly coordService: CoordService,
  ) {}

  public serialize(map: GameEntity["map"]): string {
    void map;
    throw new Error("Not implemented");
  }

  public deserialize(
    mapCompiled: MapCompiledJson,
  ): Pick<GameEntity, "map" | "events"> {
    const metadata = {
      width: mapCompiled.width,
      height: mapCompiled.height,
    };
    this.assertsValidMetadata(metadata);

    const tiles = this.mapService.createDummyTiles(metadata);

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
    this.mapService.addOffMapTileEntities({
      tiles,
      startingPositions: mapCompiled.startingPositions,
      metadata,
    });

    this.assertsValidEvents({ tiles, events: mapCompiled.events, metadata });

    return {
      map: { ...metadata, tiles },
      events: mapCompiled.events,
    };
  }

  private createTileEntity({
    kind,
  }: Pick<
    Extract<
      TileEntity,
      {
        type:
          | "non-playable-non-interactive-entity"
          | "non-playable-interactive-entity";
      }
    >,
    "kind"
  >): TileEntity {
    if (this.isNonPlayableNonInteractiveTileEntity(kind)) {
      return {
        type: "non-playable-non-interactive-entity",
        kind,
        isVisible: true,
        isBlocking: true,
        canInteract: false,
      };
    } else if (this.isNonPlayableInteractiveTileEntity(kind)) {
      return {
        type: "non-playable-interactive-entity",
        ...this.getNonPlayableInteractiveEntityAttributes(kind),
      } as TileNonPlayableInteractiveEntity;
    } else {
      throw new InternalServerErrorException(
        "Error while parsing tile entity kind (unknown)",
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
          entity.type === "non-playable-interactive-entity" &&
          entity.kind === "door",
      )
    ) {
      throw new InternalServerErrorException(
        "Bad event coord (door not found)",
      );
    }

    if (
      event.action === "spawn_enemies" &&
      event.startingTiles.length < event.enemies.length
    ) {
      throw new InternalServerErrorException(
        "Not enough starting tiles defined",
      );
    }

    if (
      event.action === "spawn_enemies" &&
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
}
