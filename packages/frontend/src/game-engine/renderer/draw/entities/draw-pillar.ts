import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawPillar({ context, config, subject }: EntityDrawerParams) {
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
