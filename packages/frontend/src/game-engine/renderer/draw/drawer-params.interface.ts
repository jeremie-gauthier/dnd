import type { GameEntity } from "@dnd/shared";
import type { AssetsLoaded } from "../assets-loader/assets-loader";
import type { assetCollection } from "../assets-loader/assets.config";

export type DrawerParams = {
  context: CanvasRenderingContext2D;
  config: {
    assets: AssetsLoaded<typeof assetCollection>;
    assetSize: number;
    map: GameEntity["map"];
  };
};
