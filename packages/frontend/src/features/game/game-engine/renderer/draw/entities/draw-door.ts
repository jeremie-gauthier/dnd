import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = {
  readonly door_close: string;
  readonly door_open: string;
};

export function drawDoor({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
  if (subject.entity.type !== "interactive-entity") return;

  const isClosed = subject.entity.isBlocking;
  // TODO: tmp for better visualization during testing
  if (!isClosed) return;
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
