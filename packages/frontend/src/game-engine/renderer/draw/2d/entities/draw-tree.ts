import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawTree({
  context,
  entityRow,
  entityColumn,
  options,
}: EntityDrawerParams) {
  context.fillStyle = "#558000";
  context.fillRect(
    entityColumn * options.tileSize,
    entityRow * options.tileSize,
    options.tileSize,
    options.tileSize,
  );
}
