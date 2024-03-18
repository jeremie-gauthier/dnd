import type { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawFloor({ context, config, subject }: EntityDrawerParams) {
  const isEvenTile = (subject.coord2D.column + subject.coord2D.row) % 2 === 0;
  const floorAsset = isEvenTile
    ? config.assets.floor_light
    : config.assets.floor_dark;

  context.drawImage(
    floorAsset,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}
