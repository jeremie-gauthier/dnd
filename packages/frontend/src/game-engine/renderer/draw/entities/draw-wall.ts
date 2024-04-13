import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = { readonly wall: string };

export function drawWall({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
  context.drawImage(
    config.assets.wall,
    subject.coordIsometric.column,
    subject.coordIsometric.row -
      getElevationOffset({
        options: {
          assetHeight: config.assetSize,
        },
        elevationLevel: 0.5,
      }),
  );
}
