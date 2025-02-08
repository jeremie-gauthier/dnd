export const EntityType = {
  PLAYABLE_ENTITY: "PLAYABLE_ENTITY",
  INTERACTIVE_ENTITY: "INTERACTIVE_ENTITY",
  NON_INTERACTIVE_ENTITY: "NON_INTERACTIVE_ENTITY",
} as const;

export const EntityTypeValues = Object.values(EntityType);

export type EntityTypeType = (typeof EntityType)[keyof typeof EntityType];
