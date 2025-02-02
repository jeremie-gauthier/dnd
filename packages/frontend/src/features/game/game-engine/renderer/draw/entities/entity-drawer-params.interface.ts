import { CoordResponseDto, TileEntitiesItem } from "@/openapi/dnd-api";
import { PlayableEntity } from "@features/game/interfaces/dnd-api/playable-entity.interface";
import type { DrawerParams } from "../drawer-params.interface";

export type EntityDrawerParams<
  AssetCollection extends Readonly<Record<string, string>> = Readonly<
    Record<string, string>
  >,
> = DrawerParams<AssetCollection> & {
  subject: {
    coord2D: CoordResponseDto;
    coordIsometric: CoordResponseDto;
    entity: TileEntitiesItem;
    playableEntity?: PlayableEntity;
  };
};
