export const TrapName = {
  PIT: "pit",
} as const;

export const TrapNameValues = Object.values(TrapName);

export type TrapNameType = (typeof TrapName)[keyof typeof TrapName];
