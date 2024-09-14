import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = {
  readonly floor_light: string;
  readonly floor_dark: string;
};

export function drawFloor({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
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
