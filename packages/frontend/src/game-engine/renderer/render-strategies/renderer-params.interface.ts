import type { Coord, GameEntity, Tile } from "@dnd/shared";
import type { DrawerParams } from "../draw/drawer-params.interface";

export type RendererParams = DrawerParams & {
  map: GameEntity["map"];
  playableEntities: GameEntity["playableEntities"];
  tile: Tile;
  coord2D: Coord;
  coordIsometric: Coord;
};
