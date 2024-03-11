import { translate2DToIsometricCoord } from "../translate-2d-to-isometric-coord";
import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawDoor({
  context,
  entityColumn,
  entityRow,
  entity,
  assets,
}: EntityDrawerParams) {
  if (entity.type !== "non-playable-interactive-entity") return;

  const isClosed = entity.isBlocking;

  const isometricCoord = translate2DToIsometricCoord({
    row: entityRow,
    column: entityColumn,
  });

  const assetHeight = 64;

  if (isClosed) {
    context.drawImage(
      assets.door_close,
      isometricCoord.column,
      // TODO: faire une fonction getElevationOffset au lieu de ce calcul
      isometricCoord.row - assetHeight / 2,
    );
  } else {
    context.drawImage(
      assets.door_open,
      isometricCoord.column,
      // TODO: faire une fonction getElevationOffset au lieu de ce calcul
      isometricCoord.row - assetHeight / 2,
    );
  }
}
