import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawDoor({
  context,
  entityRow,
  entityColumn,
  options,
  assets,
}: EntityDrawerParams) {
  // context.fillStyle = "#174091";
  // context.fillRect(
  //   entityColumn * options.tileSize,
  //   entityRow * options.tileSize,
  //   options.tileSize,
  //   options.tileSize,
  // );

  context.drawImage(
    assets.door_closed,
    entityColumn * options.tileSize,
    entityRow * options.tileSize,
    options.tileSize,
    options.tileSize,
  );
}
