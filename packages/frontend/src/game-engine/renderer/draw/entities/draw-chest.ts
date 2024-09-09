import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = {
  readonly chest_open: string;
  readonly chest_close: string;
};

export function drawChest({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
  if (subject.entity.type !== "interactive-entity") return;

  const isActive = subject.entity.canInteract;
  const chestAsset = isActive
    ? config.assets.chest_close
    : config.assets.chest_open;

  context.drawImage(
    chestAsset,
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
