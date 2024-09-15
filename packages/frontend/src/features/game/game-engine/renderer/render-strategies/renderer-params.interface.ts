import type { Coord, GameView, Tile } from "@dnd/shared";
import type { DrawerParams } from "../draw/drawer-params.interface";

export type RendererParams = DrawerParams & {
  map: GameView["map"];
  playableEntities: GameView["playableEntities"];
  tile: Tile;
  coord2D: Coord;
  coordIsometric: Coord;
};
