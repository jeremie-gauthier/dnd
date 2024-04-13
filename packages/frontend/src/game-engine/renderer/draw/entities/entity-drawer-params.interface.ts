import type { Coord, GameEntity, TileEntity } from "@dnd/shared";
import type { DrawerParams } from "../drawer-params.interface";

export type EntityDrawerParams<
  AssetCollection extends Readonly<Record<string, string>> = Readonly<
    Record<string, string>
  >,
> = DrawerParams<AssetCollection> & {
  subject: {
    coord2D: Coord;
    coordIsometric: Coord;
    entity: TileEntity;
    playableEntity?: GameEntity["playableEntities"][number];
  };
};
