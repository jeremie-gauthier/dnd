import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawDoor({ context, config, subject }: EntityDrawerParams) {
  if (subject.entity.type !== "non-playable-interactive-entity") return;

  const isClosed = subject.entity.isBlocking;
  const doorAsset = isClosed
    ? config.assets.door_close
    : config.assets.door_open;

  context.drawImage(
    doorAsset,
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
