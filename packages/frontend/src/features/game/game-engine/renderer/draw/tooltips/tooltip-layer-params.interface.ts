import type { Coord } from "@dnd/shared";
import { tooltipsAssetsCollection } from "../../assets-loader/assets.config";
import type { DrawerParams } from "../drawer-params.interface";

export type TooltipDrawerParams = DrawerParams<
  typeof tooltipsAssetsCollection
> & {
  subject: {
    coord2D: Coord;
    coordIsometric: Coord;
  };
};
