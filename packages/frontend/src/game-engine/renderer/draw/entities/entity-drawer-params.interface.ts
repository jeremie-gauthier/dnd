import type { GameEntity, TileEntity } from "@dnd/shared";
import type { AssetsLoaded } from "../../assets-loader/assets-loader";
import type { assetCollectionIsometric } from "../../assets-loader/assets.config";

export type AssetWithCoordMap = {
  asset: HTMLImageElement;
  entities: Readonly<
    Record<
      string,
      Readonly<{
        sx: number;
        sy: number;
        sh: number;
        sw: number;
      }>
    >
  >;
};

export type EntityDrawerParams = {
  context: CanvasRenderingContext2D;
  entity: TileEntity;
  entityRow: number;
  entityColumn: number;
  playableEntity?: GameEntity["playableEntities"][number];
  assets: AssetsLoaded<typeof assetCollectionIsometric>;
};
