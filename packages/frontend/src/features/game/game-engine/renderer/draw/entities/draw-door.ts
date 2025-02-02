import { TileEntityType } from "@/openapi/dnd-api";
import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = {
  readonly door_close: string;
};

export function drawDoor({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
  if (subject.entity.type !== TileEntityType.INTERACTIVE_ENTITY) return;

  const isClosed = subject.entity.isBlocking;
  if (!isClosed) return;

  context.drawImage(
    config.assets.door_close,
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
