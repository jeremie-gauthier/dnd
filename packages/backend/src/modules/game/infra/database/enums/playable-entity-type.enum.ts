export const PlayableEntityArchetype = {
  HUMANOID: "humanoid",
  GOBELINOID: "gobelinoid",
  UNDEAD: "undead",
} as const;

export const PlayableEntityArchetypeValues = Object.values(
  PlayableEntityArchetype,
);

export type PlayableEntityArchetypeType =
  (typeof PlayableEntityArchetype)[keyof typeof PlayableEntityArchetype];
