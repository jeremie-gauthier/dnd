import { Board } from "@/openapi/dnd-api";
import type { AssetsLoaded } from "../assets-loader/assets-loader";
import type { assetCollection } from "../assets-loader/assets.config";

export type DrawerParams<
  AssetCollection extends Readonly<
    Record<string, string>
  > = typeof assetCollection,
> = {
  context: CanvasRenderingContext2D;
  config: {
    assets: AssetsLoaded<AssetCollection>;
    assetSize: number;
    map: Board;
  };
};
