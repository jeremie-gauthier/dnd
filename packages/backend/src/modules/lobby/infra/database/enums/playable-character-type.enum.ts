export const PlayableCharacterType = {
  GAME_MASTER: "game_master",
  HERO: "hero",
} as const;

export const PlayableCharacterTypeValues = Object.values(PlayableCharacterType);

export type PlayableCharacterTypeType =
  (typeof PlayableCharacterType)[keyof typeof PlayableCharacterType];
