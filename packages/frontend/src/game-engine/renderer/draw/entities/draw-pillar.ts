import { translate2DToIsometricCoord } from "../../../utils/coords-conversion.util";
import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawPillar({
  context,
  entityColumn,
  entityRow,
  assets,
}: Omit<EntityDrawerParams, "entity">) {
  const isometricCoord = translate2DToIsometricCoord({
    row: entityRow,
    column: entityColumn,
  });

  context.drawImage(assets.pillar, isometricCoord.column, isometricCoord.row);
}
