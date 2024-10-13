import cleric_icon from "@assets/classes/cleric_icon.png";
import sorcerer_icon from "@assets/classes/sorcerer_icon.png";
import thief_bottom_left from "@assets/classes/thief_bottom_left.png";
import thief_icon from "@assets/classes/thief_icon.png";
import unknown_icon from "@assets/classes/unknown_icon.png";
import warrior_icon from "@assets/classes/warrior_icon.png";
import attack_layer from "@assets/layers/attack_layer.png";
import move_layer from "@assets/layers/move_layer.png";
import player_turn_layer from "@assets/layers/player_turn_layer.png";
import goblin_icon from "@assets/monsters/goblin_icon.png";
import chest_close from "@assets/tiles/chests/chest_close.png";
import chest_open from "@assets/tiles/chests/chest_open.png";
import door_close from "@assets/tiles/doors/door_close.png";
import door_open from "@assets/tiles/doors/door_open.png";
import floor_dark from "@assets/tiles/floors/floor_dark.png";
import floor_dark_not_in_sight from "@assets/tiles/floors/floor_dark_not_in_sight.png";
import floor_light from "@assets/tiles/floors/floor_light.png";
import floor_light_not_in_sight from "@assets/tiles/floors/floor_light_not_in_sight.png";
import pillar from "@assets/tiles/pillar/pillar.png";
import ref_blue from "@assets/tiles/references/blue.png";
import ref_red from "@assets/tiles/references/red.png";
import trap_active from "@assets/tiles/traps/trap_active.png";
import trap_inactive from "@assets/tiles/traps/trap_inactive.png";
import wall from "@assets/tiles/wall/wall.png";
import move_forbidden from "@assets/tooltips/move_forbidden.png";

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
  thief_bottom_left,
  goblin_icon,
  move_layer,
  player_turn_layer,
  unknown_icon,
  ref_blue,
  ref_red,
  trap_active,
  trap_inactive,
  chest_close,
  chest_open,
  move_forbidden,
  floor_light_not_in_sight,
  floor_dark_not_in_sight,
} as const;

export const floorAssetCollection = {
  floor_light,
  floor_dark,
  floor_light_not_in_sight,
  floor_dark_not_in_sight,
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
  thief_bottom_left,
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
  player_turn_layer,
} as const;

export const tooltipsAssetsCollection = {
  move_forbidden,
} as const;
