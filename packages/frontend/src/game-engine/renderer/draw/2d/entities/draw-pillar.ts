import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawPillar({
  context,
  entityRow,
  entityColumn,
  options,
}: EntityDrawerParams) {
  context.fillStyle = "#918f8d";
  context.fillRect(
    entityColumn * options.tileSize,
    entityRow * options.tileSize,
    options.tileSize,
    options.tileSize,
  );
}
