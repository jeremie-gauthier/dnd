export const PlayableEntityType = {
  HUMANOID: "humanoid",
  GOBELINOID: "gobelinoid",
  UNDEAD: "undead",
} as const;

export const PlayableEntityTypeValues = Object.values(PlayableEntityType);

export type PlayableEntityTypeType =
  (typeof PlayableEntityType)[keyof typeof PlayableEntityType];
