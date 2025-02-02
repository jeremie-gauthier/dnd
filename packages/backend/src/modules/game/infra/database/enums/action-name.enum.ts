export const ActionName = {
  ATTACK: "attack",
  MOVE: "move",
  OPEN_DOOR: "open_door",
  DELETE_ITEM: "delete_item",
  SWAP_ITEMS: "swap_items",
  OPEN_CHEST: "open_chest",
} as const;

export const ActionNameValues = Object.values(ActionName);

export type ActionNameType = (typeof ActionName)[keyof typeof ActionName];
