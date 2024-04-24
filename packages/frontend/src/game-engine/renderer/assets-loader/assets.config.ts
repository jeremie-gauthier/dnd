import cleric_icon from "../../../assets/classes/cleric_icon.png";
import sorcerer_icon from "../../../assets/classes/sorcerer_icon.png";
import thief_icon from "../../../assets/classes/thief_icon.png";
import unknown_icon from "../../../assets/classes/unknown_icon.png";
import warrior_icon from "../../../assets/classes/warrior_icon.png";
import move_layer from "../../../assets/layers/move_layer.png";
import goblin_icon from "../../../assets/monsters/goblin_icon.png";
import door_close from "../../../assets/tiles/doors/door_close.png";
import door_open from "../../../assets/tiles/doors/door_open.png";
import floor_dark from "../../../assets/tiles/floors/floor_dark.png";
import floor_light from "../../../assets/tiles/floors/floor_light.png";
import pillar from "../../../assets/tiles/pillar/pillar.png";
import ref_blue from "../../../assets/tiles/references/blue.png";
import ref_red from "../../../assets/tiles/references/red.png";
import wall from "../../../assets/tiles/wall/wall.png";

export const assetCollection = {
  floor_light,
  floor_dark,
  wall,
  door_open,
  door_close,
  pillar,
  warrior_icon,
  goblin_icon,
  move_layer,
  unknown_icon,
  ref_blue,
  ref_red,
} as const;

export const floorAssetCollection = {
  floor_light,
  floor_dark,
  ref_blue,
  ref_red,
} as const;

export const entitiesAssetsCollection = {
  wall,
  pillar,
  door_open,
  door_close,
  warrior_icon,
  sorcerer_icon,
  cleric_icon,
  thief_icon,
  unknown_icon,
  goblin_icon,
} as const;

export const previewsAssetsCollection = {
  move_layer,
} as const;
