import { translate2DToIsometricCoord } from "../../../../utils/coords-conversion.util";
import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawFloor({
  context,
  entityColumn,
  entityRow,
  assets,
}: Omit<EntityDrawerParams, "entity">) {
  const isEvenTile = (entityColumn + entityRow) % 2 === 0;
  const floorAsset = isEvenTile ? assets.floor_light : assets.floor_dark;

  const isometricCoord = translate2DToIsometricCoord({
    row: entityRow,
    column: entityColumn,
  });

  context.drawImage(floorAsset, isometricCoord.column, isometricCoord.row);
}
