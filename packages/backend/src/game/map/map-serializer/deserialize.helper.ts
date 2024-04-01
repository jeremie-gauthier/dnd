import type {
  Coord,
  Tile,
  TileEntity,
  TileNonPlayableInteractiveEntity,
  TileNonPlayableNonInteractiveEntity,
} from "@dnd/shared";
import { InternalServerErrorException } from "@nestjs/common";
import { translateCoordToIndex } from "../utils/translate-coord-to-index.util";
import { translateIndexToCoord } from "../utils/translate-index-to-coord.util";

const NON_PLAYABLE_NON_INTERACTIVE_TILE_ENTITY = [
  "wall",
  "pillar",
  "tree",
  "off-map",
];
const NON_PLAYABLE_INTERACTIVE_TILE_ENTITY = ["door", "trap"];

export function parseFile(mapCompiled: string): string[] {
  return mapCompiled.split("\n");
}

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
    const tileIndex = translateCoordToIndex({ coord, metadata });
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
      translateCoordToIndex({ coord: currentCoordExplored, metadata }),
    );

    currentCoordExplored = coordsToExploreQueue.shift();
  }

  for (const tile of tiles) {
    const tileIndex = translateCoordToIndex({ coord: tile.coord, metadata });
    if (reachableTiles.has(tileIndex) || tile.entities.length > 0) continue;

    tile.entities.push({
      type: "non-playable-non-interactive-entity",
      kind: "off-map",
      isVisible: true,
      isBlocking: true,
      canInteract: false,
    });
  }
}

export function createDummyTiles({
  width,
  height,
}: { width: number; height: number }): Tile[] {
  return Array.from({ length: width * height }).map((_, index) => ({
    // rely only on width even if the height is different
    // as the resulting array is just a "`height` chunks of `width` size"
    coord: translateIndexToCoord({ index, metadata: { width, height } }),
    entities: [],
  }));
}

export function parseMetadata(metadataCompiled?: string): {
  width: number;
  height: number;
} {
  if (!metadataCompiled) {
    throw new InternalServerErrorException(
      "Error while parsing map metadata (not found)",
    );
  }

  const [height, width] = metadataCompiled.split(";");

  const metadata = {
    width: Number(width),
    height: Number(height),
  };

  if (
    Object.values(metadata).some((data) => !Number.isInteger(data) || data <= 0)
  ) {
    throw new InternalServerErrorException(
      "Error while parsing map metadata (type)",
    );
  }

  return metadata;
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
    const idx = translateCoordToIndex({ coord: startingPosition, metadata });
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
      type: "non-playable-non-interactive-entity",
      kind,
      isVisible: true,
      isBlocking: true,
      canInteract: false,
    };
  } else if (isNonPlayableInteractiveTileEntity(kind)) {
    return {
      type: "non-playable-interactive-entity",
      kind,
      ...getNonPlayableInteractiveEntityAttributes(kind),
    };
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
): { canInteract: boolean; isBlocking: boolean; isVisible: boolean } {
  switch (kind) {
    case "door":
      return { canInteract: true, isBlocking: true, isVisible: true };
    case "trap":
      return { canInteract: true, isBlocking: false, isVisible: false };
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
    const idx = translateCoordToIndex({ coord, metadata });
    const tile = tiles[idx];
    if (!tile) {
      throw new InternalServerErrorException(
        "Error while registering a tile entity (out of range)",
      );
    }

    tile.entities.push(tileEntity);
  }
}

export function sanitize(input: string): string {
  return input.replace(/\s+/g, "\n").trim();
}
