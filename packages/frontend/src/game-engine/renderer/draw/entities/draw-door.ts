import type { Coord } from "@dnd/shared";
import { flipVertically } from "../utils/flip-vertically.util";
import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawDoor({ context, config, subject }: EntityDrawerParams) {
  if (subject.entity.type !== "non-playable-interactive-entity") return;

  const isClosed = subject.entity.isBlocking;
  const doorAsset = isClosed
    ? config.assets.door_close
    : config.assets.door_open;

  const shouldFlip = getShouldFlip({ config, subject });
  // ? I don't understand why this -3 offset works but I need to go on for now
  const flipOffset = shouldFlip ? -3 : 1;

  if (shouldFlip) {
    context.save();
    flipVertically(context);
  }

  context.drawImage(
    doorAsset,
    subject.coordIsometric.column * flipOffset,
    subject.coordIsometric.row -
      getElevationOffset({
        options: {
          assetHeight: config.assetSize,
        },
        elevationLevel: 0.5,
      }),
  );

  if (shouldFlip) {
    context.restore();
  }
}

type Input = {
  coord: Coord;
  metadata: {
    width: number;
    height: number;
  };
};

export function translateCoordToIndex({ coord, metadata }: Input): number {
  return coord.row * metadata.width + coord.column;
}

const getShouldFlip = ({
  config,
  subject,
}: Pick<EntityDrawerParams, "config" | "subject">): boolean => {
  const { row, column } = subject.coord2D;
  const leftTile = translateCoordToIndex({
    coord: { row, column: column - 1 },
    metadata: { height: config.map.height, width: config.map.width },
  });
  const rightTile = translateCoordToIndex({
    coord: { row, column: column + 1 },
    metadata: { height: config.map.height, width: config.map.width },
  });

  const leftTileHasWall =
    config.map.tiles[leftTile]?.entities.some(
      ({ type }) => type === "non-playable-non-interactive-entity",
    ) ?? true;

  const rightTileHasWall =
    config.map.tiles[rightTile]?.entities.some(
      ({ type }) => type === "non-playable-non-interactive-entity",
    ) ?? true;

  const shouldFlip = leftTileHasWall && rightTileHasWall;

  return shouldFlip;
};
