import { floorAssetCollection } from "../../assets-loader/assets.config";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawFloorNotInSight({
  context,
  config,
  subject,
}: EntityDrawerParams<typeof floorAssetCollection>) {
  const isEvenTile = (subject.coord2D.column + subject.coord2D.row) % 2 === 0;
  const floorAsset = isEvenTile
    ? config.assets.floor_light_not_in_sight
    : config.assets.floor_dark_not_in_sight;

  context.drawImage(
    floorAsset,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}