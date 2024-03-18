import type { Coord, GameEntity, TileEntity } from "@dnd/shared";
import type { AssetsLoaded } from "../../assets-loader/assets-loader";
import type { assetCollection } from "../../assets-loader/assets.config";

export type EntityDrawerParams = {
  context: CanvasRenderingContext2D;
  config: {
    assets: AssetsLoaded<typeof assetCollection>;
    assetSize: number;
    map: GameEntity["map"];
  };
  subject: {
    coord2D: Coord;
    coordIsometric: Coord;
    entity: TileEntity;
    playableEntity?: GameEntity["playableEntities"][number];
  };
};
