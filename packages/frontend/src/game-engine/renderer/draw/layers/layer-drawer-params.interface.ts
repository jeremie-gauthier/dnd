import type { Coord, Tile } from "@dnd/shared";
import type { DrawerParams } from "../drawer-params.interface";

export type LayerDrawerParams = DrawerParams & {
  subject: {
    coord2D: Coord;
    coordIsometric: Coord;
    tile: Tile;
  };
};
