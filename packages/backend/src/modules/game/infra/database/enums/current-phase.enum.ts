export const CurrentPhase = {
  PREPARATION: "preparation",
  IDLE: "idle",
  ACTION: "action",
} as const;

export const CurrentPhaseValues = Object.values(CurrentPhase);

export type CurrentPhaseType = (typeof CurrentPhase)[keyof typeof CurrentPhase];
