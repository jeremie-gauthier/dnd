import { z } from "zod";

export const playableEntityAttackOutputSchema = z.object({});

export type PlayableEntityAttackOutput = z.infer<
  typeof playableEntityAttackOutputSchema
>;
