export const TileEntityType = {
  PLAYABLE_ENTITY: "PLAYABLE_ENTITY",
  INTERACTIVE_ENTITY: "INTERACTIVE_ENTITY",
  NON_INTERACTIVE_ENTITY: "NON_INTERACTIVE_ENTITY",
} as const;

export const TileEntityTypeValues = Object.values(TileEntityType);

export type TileEntityTypeType =
  (typeof TileEntityType)[keyof typeof TileEntityType];
