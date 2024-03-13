import { translate2DToIsometricCoord } from "../../../../utils/coords-conversion.util";
import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawWall({
  context,
  entityColumn,
  entityRow,
  assets,
}: Omit<EntityDrawerParams, "entity">) {
  const isometricCoord = translate2DToIsometricCoord({
    row: entityRow,
    column: entityColumn,
  });

  const assetHeight = 64;
  context.drawImage(
    assets.wall,
    isometricCoord.column,
    // TODO: faire une fonction getElevationOffset au lieu de ce calcul
    isometricCoord.row - assetHeight / 2,
  );
}
