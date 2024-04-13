import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = { readonly pillar: string };

export function drawPillar({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
  context.drawImage(
    config.assets.pillar,
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
