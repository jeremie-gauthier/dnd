import cleric_icon from "@features/ui/assets/classes/cleric_icon.png";
import sorcerer_icon from "@features/ui/assets/classes/sorcerer_icon.png";
import thief_icon from "@features/ui/assets/classes/thief_icon.png";
import unknown_icon from "@features/ui/assets/classes/unknown_icon.png";
import warrior_icon from "@features/ui/assets/classes/warrior_icon.png";
import attack_layer from "@features/ui/assets/layers/attack_layer.png";
import move_layer from "@features/ui/assets/layers/move_layer.png";
import goblin_icon from "@features/ui/assets/monsters/goblin_icon.png";
import chest_close from "@features/ui/assets/tiles/chests/chest_close.png";
import chest_open from "@features/ui/assets/tiles/chests/chest_open.png";
import door_close from "@features/ui/assets/tiles/doors/door_close.png";
import door_open from "@features/ui/assets/tiles/doors/door_open.png";
import floor_dark from "@features/ui/assets/tiles/floors/floor_dark.png";
import floor_light from "@features/ui/assets/tiles/floors/floor_light.png";
import pillar from "@features/ui/assets/tiles/pillar/pillar.png";
import ref_blue from "@features/ui/assets/tiles/references/blue.png";
import ref_red from "@features/ui/assets/tiles/references/red.png";
import trap_active from "@features/ui/assets/tiles/traps/trap_active.png";
import trap_inactive from "@features/ui/assets/tiles/traps/trap_inactive.png";
import wall from "@features/ui/assets/tiles/wall/wall.png";

export const assetCollection = {
  floor_light,
  floor_dark,
  wall,
  door_open,
  door_close,
  pillar,
  warrior_icon,
  sorcerer_icon,
  cleric_icon,
  thief_icon,
  goblin_icon,
  move_layer,
  unknown_icon,
  ref_blue,
  ref_red,
  trap_active,
  trap_inactive,
  chest_close,
  chest_open,
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
  trap_active,
  trap_inactive,
  chest_close,
  chest_open,
} as const;

export const previewsAssetsCollection = {
  attack_layer,
  move_layer,
} as const;
