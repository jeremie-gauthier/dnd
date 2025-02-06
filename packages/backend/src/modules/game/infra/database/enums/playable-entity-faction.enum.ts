export const PlayableEntityFaction = {
  HERO: "hero",
  MONSTER: "monster",
} as const;

export const PlayableEntityFactionValues = Object.values(PlayableEntityFaction);

export type PlayableEntityFactionType =
  (typeof PlayableEntityFaction)[keyof typeof PlayableEntityFaction];
