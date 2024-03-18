import type { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawWall({ context, config, subject }: EntityDrawerParams) {
  context.drawImage(
    config.assets.wall,
    subject.coordIsometric.column,
    // TODO: faire une fonction getElevationOffset au lieu de ce calcul
    subject.coordIsometric.row - config.assetSize / 2,
  );
}
