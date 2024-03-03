import { TileEntity } from "@dnd/shared";

export type EntityDrawerParams = {
  context: CanvasRenderingContext2D;
  entity: TileEntity;
  entityRow: number;
  entityColumn: number;
  options: {
    tileSize: number;
  };
};
