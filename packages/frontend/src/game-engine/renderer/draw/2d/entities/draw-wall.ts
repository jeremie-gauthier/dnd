import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawWall({
  context,
  entityRow,
  entityColumn,
  options,
  assets,
}: EntityDrawerParams) {
  // context.fillStyle = "#4e4d4b";
  // context.fillRect(
  //   entityColumn * options.tileSize,
  //   entityRow * options.tileSize,
  //   options.tileSize,
  //   options.tileSize,
  // );

  // const wallAsset = assets.wall_1;
  // console.log(assets);

  context.drawImage(
    assets.wall_1,
    entityColumn * options.tileSize,
    entityRow * options.tileSize,
    options.tileSize,
    options.tileSize,
  );
}
