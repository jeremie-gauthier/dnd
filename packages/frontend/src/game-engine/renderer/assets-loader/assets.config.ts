import floor_1 from "../../../assets/v1.1 dungeon crawler 16X16 pixel pack/tiles/floor/floor_1.png";
import door_closed from "../../../assets/v1.1 dungeon crawler 16X16 pixel pack/tiles/wall/door_closed.png";
import wall_1 from "../../../assets/v1.1 dungeon crawler 16X16 pixel pack/tiles/wall/wall_1.png";

import door_close from "../../../assets/custom/tiles/doors/door_close.png";
import door_open from "../../../assets/custom/tiles/doors/door_open.png";
import floor_dark from "../../../assets/custom/tiles/floors/floor_dark.png";
import floor_light from "../../../assets/custom/tiles/floors/floor_light.png";
import pillar from "../../../assets/custom/tiles/pillar/pillar.png";
import ref_blue from "../../../assets/custom/tiles/references/blue.png";
import ref_red from "../../../assets/custom/tiles/references/red.png";
import wall from "../../../assets/custom/tiles/wall/wall.png";

export const assetCollection2D = {
  floor_1,
  wall_1,
  door_closed,
} as const;

export const assetCollectionIsometric = {
  floor_light,
  floor_dark,
  wall,
  door_open,
  door_close,
  pillar,
  ref_blue,
  ref_red,
} as const;
