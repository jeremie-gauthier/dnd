import type { Coord, Tile } from "@dnd/shared";
import { assetCollection } from "../../assets-loader/assets.config";
import type { DrawerParams } from "../drawer-params.interface";

export type LayerDrawerParams<
  AssetCollection extends Readonly<
    Record<string, string>
  > = typeof assetCollection,
> = DrawerParams<AssetCollection> & {
  subject: {
    coord2D: Coord;
    coordIsometric: Coord;
    tile: Tile;
  };
};
