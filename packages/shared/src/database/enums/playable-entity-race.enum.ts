export const PlayableEntityRace = {
  GOBLIN: "goblin",
  BUGBEAR: "bugbear",
  HUMAN: "human",
  ELF: "elf",
  HALFLING: "halfling",
} as const;

export const PlayableEntityRaceValues = Object.values(PlayableEntityRace);

export type PlayableEntityRaceType =
  (typeof PlayableEntityRace)[keyof typeof PlayableEntityRace];
