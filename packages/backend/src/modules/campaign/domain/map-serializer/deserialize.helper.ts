import type {
  Coord,
  Tile,
  TileEntity,
  TileNonPlayableInteractiveEntity,
  TileNonPlayableNonInteractiveEntity,
} from "@dnd/shared";
import {
  DoorEntity,
  TrapEntity,
} from "@dnd/shared/dist/database/game/interactive-entities.type";
import { InternalServerErrorException } from "@nestjs/common";
import { CoordService } from "../coord/coord.service";

const coordService = new CoordService();

const NON_PLAYABLE_NON_INTERACTIVE_TILE_ENTITY = [
  "wall",
  "pillar",
  "tree",
  "off-map",
];
const NON_PLAYABLE_INTERACTIVE_TILE_ENTITY = ["door", "trap"];

export function inferOffMapTileEntities({
  tiles,
  startingPositions,
  metadata,
}: {
  tiles: Tile[];
  startingPositions: Coord[];
  metadata: { width: number; height: number };
}): void {
  const isNonBlockingEntity = (entity: TileEntity) =>
    entity.type === "playable-entity" ||
    entity.kind === "door" ||
    entity.isBlocking === false;
  const addTileToExploreAt = (coord: Coord): Coord | undefined => {
    if (
      coord.column < 0 ||
      coord.column >= metadata.width ||
      coord.row < 0 ||
      coord.row > metadata.height
    )
      return;

    const tileIndex = coordService.coordToIndex({ coord, metadata });
    const tile = tiles[tileIndex];
    if (!tile) return;

    if (
      !reachableTiles.has(tileIndex) &&
      tile.entities.every((entity) => isNonBlockingEntity(entity))
    ) {
      coordsToExploreQueue.push(coord);
    }
  };

  const reachableTiles = new Set();

  const coordsToExploreQueue: Coord[] = [];
  let currentCoordExplored: Coord | undefined = startingPositions[0];
  while (currentCoordExplored !== undefined) {
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

    reachableTiles.add(
      coordService.coordToIndex({ coord: currentCoordExplored, metadata }),
    );

    currentCoordExplored = coordsToExploreQueue.shift();
  }

  for (const tile of tiles) {
    const tileIndex = coordService.coordToIndex({
      coord: tile.coord,
      metadata,
    });
    if (reachableTiles.has(tileIndex) || tile.entities.length > 0) continue;

    tile.entities.push({
      type: "non-interactive-entity",
      kind: "off-map",
      isVisible: true,
      isBlocking: true,
      canInteract: false,
    });
  }
}

export function parseStartingPositions(
  startingPositionsCompiled?: string,
): Coord[] {
  if (!startingPositionsCompiled) {
    throw new InternalServerErrorException(
      "Error while parsing starting positions (not found)",
    );
  }

  const startingPositions = startingPositionsCompiled.split(";");
  return startingPositions.map((startingPosition) =>
    parseCoord(startingPosition),
  );
}

export function addStartingPositions({
  tiles,
  startingPositions,
  metadata,
}: {
  tiles: Tile[];
  startingPositions: Coord[];
  metadata: { width: number; height: number };
}): void {
  for (const startingPosition of startingPositions) {
    const idx = coordService.coordToIndex({
      coord: startingPosition,
      metadata,
    });
    const tile = tiles[idx];
    if (!tile) {
      throw new InternalServerErrorException(
        "Error while registering a starting position (out of range)",
      );
    }

    tile.isStartingTile = true;
  }
}

export function parseTileEntities(
  entitiesCompiled: string[],
): { coord: Coord; tileEntity: TileEntity }[] {
  return entitiesCompiled.map((entityCompiled) => {
    const [coordCompiled, tileEntityCompiled] = entityCompiled.split(";");

    const coord = parseCoord(coordCompiled);
    const tileEntity = parseTileEntity(tileEntityCompiled);

    return { coord, tileEntity };
  });
}

function parseCoord(coordCompiled?: string): Coord {
  if (!coordCompiled) {
    throw new InternalServerErrorException(
      "Error while parsing tile coord (not found)",
    );
  }

  const [row, column] = coordCompiled.split(",");

  const coord = {
    row: Number(row),
    column: Number(column),
  };

  if (
    Object.values(coord).some((data) => !Number.isInteger(data) || data < 0)
  ) {
    throw new InternalServerErrorException(
      "Error while parsing tile coord (type)",
    );
  }

  return coord;
}

function parseTileEntity(entityCompiled?: string): TileEntity {
  if (!entityCompiled) {
    throw new InternalServerErrorException(
      "Error while parsing tile entity (not found)",
    );
  }

  const [kind, ...extras] = entityCompiled.split(",");
  if (!kind) {
    throw new InternalServerErrorException(
      "Error while parsing tile entity kind (not found)",
    );
  }

  if (isNonPlayableNonInteractiveTileEntity(kind)) {
    return {
      type: "non-interactive-entity",
      kind,
      isVisible: true,
      isBlocking: true,
      canInteract: false,
    };
  } else if (isNonPlayableInteractiveTileEntity(kind)) {
    return {
      type: "interactive-entity",
      ...getNonPlayableInteractiveEntityAttributes(kind),
    } as TileNonPlayableInteractiveEntity;
  } else if (isPlayableTileEntity(kind)) {
    return {
      type: "playable-entity",
      ...parsePlayableEntityAttributes(extras),
    };
  } else {
    throw new InternalServerErrorException(
      "Error while parsing tile entity kind (unknown)",
    );
  }
}

function isNonPlayableNonInteractiveTileEntity(
  kind: string,
): kind is TileNonPlayableNonInteractiveEntity["kind"] {
  return NON_PLAYABLE_NON_INTERACTIVE_TILE_ENTITY.includes(kind);
}

function isNonPlayableInteractiveTileEntity(
  kind: string,
): kind is TileNonPlayableInteractiveEntity["kind"] {
  return NON_PLAYABLE_INTERACTIVE_TILE_ENTITY.includes(kind);
}

function isPlayableTileEntity(kind: string): boolean {
  return kind === "playable";
}

function getNonPlayableInteractiveEntityAttributes(
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

function parsePlayableEntityAttributes(extras: string[]): { id: string } {
  const [id] = extras;
  if (!id) {
    throw new InternalServerErrorException(
      "Error while parsing playable entity (id not found)",
    );
  }

  return { id };
}

export function addTileEntities({
  tiles,
  tileEntities,
  metadata,
}: {
  tiles: Tile[];
  tileEntities: { coord: Coord; tileEntity: TileEntity }[];
  metadata: { width: number; height: number };
}): void {
  for (const { coord, tileEntity } of tileEntities) {
    const idx = coordService.coordToIndex({ coord, metadata });
    const tile = tiles[idx];
    if (!tile) {
      throw new InternalServerErrorException(
        "Error while registering a tile entity (out of range)",
      );
    }

    tile.entities.push(tileEntity);
  }
}
