import { TileEntity } from "@dnd/shared";
import { AssetsLoaded } from "../../../assets-loader/assets-loader";
import { assetCollection } from "../../../assets-loader/assets.config";

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
  options: {
    tileSize: number;
  };
  assets: AssetsLoaded<typeof assetCollection>;
};
