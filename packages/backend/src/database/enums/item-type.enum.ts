export const ItemType = {
  WEAPON: "Weapon",
  SPELL: "Spell",
  CHESTTRAP: "ChestTrap",
  POTION: "Potion",
  ARTIFACT: "Artifact",
} as const;

export const ItemTypeValues = Object.values(ItemType);

export type ItemTypeType = (typeof ItemType)[keyof typeof ItemType];
