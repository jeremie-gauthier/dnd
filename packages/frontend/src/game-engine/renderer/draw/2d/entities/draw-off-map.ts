import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawOffMap({
  context,
  entityRow,
  entityColumn,
  options,
}: EntityDrawerParams) {
  context.fillStyle = "#222";
  context.fillRect(
    entityColumn * options.tileSize,
    entityRow * options.tileSize,
    options.tileSize,
    options.tileSize,
  );
}
