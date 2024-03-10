import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawTrap({
  context,
  entityRow,
  entityColumn,
  options,
}: EntityDrawerParams) {
  context.fillStyle = "#b30000";
  context.fillRect(
    entityColumn * options.tileSize,
    entityRow * options.tileSize,
    options.tileSize,
    options.tileSize,
  );
}
